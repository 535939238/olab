<template>
  <div id='ImageEditor' class="slidepanel">
    <button class="close" @click="$emit('goback')">&times;</button>
    <h2>{{name}}</h2>
    <div class="imgcontainer">
      <a :href="'/static/uploads/'+name" target="#" :style="'background-image:url('+imgsrc+');'"></a>
    </div>
    <form class="fileform">
      <span class="label label-default">名称</span>
      <input type="text" class="form-control" v-model="oname" name="name">
      <span class="label label-default">上传</span>
      <input type="file" class="form-control" name="imagefile" @change="File_input">
    </form>
    <div class="alert alert-info">图片链接:
      <a class="alert-link" target="#" :href="staticLocate">{{staticLocate}}</a>
    </div>
    <div class="flexdep">
      <div>
        <div class="btn btn-info btn-block" @click="Save">保存</div>
      </div>
      <div>
        <div class="btn btn-warning btn-block" @click="Delete">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["name"],
  data() {
    return {
      oname: this.name,
      imgsrc: `/static/uploads/${this.name}`
    };
  },
  computed: {
    staticLocate: function() {
      return `${window.location.origin}/static/uploads/${this.name}`;
    }
  },
  methods: {
    Save() {
      var form = new FormData(this.$el.querySelector(".fileform"));
      axios
        .request({
          url: `/setting/alterimage/image/${this.name}`,
          method: "post",
          data: form
        })
        .then(res => {
          if (res.data.state == true) {
            this.$emit("rename", this.oname);
            //   bridge.$emit("list.update");
          }
          modal.Common(res);
        });
    },
    Delete() {
      if (this.name == "new.file") {
        this.$emit("goback");
        return;
      }
      axios.get(`/setting/deleteimage/image/${this.name}`).then(res => {
        modal.Common(res);
        if (res.data.state == true) {
          // bridge.$emit("list.update");
          this.$emit("goback");
        }
      });
    },
    File_input: function(e) {
      var file = e.target.files[0];
      if (file) {
        var reader = new FileReader(file);
        reader.onloadend = function() {
          this.imgsrc = reader.result;
        }.bind(this);
        reader.readAsDataURL(file);
      } else {
        this.imgsrc = `/static/uploads/${this.name}`;
      }
    }
  },
  mounted() {
    this.$store.commit("ChangeHolding", true);
  },
  beforeDestroy() {
    this.$store.commit("ChangeHolding", false);
  }
};
</script>

<style lang='scss'>
#ImageEditor {
}
</style>