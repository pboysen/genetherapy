import Vue from "vue";
import Vuex from "vuex";
import factory from "./modules/factory";
import responses from "./modules/responses";
Vue.use(Vuex);

const getDefaultState = () => {
  return {
    fileName: "",
    wcnt: 1,
    tcnt: 1,
    role: "designer",
    phase: -1,
    widget: null,
    caseKey: 0,
    drawerEvent: { type: "", top: 50 },
    tool: "",
    incomplete: [],
    phases: [],
    widgets: {},
    tools: {},
    fileTypes: ["image/*", "application/pdf", "application/case", "text/csv"],
    selectedWidgetTypes: [
      "textfield-widget",
      "textarea-widget",
      "select-widget",
      "carry-forward",
      "media-widget",
      "image-widget",
      "table-widget",
      "upload-widget"
    ],
    selectedToolTypes: ["observations-tool", "comments-tool"]
  };
};

const store = new Vuex.Store({
  modules: {
    factory,
    responses
  },
  state: getDefaultState(),
  getters: {
    case: state => state,
    caseKey: state => state.caseKey,
    role: state => state.role,
    phase: state => state.phase,
    currentPhase: state => state.phases[state.phase],
    phaseTitle: state =>
      state.phase >= 0 ? store.getters.currentPhase.title : "",
    phases: state => state.phases,
    phaseTitles: state => {
      const titles = [];
      state.phases.forEach(phase => titles.push(phase.title));
      return titles;
    },
    widget: state => state.widget,
    fileTypes: state => state.fileTypes,
    fileName: state => state.fileName,
    widgets: () => store.getters.currentPhase.components,
    activePhase: () => store.getters["responses/activePhase"],
    activeSubmit: state =>
      state.role === "student" &&
      state.phase >= 0 &&
      state.phase == store.getters.activePhase,
    submitTitle: state =>
      state.phase >= 0 ? store.getters.currentPhase.submit : "Submit",
    selectedWidgetTypes: state => state.selectedWidgetTypes,
    phaseWidget: state => info => state.phases[info.phase].widgets[info.wid],
    widgetType: state => wid => {
      let type = null;
      state.phases.forEach(phase => {
        if (wid in phase.components) type = phase.components[wid].type;
      });
      return type;
    },
    locked: state => pid => state.role === "student" && pid > this.activePhase,
    incomplete: state => wid => state.incomplete.includes(wid),
    getPropValue: state => info => {
      let widgets = state.phases[info.phase].components;
      if (info.wid in widgets && info.type === widgets[info.wid].type)
        return widgets[info.wid].props[info.prop];
      else {
        let widget = store.getters["factory/widgets"][info.type];
        return widget.prototype.props[info.prop];
      }
    },
    noListWidgets: () => {
      var selected = [];
      store.getters.selectedWidgets.forEach(w => {
        if (w.type != "multiple-choice" && w.type != "check-list")
          selected.push(w);
      });
      return selected;
    },
    possibleSources: state => {
      var sources = [];
      for (let p = 0; p < state.phase; p++)
        Object.values(state.phases[p].widgets).forEach(w => {
          if (store.getters["factory/widgets"][w.type].isSource)
            sources.push({
              wid: w.id,
              phase: p,
              type: w.type
            });
        });
      return sources;
    },
    selectedWidgets: state => {
      let widgets = [];
      state.selectedWidgetTypes.forEach(type => {
        widgets.push(store.getters["factory/widgets"][type]);
      });
      return widgets;
    },
    widgetIsLocked: state =>
      state.role === "student" &&
      state.phase < store.getters["responses/activePhase"],
    copyState: state => {
      store.dispatch("responses/setDefaultState");
      return JSON.stringify(state);
    }
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
    setDoc(state, doc) {
      store.dispatch("setDefaultState");
      state.fileName = doc.fileName;
      state.phases = doc.phases;
      store.commit("setphase", 0);
      state.caseKey++;
    },
    setphase(state, n) {
      state.phase = n;
      state.widget = null;
    },
    setrole(state, aRole) {
      state.role = aRole;
    },
    setwidget(state, wid) {
      state.widget = wid;
    },
    setSubmitTitle(state, title) {
      state.phases[state.phase].submit = title;
    },
    setProp(state, info) {
      state.phases[state.phase].widgets[info.wid].props[info.prop] = info.value;
    },
    setSelectedWidgetTypes(state, selected) {
      state.selectedWidgetTypes = selected;
    },
    setSelectedToolTypes(state, selected) {
      state.selectedToolTypes = selected;
    },
    validateResponses(state) {
      state.incomplete = [];
      Object.values(store.getters.widgets).forEach(w => {
        if (
          w.phase == state.phase &&
          !w.optional &&
          !store.getters["responses/hasAnswer"](w.id)
        )
          state.incomplete.push(w.id);
      });
      return state.incomplete.length == 0;
    },
    addComponents(state, comp) {
      for (let id in comp) {
        let type = comp[id];
        let el = document.getElementById(id);
        if (el) {
          store.commit("addComponent", { el: el, type: type });
        }
      }
    },
    addComponent(state, info) {
      let wid = state.wcnt++;
      store.commit("factory/makeWidget", {
        type: info.type,
        el: info.el,
        wid: wid,
        store: store
      });
      let prototype = store.getters["factory/widgets"][info.type].prototype;
      let wrec = JSON.parse(JSON.stringify(prototype));
      wrec.id = wid;
      Vue.set(store.getters.widgets, wid, wrec);
    },
    copyWidget(state, info) {
      info.wrec = jsonCopy(store.getters.widgets[info.wid]);
      store.commit("addNewWidget", info);
    },
    deleteWidget(state, wid) {
      store.commit("setwidget", null);
      delete store.getters.widgets[wid];
    },
    registerSubWidget(state, info) {
      let wid = state.wcnt++;
      let prototype = store.getters["factory/widgets"][info.type].prototype;
      info.wrec = JSON.parse(JSON.stringify(prototype));
      info.wrec.props = { ...info.wrec.props, ...info.props };
      info.wid = wid;
      info.wrec.id = wid;
      info.wrec.subWidget = true;
      Vue.set(store.getters.widgets, wid, info.wrec);
    },
    addObservation(state, text) {
      store.dispatch("factory/getToolRecord", "observations-tool").then(obs => {
        obs.id = state.tcnt++;
        obs.text = text;
        obs.phase = state.phase;
        state.tools["observations-tool"].push(obs);
      });
    },
    installTool(state, info) {
      if (!state.tools[info.tool])
        Vue.set(state.tools, info.tool, JSON.parse(JSON.stringify(info.value)));
    }
  },
  actions: {
    setDefaultState(state) {
      store.dispatch("responses/setDefaultState");
      store.dispatch("factory/setDefaultState");
      Object.assign(state, getDefaultState());
    },
    restartStudent() {
      store.dispatch("responses/setDefaultState");
      store.commit("setphase", 0);
      store.commit("setwidget", null);
    },
    submit() {
      store.state.incomplete = [];
      Object.values(store.getters.widgets).forEach(w => {
        if (
          w.phase == store.state.phase &&
          !w.optional &&
          !store.getters["responses/hasAnswer"](w.id)
        )
          store.state.incomplete.push(w.id);
      });
      if (store.state.incomplete.length == 0) {
        store.commit("responses/unlockNextPhase");
        store.commit("setphase", ++store.state.phase);
      }
    }
  }
});

function jsonCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export default store;
