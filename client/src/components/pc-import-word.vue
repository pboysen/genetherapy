<script>
import PcModal from "@/components/pc-modal.vue";
export default {
  components: {
    PcModal
  },
  methods: {
    download() {},
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
        <div id="dropZone">
          <p>
            Drop a file here or select a file:<br /><br />
            <input type="file" name="file" id="uploadFile" class="inputfile" />
          </p>
        </div>
        <div class="error" id="droperror"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div id="import-buttons">
        <button @click="download">Download</button>
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
