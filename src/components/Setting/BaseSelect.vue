<template>
  <div id='SelectBase'>

  </div>
</template>

<script>
import Pagination from "./Pagination";
export default {
  name: "",
  components: {
    Pagination
  },
  data() {
    return {
      pagenum: 1,
      div: 10,
      type: "",
      items: [],
      pageat: 1
    };
  },
  methods: {
    Refresh() {
      axios.get(`/gettool/${this.type}/${this.div}/${this.pageat}`).then(res=>{
        this.pagenum = res.data.pagenum;
        this.items = res.data.data;
      })
    }
  },
  watch:{
    pageat(){
      this.Refresh();
    },
    div(){
      this.Refresh();
    }
  },
  mounted(){
    this.Refresh();
  }
};
</script>

<style lang='scss'>

</style>