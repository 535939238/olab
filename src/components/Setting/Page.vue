<template>
  <div id="Page">
    <h2>页面设置</h2>
    <PageSelect ref="select" @select="selectedindex = arguments[0]" />
    <div class="msbtn btn-info col-xs-12 col-sm-4 col-sm-offset-4" v-on:click="selectedindex='new.page'">新建</div>
    <div class="row"></div>
    <div id="cont"></div>
    <transition name="fadeRight">
      <PageEditor v-if="selectedindex!=-1" :name="selectedindex" @goback="selectedindex = -1" @rename="UpdateEvent" />
    </transition>
  </div>
</template>

<script>
import PageSelect from "./PageSelect";
import PageEditor from "./PageEditor";
export default {
  name: "",
  components: {
    PageSelect,
    PageEditor
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
#Page {
}
</style>