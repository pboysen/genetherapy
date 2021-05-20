<script>
import phaseBar from "@/components/phase-bar.vue";
import phaseViewer from "@/components/phase-viewer.vue";
import submitBar from "@/components/submit-bar.vue";
import { mapGetters } from "vuex";
export default {
  name: "case-viewer",
  components: {
    phaseBar,
    phaseViewer,
    submitBar
  },
  computed: {
    ...mapGetters(["role", "phase", "phases", "caseKey"]),
    showSubmit() {
      return this.role === "student";
    }
  }
};
</script>
<template>
  <div id="case-viewer" :key="caseKey">
    <phase-bar></phase-bar>
    <phase-viewer v-for="p in phases" :pobj="p" :key="p.id"></phase-viewer>
    <submit-bar></submit-bar>
  </div>
</template>

<style lang="scss" scoped>
#case-viewer {
}
</style>
