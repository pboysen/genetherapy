<script>
import { mapGetters } from "vuex";
export default {
  name: "widget-wrapper",
  props: {
    wid: Number
  },
  data: function() {
    return {
      active: true,
      dragging: false,
      widgetLayer: null
    };
  },
  mounted() {
    this.$el.setAttribute("wid", this.wid);
  },
  computed: {
    ...mapGetters(["widgetIsLocked", "role", "widgets", "phase", "widgets"]),
    isActive() {
      return this.active;
    },
    isSelected() {
      return this.widgets == this.wid;
    },
    optional() {
      if (this.wid && this.wid in this.widgets) {
        let info = {
          wid: this.wid,
          phase: this.phase,
          type: this.widgets[this.wid].type,
          prop: "optional"
        };
        return this.$store.getters.getPropValue(info);
      } else return false;
    },
    isSubWidget() {
      return false;
      //return this.widgets[this.wid].subWidget;
    },
    incomplete() {
      return this.$store.getters.incomplete(this.wid);
    }
  },
  methods: {
    isRole(role) {
      return this.role === role;
    },
    startDrag(e) {
      if (this.active && this.isRole("designer")) {
        e.stopPropagation();
        this.dragging = true;
        this.$store.commit("setwidgets", this.wid);
        this.$store.commit("setDrawerEvent", {
          wid: this.wid,
          type: this.$store.getters.widgets[this.wid].type,
          top: e.pageY - 120
        });
      }
    },
    stopDrag(e) {
      if (this.active && this.isRole("designer")) {
        e.stopPropagation();
        this.dragging = false;
        window.onmousemove = null;
        if (this.isSubWidget) return;
        var rect = this.$el.getBoundingClientRect();
        this.$store.commit("setWidgetRect", rect);
      }
    },
    copyDelete(e) {
      if (!(this.active && this.isRole("designer")) || this.isSubWidget) return;
      let type = this.$store.getters.widgets[this.wid].type;
      this.widgetLayer = e.target.parentElement;
      let r = this.$el.getBoundingClientRect();
      let right = r.left + window.scrollX + this.$el.offsetWidth;
      let top = r.top + window.scrollY;
      if (e.pageY < top + 16 && e.pageY > top) {
        if (e.pageX > right - 32 && e.pageX < right - 16) {
          this.$store.commit("copyWidget", {
            wid: this.wid,
            phase: this.$store.getters.phase,
            layer: this.widgetLayer,
            type: type,
            left: e.pageX + 10,
            top: e.pageY - 70
          });
        } else if (e.pageX > right - 16 && e.pageX < right) {
          this.$store.commit("deleteWidget", this.wid);
          this.active = false;
        }
      }
    }
  }
};
</script>
<template>
  <div
    v-if="isActive"
    :class="[
      'widget',
      { student: isRole('student') },
      { incomplete: incomplete },
      { subwidget: isSubWidget }
    ]"
  >
    <slot></slot>
    <span class="optional" v-show="optional">*optional</span>
  </div>
</template>

<style lang="scss" scoped>
.widget {
  box-sizing: border-box;
  position: relative;
  padding: 0;
  margin: 0;
}
.widget.subwidget {
  box-sizing: border-box;
  position: relative;
  padding: 0;
  margin: 0;
}
.widget::before {
  font-size: 10px;
  // content: attr(wid);
  position: absolute;
  top: 2px;
  left: 2px;
}
.widget.student::before {
  display: none;
}
.widget:hover::after {
  position: absolute;
  top: 0px;
  right: 0px;
  // content: url(../../assets/img/widget.png);
}
.widget.subwidget:hover::after {
  display: none;
}
.widget.student:hover::after {
  display: none;
}
.widget.incomplete {
  border: 1px dotted $invalid-color;
}
.optional {
  display: block;
  color: red;
  font-size: 12px;
  position: relative;
  left: 0;
  top: 0;
  margin: 0;
}
.selectimg {
  position: relative;
  left: 8px;
  top: 0px;
  float: left;
  transform: rotate(-90deg);
}
</style>
