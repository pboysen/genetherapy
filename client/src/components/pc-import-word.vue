<script>
import PcModal from "@/components/pc-modal.vue";
import {getPhases} from "@/mixins/getPhases-mixin";
export default {
  components: {
    PcModal
  },
  methods: {
    handleFiles(files) {
      var err = document.getElementById("droperror");
      err.style.visibility = "visible";
      err.innerHTML = "Making the case...";
      const docxtype =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      if (files.length == 1) {
        if (files[0].type === docxtype) {
          var reader = new FileReader();
          var that = this;
          reader.onload = function() {
            getPhases(reader.result, err)
              .then(phases => {
                err.style.visibility = "hidden";
                let doc = { "fileName": files[0].name, "phases": phases };
                that.$store.commit("setState", doc);
                localStorage.setItem("allele", JSON.stringify(doc));
                that.cancel();
              });
          };
          reader.readAsArrayBuffer(files[0]);
        } else err.innerHTML = "Only .docx files can be read.";
      } else err.innerHTML = "Please select one file.";
    },
    drop(e) {
      e.preventDefault();
      var files = [];
      if (e.dataTransfer.items) {
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === "file") {
            files.push(e.dataTransfer.items[i].getAsFile());
          }
        }
      }
      this.handleFiles(files);
    },
    download() {
      let uploadFile = document.getElementById("uploadWord");
      this.handleFiles(uploadFile.files);
    },
    cancel() {
      this.$store.commit("setModal", false);
    }
  }
};
</script>
<template>
  <pc-modal>
    <template v-slot:header>
      Import Word as a Case
    </template>
    <template v-slot:body>
      <div id="import">
        <div id="dropZone" @dragover.stop.prevent @drop="drop($event)">
          <p>
            Drop a file here or select a file:<br /><br />
            <input type="file" name="file" id="uploadWord" class="inputfile" />
          </p>
        </div>
        <div class="error" id="droperror"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div id="import-buttons">
        <button @click.stop.prevent="download()">Download</button>
        <button @click="cancel">Cancel</button>
      </div>
    </template>
  </pc-modal>
</template>
<style lang="scss" scoped>
#dropZone {
  display: block;
  font-size: 14px;
  border: 1px dotted gray;
  margin: 20px;
  width: 300px;
  height: 200px;
  padding: 5px;
}
#import-buttons {
  text-align: center;
  display: inline-block;
}
#import-buttons button {
  border: 0px;
  background-color: white;
  cursor: pointer;
  font-size: $txt-font;
  font-weight: bold;
  margin: 4px;
}
#import-buttons button:hover {
  color: $select-color;
}
.error {
  border: 1px solid red;
  font-size: 14px;
  visibility: hidden;
  margin: 20px;
  width: 300px;
  padding: 5px;
}
</style>
