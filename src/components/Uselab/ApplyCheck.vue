<template>
  <div id='ApplyCheck' class="slidepanel">
    <button class="close" @click="$emit('goback')">&times;</button>
    <div class="applyreview" v-html="contains"></div>
    <p class="bg-primary">当前状态： {{State}}
      <template v-if="apply.state==3"><br>未通过原因: {{reason}}</template>
    </p>
    <div class="btncon" style="margin-top:50px;">
      <div class="btn btn-lg btn-success col-sm-2 col-sm-offset-2 col-xs-12" @click="AccessApply">通过申请</div>
      <div class="btn btn-lg btn-warning col-sm-2 col-sm-offset-1 col-xs-12" @click="RefuseApply">撤回申请</div>
      <div class="btn btn-lg btn-info col-sm-2 col-sm-offset-1 col-xs-12" @click="PrintApply">打印申请表</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["apply"],
  data() {
    return {
      contains: "",
      reason: ""
    };
  },
  computed: {
    State() {
      return [
        "未提交",
        "已过时",
        "时间冲突",
        "未通过审核",
        "未审核",
        "审核通过"
      ][this.apply.state];
    }
  },
  methods: {
    AccessApply() {
      modal.Show({
        title: "通过审核确定",
        contains: "确定要通过此审核吗？",
        certain: "确定",
        certained: () => {
          axios.get(`/auselab/checkapply/id/${this.apply.id}`).then(res => {
            if (res.data.state == true) this.apply.state = 5;
            modal.Common(res);
          });
        }
      });
    },
    RefuseApply() {
      var reason = this.reason;
      modal.Show({
        title: "拒绝审核确定",
        SubComp: {
          template: `<div>
            <h4>确定要撤回此申请吗?请写下撤回理由</h4>
            <textarea cols="30" rows="10" class="form-control" placeholder="理由" v-model="reason"></textarea>
        </div>`,
          data() {
            return { reason };
          }
        },
        certain: "确定",
        certained: () => {
          var senddata = { reason: modal.$children[0].reason };
          axios
            .post(`auselab/checkapply/id/${this.apply.id}?refuse=1`, senddata)
            .then(res => {
              if (res.data.state == true) {
                this.apply.state = 3;
                this.reason = senddata.reason;
              }
              modal.Common(res);
            });
        }
      });
    },
    PrintApply() {
      window.open(`/auselab/printapply/id/${this.apply.id}`);
    }
  },
  mounted() {
    axios.get(`/auselab/applyeach/id/${this.apply.id}`).then(res => {
      this.contains = res.data;
    });
    axios.get(`/auselab/refusereason/id/${this.apply.id}`).then(res => {
      this.reason = res.data;
    });
    this.$store.commit("ChangeHolding", true);
  },
  beforeDestroy() {
    this.$store.commit("ChangeHolding", false);
  }
};
</script>

<style lang='scss'>
#ApplyCheck {
  width: 100% !important;
  .btncon {
    .btn {
      margin-bottom: 10px;
    }
  }
  .bg-primary {
    padding: 20px;
    font-size: 20px;
  }
  .applyreview{
    overflow-x: auto;
    max-height: 1570px;
  }
}
</style>