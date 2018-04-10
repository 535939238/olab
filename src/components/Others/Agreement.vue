<template>
    <div id='Agreement' class="container">
        <p class="pretitle">O-Lab场地使用规则与协议</p>
        <div>
            <div ref="editor"></div>
            <div class="btn btn-info col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top:10px;" @click="Preview">预览</div>
        </div>
    </div>
</template>

<script>
import E from "wangEditor";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    Preview() {
      modal.Show({
        title: "O-Lab场地使用规则与协议",
        contains: this.editor.txt.html(),
        certain: "保存",
        certained: () => {
          axios
            .post("/actrl/changeagree", { html: this.editor.txt.html() })
            .then(modal.Common);
        }
      });
    }
  },
  mounted: function() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.zIndex = 50;
    this.editor.customConfig.pasteFilterStyle = false;
    this.editor.create();
    axios.get("/static/gd.html?" + +new Date()).then(res => {
      this.editor.txt.html(res.data);
    });
  }
};
</script>

<style lang='scss'>
#Agreement {
  .w-e-toolbar {
    flex-wrap: wrap;
    .w-e-menu {
      z-index: inherit !important;
      .w-e-droplist {
        z-index: 52;
      }
    }
  }
  .w-e-text-container {
    background: rgba(255, 255, 255, 0.8);
    text-align: left
  }
}
</style>