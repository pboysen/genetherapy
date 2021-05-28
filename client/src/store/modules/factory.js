import Vue from "vue";
import Vuex from "vuex";
import textfieldWidget from "@/components/textfield-widget.vue";
import textareaWidget from "@/components/textarea-widget.vue";
import selectWidget from "@/components/select-widget.vue";
import carryForward from "@/components/carry-forward.vue";
import mediaWidget from "@/components/media-widget.vue";
import checkList from "@/components/check-list.vue";
import multipleChoice from "@/components/multiple-choice.vue";
import imageWidget from "@/components/image-widget.vue";
import tableWidget from "@/components/table-widget.vue";
import uploadWidget from "@/components/upload-widget.vue";
import PcDrawArrow from "@/components/PcDrawImage/PcDrawArrow.vue";
import PcDrawRotate from "@/components/PcDrawImage/PcDrawRotate.vue";
import PcDrawLabel from "@/components/PcDrawImage/PcDrawLabel.vue";
import PcDrawShape from "@/components/PcDrawImage/PcDrawShape.vue";
import equationWidget from "@/components/equation-widget.vue";
Vue.use(Vuex);

let imports = {
  "textfield-widget": Vue.extend(textfieldWidget),
  "textarea-widget": Vue.extend(textareaWidget),
  "select-widget": Vue.extend(selectWidget),
  "carry-forward": Vue.extend(carryForward),
  "media-widget": Vue.extend(mediaWidget),
  "check-list": Vue.extend(checkList),
  "multiple-choice": Vue.extend(multipleChoice),
  "image-widget": Vue.extend(imageWidget),
  "table-widget": Vue.extend(tableWidget),
  "upload-widget": Vue.extend(uploadWidget),
  "pc-draw-arrow": Vue.extend(PcDrawArrow),
  "pc-draw-rotate": Vue.extend(PcDrawRotate),
  "pc-draw-label": Vue.extend(PcDrawLabel),
  "pc-draw-shape": Vue.extend(PcDrawShape),
  "equation-widget": Vue.extend(equationWidget)
};
const getDefaultState = () => {
  return {
    widgets: {
      "textfield-widget": {
        type: "textfield-widget",
        src: "textfield-widget.png",
        isSource: true,
        isTarget: true,
        isDraggable: true,
        textSizes: ["5", "10", "20", "40"],
        defaultAnswer: "",
        prototype: {
          type: "textfield-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            sources: [],
            textSize: 20,
            optional: false,
            textOptions: "",
            textAnswer: ""
          }
        }
      },
      "textarea-widget": {
        type: "textarea-widget",
        src: "textarea-widget.png",
        isSource: true,
        isTarget: true,
        isDraggable: true,
        defaultAnswer: "",
        prototype: {
          type: "textarea-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            sources: [],
            optional: false
          }
        }
      },
      "select-widget": {
        type: "select-widget",
        src: "select-widget.png",
        isSource: true,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: "",
        prototype: {
          type: "select-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            selectOptions: "",
            correct: "",
            selectSize: "1",
            multiple: false,
            optional: false
          }
        }
      },
      "carry-forward": {
        type: "carry-forward",
        src: "cforward.png",
        isSource: false,
        isTarget: true,
        isDraggable: true,
        defaultAnswer: "",
        prototype: {
          type: "carry-forward",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            sources: [],
            optional: false
          }
        }
      },
      "media-widget": {
        type: "media-widget",
        src: "media-widget.png",
        isSource: false,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: "",
        prototype: {
          type: "media-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            mediaSrc: "",
            optional: false
          }
        }
      },
      "multiple-choice": {
        type: "multiple-choice",
        src: "multiple-choice.png",
        isSource: true,
        isTarget: false,
        isDraggable: false,
        defaultAnswer: "",
        prototype: {
          type: "multiple-choice",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            radios: [],
            optional: false
          }
        }
      },
      "check-list": {
        type: "check-list",
        src: "check-list.png",
        isSource: true,
        isTarget: false,
        isDraggable: false,
        defaultAnswer: "",
        prototype: {
          type: "check-list",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            checks: [],
            optional: false
          }
        }
      },
      "image-widget": {
        type: "image-widget",
        src: "image-widget.png",
        isSource: true,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: "",
        prototype: {
          type: "image-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            optional: false
          }
        }
      },
      "table-widget": {
        type: "table-widget",
        src: "table-widget.png",
        isSource: false,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: "",
        prototype: {
          type: "table-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            table: null,
            colspans: null,
            optional: false
          }
        }
      },
      "upload-widget": {
        type: "upload-widget",
        src: "upload-widget.png",
        isSource: false,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: "",
        prototype: {
          type: "upload-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            title: "Upload",
            optional: false,
            accept: [],
            multiple: false
          }
        }
      },
      "pc-draw-arrow": {
        type: "pc-draw-arrow",
        src: "pc-draw-arrow.png",
        isSource: true,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: { id: 1, arrows: {} },
        prototype: {
          type: "pc-draw-arrow",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            colors: "red,blue",
            image: "assets/img/heart diagram.png",
            lineWidth: 5
          }
        }
      },
      "pc-draw-rotate": {
        type: "pc-draw-rotate",
        src: "pc-draw-rotate.png",
        isSource: false,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: { rotation: 0, flipH: 1, flipV: 1 },
        prototype: {
          type: "pc-draw-rotate",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            image: "assets/img/heart diagram.png"
          }
        }
      },
      "pc-draw-label": {
        type: "pc-draw-label",
        src: "pc-draw-label.png",
        isSource: false,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: { id: 1, labels: {} },
        prototype: {
          type: "pc-draw-label",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            image: "assets/img/heart diagram.png"
          }
        }
      },
      "pc-draw-shape": {
        type: "pc-draw-shape",
        src: "pc-draw-shape.png",
        isSource: false,
        isTarget: false,
        isDraggable: true,
        defaultAnswer: { id: 1, shapes: {} },
        prototype: {
          type: "pc-draw-shape",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            shape: "rectangle",
            width: 50,
            height: 50,
            color: "green",
            opacity: 1.0,
            image: "assets/img/heart diagram.png"
          }
        }
      },
      "equation-widget": {
        type: "equation-widget",
        src: "equation-widget.png",
        isSource: false,
        isTarget: false,
        isDraggable: false,
        prototype: {
          type: "equation-widget",
          id: null,
          rect: null,
          subWidget: false,
          props: {
            format: "mml",
            formula: ""
          }
        }
      }
    },
    tools: {
      "observations-tool": {
        title: "Observations",
        userRole: "student",
        prototype: {
          id: null,
          phase: null,
          text: ""
        }
      },
      "comments-tool": {
        title: "Comments",
        userRole: "student",
        prototype: {
          id: null,
          phase: null,
          text: "",
          date: null,
          sel: null
        }
      },
      "resources-tool": {
        title: "Resources",
        userRole: "student",
        prototype: {
          id: null,
          phase: null,
          url: "",
          title: ""
        }
      },
      scores: {
        useRole: "instructor"
      }
    }
  };
};

const factory = {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    widgets: state => state.widgets,
    getTools: state => state.tools,
    textSizes: state => state.widgets["textfield-widget"].textSizes
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
    makeWidget(state, info) {
      let widget = new imports[info.type]({
        propsData: { wid: info.wid },
        store: info.store
      });
      widget.$mount();
      var parent = info.el.parentElement;
      parent.insertBefore(widget.$el, info.el);
      parent.removeChild(info.el);
    },
    makeSubWidget(state, info) {
      let store = info.store;
      let widget = new imports[info.type]({
        propsData: { wid: info.wid },
        store
      });
      widget.$mount();
      info.layer.appendChild(widget.$el);
    }
  },
  actions: {
    setDefaultState(state) {
      Object.assign(state, getDefaultState());
    },
    getToolRecord(context, type) {
      var prototype = context.state.tools[type].prototype;
      return JSON.parse(JSON.stringify(prototype));
    }
  }
};

export default factory;
