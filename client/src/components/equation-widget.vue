<script>
import widgetWrapper from "@/components/widget-wrapper.vue";
import {mapGetters} from "vuex";
import "mathjax/es5/tex-mml-chtml";

export default {
  props: {
    wid: Number
  },
  components: {
    widgetWrapper
  },
  computed: {
    ...mapGetters(["role", "phase", "widgets"]),
    equation() {
      var props = this.widgets[this.wid];
      if (props.format === "mml")
        return MathJax.mathml2chtml(props.formula).innerHTML;
      else if (props.format === "tex")
        return MathJax.tex2chtml(props.formula).innerHTML;
      else
        return `Unrecognized format: ${props.format}`;
    }
  }
};
</script>
<template>
  <widget-wrapper widgettype="equation-widget" :wid="wid">
    <div v-html="equation"></div>
  </widget-wrapper>
</template>
<style lang="scss">
.widget[widgettype="equation-widget"] {
}
</style>
