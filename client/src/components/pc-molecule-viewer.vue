<script>
import widgetWrapper from "@/components/widget-wrapper.vue";
import * as $3Dmol from "3dmol/build/3Dmol-nojquery.js";

export default {
  props: {
    wid: Number
  },
  data: function() {
    return {
      pdb: "1MO8",
      background: "white",
      style: "sphere"
    }
  },
  components: {
    widgetWrapper
  }
}
</script>
<template>
  <widget-wrapper widgettype="pc-molecule-widget" :wid="wid">
    <div class="viewer_3Dmoljs"
      :data-pdb="pdb"
      :data-backgroundcolor="background"
      :data-style="style"
    >
    </div>
  </widget-wrapper>
</template>

<style lang="scss">
.viewer_3Dmoljs {
  height: 400px;
  width: 400px;
  position: relative;
}
</style>
