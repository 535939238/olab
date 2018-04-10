<template>
  <div id='Active'>
    <component v-if="Comp" :is="Comp"></component>
    <div v-if="Comp" v-html="StyleDom"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      Comp: false,
      StyleDom: ""
    };
  },
  methods: {
    LoadComp() {
      var f = this.$route.fullPath.replace(/^\/active\//, "");
      axios.get(`/active/${f}`).then(res => {
        var virtual = document.createElement("div");
        virtual.innerHTML = res.data;
        window.vir = virtual;
        var vueComp = new Function(
          virtual
            .querySelector("script")
            .innerHTML.replace("export default", "return")
        )();
        vueComp.template = virtual.querySelector("template").innerHTML;
        this.StyleDom = virtual.querySelector("style").outerHTML;
        this.Comp = vueComp;
      });
    }
  },
  watch: {
    "$route.fullPath"() {
      this.LoadComp();
    }
  },
  mounted() {
    this.LoadComp();
  }
};
</script>

<style lang='scss'>
#Active {
  .pagebg {
    background: rgba(255, 255, 255, 0.87);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.47);
    padding: 30px;
  }
}
</style>