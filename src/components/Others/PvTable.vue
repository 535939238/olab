<template>
    <div id='PvTable' class="container">
        <p class="pretitle">{{data.cn}}</p>
        <div style="overflow-x:auto">
            <table class="table table-striped table-hover table-condensed">
                <thead>
                    <tr>
                        <th v-for="col in data.cols" :key="col">{{col}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,index) in data.rows" :key="index">
                        <td v-for="col in row" :key="col">{{col}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btn btn-success col-sm-4 col-sm-offset-4 col-xs-12" @click="Download">下载</div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      data: {}
    };
  },
  methods: {
    Download() {
      window.open(`/actrl/dltable/table/${this.data.table}`);
    }
  },
  mounted() {
    axios
      .get(`/actrl/pvtableajax/table/${this.$route.params.table}`)
      .then(res => {        
        if (res.data === false)
          modal.Show({
            contains: `不存在该表格!${this.$route.params.table}`
          });
        else this.data = res.data;
      });
  }
};
</script>

<style lang='scss'>
#PvTable {
}
</style>