<template>
  <div id='ApplyShow' class="container">    
    <transition-group name="fadeUp" tag="div" class="flexdep" appear>
      <p class="pretitle" key="title">O-Lab申请表审核</p>
      <div v-for="(apply,index) in applylist" :key="apply.id" :style="{'animation-delay':index*0.1+'s'}">
        <ApplyPanel :apply="apply" admin="true" @change="checkedindex=index"></ApplyPanel>
      </div>
      <div key="checkname">
        <div class="input-group col-xs-12 col-sm-6 col-sm-offset-3">
          <span class="input-group-addon">经办人姓名</span>
          <input type="text" class="form-control" v-model="checkname">
          <div class="input-group-btn">
            <div class="btn btn-warning" @click="ChangeCheckname">修改</div>
          </div>
        </div>
      </div>
      <div key="timetable">
        <div class="btn btn-info col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" style="margin-bottom:10px;" onclick="modal.ShowTimeTable()">点我查看时刻表</div>
      </div>
    </transition-group>
    <transition name="fadeRight">
      <ApplyCheck v-if="checkedindex!==false" @goback="checkedindex=false" :apply="applylist[checkedindex]"></ApplyCheck>
    </transition>
  </div>
</template>

<script>
import ApplyPanel from "./ApplyPanel";
import ApplyCheck from "./ApplyCheck";
export default {
  name: "",
  components: {
    ApplyPanel,
    ApplyCheck
  },
  data() {
    return {
      applylist: [],
      checkname: "",
      checkedindex: false
    };
  },
  methods: {
    CheckApply(id) {
      window.location = "/auselab/checkapplyeach/id/" + id;
    },
    ChangeCheckname() {
      modal.Show({
        contains: "确认修改？",
        certain: "确定",
        certained: function() {
          axios
            .get("/auselab/changecheckname/name/" + this.checkname)
            .then(modal.Common);
        }.bind(this)
      });
    }
  },
  mounted() {
    axios.get("/auselab/applyshow").then(res => {
      this.applylist = res.data.list;
      this.checkname = res.data.checkname;
    });
  }
};
</script>

<style lang='scss'>
#ApplyShow {
  .flexdep {
    display: flex;
    flex-wrap: wrap;
    > div {
      flex-basis: 33.33%;
      padding: 13px;
      @media (max-width: 991px) {
        flex-basis: 50%;
      }
      @media (max-width: 677px) {
        flex-basis: 100%;
      }
      &:last-child {
        flex-basis: 100%;
      }
      &:nth-last-child(2) {
        flex-basis: 100%;
      }
      .panel-body h5 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    > p.pretitle {
      flex-basis: 100%;
    }
  }
}
</style>