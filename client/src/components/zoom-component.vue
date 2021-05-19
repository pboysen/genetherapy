<script>
export default {
  methods: {
    join: function() {
      var win = window.open(
        "https://zoom.us/j/95821380731?pwd=NWsrdEdGK2NkQStYejBBcnUrTlRrdz09",
        "_blank",
        "resizeable,left=700,top=500,width=300,height:300"
      );
      setTimeout(() => win.close(), 4000);
    }
  }
};
</script>
<template>
  <div class="zoom-component">
    <a v-on:click="join">Join Meeting</a>
  </div>
</template>
<style lang="scss" scoped>
.zoom-component {
  text-align: right;
  a {
    font-size: 14px;
    padding: 2px;
  }
  a:hover {
    cursor: pointer;
    color: $select-color;
  }
}
</style>
