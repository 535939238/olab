<template>
    <nav style="text-align:center" id="Pagination">
        <ul class="pagination">
            <li @click="pageat=1">
                <span>&laquo;</span>
            </li>
            <li :class="{disabled:pageat<2}" @click="Previous">
                <span>&lt;</span>
            </li>
            <li class="active">
                <span>{{pageat}}</span>
            </li>
            <li :class="{disabled:pageat>pagenum-1}" @click="Next">
                <span>&gt;</span>
            </li>
            <li @click="pageat=pagenum">
                <span>&raquo;</span>
            </li>
        </ul>
        <div class="row"></div>
        <div class="page-jump col-sm-3 col-sm-offset-3 col-xs-6">
            <div class="input-group">
                <input v-model.number="ippage" type="number" class="form-control">
                <div class="input-group-btn">
                    <div class="btn btn-default" @click="pageat=ippage">GO</div>
                </div>
                <span>共{{pagenum}}页</span>
            </div>
        </div>
        <div class="page-jump col-sm-3 col-xs-6">
            <div class="input-group">
                <span class="input-group-addon">每页个数</span>
                <input type="text" class="form-control" v-model.lazy="div">
            </div>
        </div>
        <div class="row"></div>
    </nav>
</template>

<script>
export default {
  name: "",
  props: ["pagenum"],
  data() {
    return {
      pageat: 1,
      ippage: 1,
      div: 10
    };
  },
  watch: {
    pageat(val) {
      if (val > this.pagenum || val < 1) this.pageat = 1;
      else this.$emit("page", val);
    },
    ippage(val) {
      if (val == "") return;
      if (val > this.pagenum) this.ippage = this.pagenum;
      else if (val < 1) this.ippage = 1;
    },
    div(val) {
      this.$emit("div", val, this.pageat);
    }
  },
  methods: {
    Previous() {
      if (this.pageat > 1) this.pageat--;
    },
    Next() {
      if (this.pageat < this.pagenum) this.pageat++;
    }
  }
};
</script>

<style lang='scss'>
#Pagination {
  .page-jump span {
    display: table-cell;
    vertical-align: middle;
    white-space: nowrap;
  }
  .input-group{
      margin-bottom: 10px;
  }
}
</style>