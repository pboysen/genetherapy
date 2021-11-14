<script>
import { mapGetters } from "vuex";
import zoomComponent from "@/components/zoom-component.vue";

export default {
  name: "phase-bar",
  components: {
    zoomComponent
  },
  computed: {
    ...mapGetters(["phases", "phase", "role", "phaseTitle", "activePhase"])
  },
  methods: {
    buttonClass(pid) {
      let active = this.phase;
      let cls = "phase-button";
      if (this.role == "designer") cls += pid == active ? " active" : " design";
      else {
        if (pid == active) cls += " active";
        else if (pid < this.activePhase) cls += " done";
        else if (pid == this.activePhase) cls += " design";
        else cls += " todo";
      }
      return cls;
    },
    isTodo(pid) {
      return this.role === "student" && pid > this.activePhase;
    },
    setphase(phase) {
      this.$store.commit("setphase", phase);
    }
  }
};
</script>

<template v-if="phase > -1">
  <div id="phase-bar">
    <zoom-component class="zoom"></zoom-component>
    <div class="phase-top">
      <div class="phase-title">{{ phaseTitle }} </div>
    </div>
    <div class="buttons">
      <button
        v-for="(p, index) in phases"
        :key="index"
        :id="p.id"
        @click="setphase(p.id)"
        :class="buttonClass(p.id)"
        :disabled="isTodo(p.id)"
      ></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#phase-bar {
  display: block;
  white-space: nowrap;
  padding: 2px;
  margin: 2px;
}
.phase-title {
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}
.buttons {
  display: inline-block;
}
.phase-button {
  width: 14px;
  height: 14px;
  color: blue;
  border: 1px solid grey;
  border-radius: 50%;
  margin-right: 20px;
  padding: 2px;
  cursor: pointer;
  background-color: white;
}
.phase-button.design {
  background-color: white;
}
.phase-button.active {
  background-color: $select-color;
}
.phase-button.done {
  background-color: green;
}
.phase-button.todo {
  background-color: gray;
}
.zoom {
  float: right;
}
</style>
