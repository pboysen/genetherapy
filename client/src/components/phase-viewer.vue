<script>
import { mapGetters } from "vuex";

export default {
  name: "phase-viewer",
  props: {
    pobj: Object
  },
  computed: {
    ...mapGetters(["phase"])
  },
  mounted() {
    this.$store.commit("addComponents", this.pobj.id);
  },
  methods: {
    textSelect() {
      var selection = window.getSelection();
      this.$root.$emit("textSelected", selection);
    },
    highlight() {
      /*
      var selection = window.getSelection();
      var range = selection.getRange(0);
      var newrange = document.createRange();
      newrange.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(newrange);
      */
    }
  }
};
</script>
<template>
  <div class="phase" v-show="phase == pobj.id">
    <div v-html="pobj.content"></div>
  </div>
</template>
<style lang="scss">
.phase {
  margin-left: 200px;
  margin-right: 200px;
  padding: 50px;
  font-size: 14px;
}
table {
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid lightgrey;
}
td {
  border: 1px solid lightgrey;
  padding: 4px;
  min-height: 17px;
}
td p {
  padding: 2px;
}
.mchoice {
  display: block;
  text-indent: -24px;
  margin-left: 24px;
  list-style: none;
}
.mchoice input {
  margin-right: 8px;
}
.chklist {
  display: block;
  text-indent: -24px;
  margin-left: 24px;
  list-style: none;
}
.chklist input {
  margin-right: 8px;
}
</style>
