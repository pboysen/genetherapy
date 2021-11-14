import Vue from "vue";
import Vuex from "vuex";
import store from "./store";
import router from "./router";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Vuex);

window.addEventListener("error", function(evt) {
  console.log(
    "Caught[via 'error' event]:  '" +
      evt.message +
      "' from " +
      evt.filename +
      ":" +
      evt.lineno
  );
  evt.preventDefault();
});

const eventbus = new Vue();
export default eventbus;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

var doc = localStorage.getItem("allele");
if (doc) doc = JSON.parse(doc);
else {
  doc = {
    fileName: "Allele Case.docx",
    phases: [
      {
        title: "Getting Started",
        id: 0,
        components: {},
        content: `Allele Case is used to import Word content into the Allele Designer. The instructions
        below show a case on how to prepare a word document.
        <ol>
          <li>Download <a href="Allele Case.docx">Instructions to format Word for Allele</a></li>
          <li><b>Import</b> Above</li>
          <li>Drop Allele Case.docx in the dropbox that appears</li>
        </ol>
        <p>Follow the instructions in the case to get started.</p>`
      }
    ]
  };
}
store.commit("setDoc", doc);
