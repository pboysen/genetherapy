<script>
import widgetWrapper from "@/components/widget-wrapper.vue";
import { mapGetters } from "vuex";
export default {
  name: "carry-forward",
  props: {
    wid: Number
  },
  components: {
    widgetWrapper
  },
  computed: {
    ...mapGetters(["role", "phase"]),
    htmlAnswers() {
      let htmlAnswers = [];
      let info = {
        wid: this.wid,
        phase: this.phase,
        type: "carry-forward",
        prop: "sources"
      };
      let sources = this.$store.getters.getPropValue(info);
      Object.values(sources).forEach(src => {
        let answer = this.$store.getters["responses/getAnswer"](src.wid);
        let w = this.$store.getters.phaseWidget(src);
        answer =
          w.type === "image-answer"
            ? `<img src="${answer}" />`
            : `<p>${answer}</p>`;
        htmlAnswers.push({ id: src.wid, answer: answer });
      });
      return htmlAnswers;
    }
  }
};
</script>
<template>
  <widget-wrapper widgettype="carry-forward" :wid="wid">
    <div :class="['carry-forward', { student: role == 'student' }]">
      <div
        v-for="html in htmlAnswers"
        :key="html.id"
        v-html="html.answer"
      ></div>
    </div>
  </widget-wrapper>
</template>

<style lang="scss">
.widget[widgettype="carry-forward"] {
  background-color: lightgreen;
  border: 1px solid gray;
  border-radius: 50%;
  width: 17px;
  min-height: 17px;
}
</style>
