<script>
export default {
  methods: {
    importIt() {
      this.$store.commit("setModal", true);
      /*
      let that = this;
      window.onstorage = () => {
        window.onstorage = null;
        let docData = localStorage.getItem("allele");
        if (docData) that.$store.commit("setDoc", JSON.parse(docData));
        win.close();
      };
      */
    },
    publishIt() {
      let input = document.getElementById("publishFile");
      let msg = this.publish(input.value);
      let err = document.getElementById("puberror");
      if (msg === "") {
        err.style.display = "none";
      } else {
        err.innerHTML = msg;
        err.style.display = "block";
      }
    },
    publish(fileName) {
      if (!this.currentFile) return "Import a file first.";
      if (fileName === "") return "Enter a file name.";
      this.$store.commit("setphase", -1);
      let json = this.$store.getters.copyState;
      this.getFileBlob(this.currentFile, function(blob) {
        var lenBuffer = new ArrayBuffer(4);
        var view = new DataView(lenBuffer);
        view.setUint32(0, json.length);
        var url = URL.createObjectURL(
          new Blob([lenBuffer, json, blob], { type: "application/case" })
        );
        var a = document.createElement("a");
        a.href = url;
        a.download = fileName + ".case";
        a.click();
        URL.revokeObjectURL(a.href);
      });
      this.$nextTick(() => this.$store.commit("setphase", 0));
      return "";
    }
  }
};
</script>

<template>
  <div id="files">
    <button @click="importIt">Import</button>
    <button @click="publishIt">Publish</button>
  </div>
</template>

<style lang="scss" scoped>
#files {
  float: right;
  display: inline-block;
  margin-right: 20px;
  z-index: 10;
}
#files button {
  border: 0px;
  background-color: $bg-color;
  cursor: pointer;
  font-size: $txt-font;
  font-weight: bold;
  margin: 4px;
}
#files button:hover {
  color: $select-color;
}
#import {
  position: absolute;
  top: 100px;
  left: 200px;
  width: 400px;
  height: 50%;
  color: black;
  font-size: $txt-font;
  background-color: $bg-color;
  padding: 4px;
  margin: 0;
  border: 1px solid $border-color;
  z-index: 5;
  p {
    text-align: center;
  }
}
#publish {
  position: absolute;
  top: 150px;
  left: 150px;
  width: 300px;
  height: 120px;
  color: black;
  border: 1px solid $border-color;
  font-size: $txt-font;
  background-color: $bg-color;
  padding: 4px;
  z-index: 5;
  text-align: left;
}
</style>
