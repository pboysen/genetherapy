<script>
import { mapGetters } from "vuex";

export default {
  name: "submit-bar",
  computed: {
    ...mapGetters([
      "submitTitle",
      "phase",
      "role",
      "activePhase",
      "activeSubmit"
    ])
  },
  methods: {
    submit: function() {
      this.$store.dispatch("submit");
      window.scrollTo(0, 0);
    }
  }
};
</script>

<template>
  <div id="submit-panel" v-show="activeSubmit">
    <button @click="submit">
      {{ submitTitle }}
    </button>
  </div>
</template>
<style lang="scss" scoped>
#submit-panel {
  position: relative;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 30px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid gray;
  text-align: center;
}
#submit-panel button {
  font-size: $small-font;
  margin: 2px;
  cursor: pointer;
}
#submit-panel button:hover {
  color: $select-color;
}
</style>
