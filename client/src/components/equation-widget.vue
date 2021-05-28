<script>
import widgetWrapper from "@/components/widget-wrapper.vue";
import { mapGetters } from "vuex";
require("mathjax/es5/tex-mml-chtml.js");

export default {
  name: "equation-widget",
  props: {
    wid: Number
  },
  components: {
    widgetWrapper
  },
  computed: {
    ...mapGetters(["role", "phase", "widgets"]),
    result() {
      var props = this.widgets[this.wid];
      if (props.format === "mml")
        return window.MathJax.mathml2chtml(props.formula).outerHTML;
      else if (props.format === "tex")
        return window.MathJax.tex2chtml(props.formula).outerHTML;
      else return `Unrecognized format: ${props.format}`;
    }
  }
};
</script>
<template>
  <widget-wrapper widgettype="equation-widget" :wid="wid">
    <div v-html="result"></div>
  </widget-wrapper>
</template>

<style lang="scss">
.widget[widgettype="equation-widget"] {
}
</style>
