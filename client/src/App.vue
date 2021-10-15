<script>
import mainBar from "@/components/main-bar.vue";
import caseViewer from "@/components/case-viewer.vue";
import PcImportWord from "@/components/pc-import-word.vue";
export default {
  name: "App",
  components: {
    mainBar,
    caseViewer,
    PcImportWord
  },
  computed: {
    isModalVisible() {
      return this.$store.getters.isModalVisible;
    }
  }
};
</script>
<template>
  <div id="app">
    <pc-import-word v-show="isModalVisible" />
    <main-bar />
    <case-viewer />
  </div>
</template>
<style lang="scss">
html,
body {
  display: block;
  margin: 0;
  color: black;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
