<template>
  <div id='Image'>
    <h2>图片设置</h2>
    <ImageSelect ref="select" @select="selectedindex = arguments[0]" />
    <div class="msbtn btn-info col-xs-12 col-sm-4 col-sm-offset-4" @click="selectedindex='new.jpg'">新建</div>
    <div class="row"></div>
    <transition name="fadeRight">
      <ImageEditor v-if="selectedindex!=-1" :name="selectedindex" @goback="selectedindex = -1" @rename="UpdateEvent" />
    </transition>
  </div>
</template>

<script>
import ImageSelect from "./ImageSelect";
import ImageEditor from "./ImageEditor";
export default {
  name: "",
  components: {
    ImageSelect,
    ImageEditor
  },
  data() {
    return {
      selectedindex: -1
    };
  },
  methods: {
    UpdateEvent(name) {
      if (name) this.selectedindex = name;
      this.$refs.select.Refresh();
    }
  }
};
</script>

<style lang='scss'>
#Image {
}
</style>