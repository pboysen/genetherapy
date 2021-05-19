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
    ...mapGetters(["role", "phase", "phases"]),
    showSubmit() {
      return this.role === "student";
    }
  }
};
</script>
<template>
  <div id="case-viewer">
    <phase-bar></phase-bar>
    <phase-viewer v-for="(p, index) in phases" :pobj="p" :key="index">
    </phase-viewer>
    <submit-bar></submit-bar>
  </div>
</template>
}
<style lang="scss" scoped>
#case-viewer {
}
</style>
