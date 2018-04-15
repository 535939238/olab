<template>
  <div id='UselabEach' class="slidepanel">
    <button class="close" @click="$emit('goback')">&times;</button>
    <p class="pretitle">O-Lab场地使用申请表</p>
    <h4 style="text-align: center">申请单编号:{{id}}</h4>
    <span class="label label-default">申请人</span>
    <input type="text" class="form-control" v-model="apply.name">
    <span class="label label-default">学号</span>
    <input type="number" class="form-control" v-model="apply.scid">
    <span class="label label-default">联系方式</span>
    <input type="number" class="form-control" v-model="apply.number">
    <span class="label label-default">申请单位</span>
    <input type="text" class="form-control" v-model="apply.unit">
    <span class="label label-default">指导单位</span>
    <select class="form-control" v-model="apply.lead">
      <option value="0"></option>
      <option value="1">中国海洋大学校团委</option>
      <option value="2">海洋与大气学院团委</option>
      <option value="3">信息科学与工程学院团委</option>
      <option value="4">化学化工学院团委</option>
      <option value="5">海洋地球科学学院团委</option>
      <option value="6">海洋生命学院团委</option>
      <option value="7">水产学院团委</option>
      <option value="8">食品科学与工程学院团委</option>
      <option value="9">医药学院团委</option>
      <option value="10">工程学院团委</option>
      <option value="11">环境科学与工程学院团委</option>
      <option value="12">管理学院团委</option>
      <option value="13">经济学院团委</option>
      <option value="14">外国语学院团委</option>
      <option value="15">文学与新闻传播学院团委</option>
      <option value="16">法政学院团委</option>
      <option value="17">数学科学学院团委</option>
      <option value="18">材料科学与工程学院团委</option>
      <option value="19">基础教学中心团委</option>
      <option value="20">马克思主义学院团委</option>
      <option value="99">其他</option>
    </select>
    <input v-if="apply.lead==99" type="text" class="form-control" v-model="apply.leadoth" placeholder="请填写指导单位">
    <span class="label label-default">活动名称</span>
    <input type="text" class="form-control" v-model='apply.actname'>
    <span class="label label-default">现场负责人</span>
    <input type="text" class="form-control" v-model='apply.mananame'>
    <span class="label label-default">联系方式</span>
    <input type="number" class="form-control" v-model='apply.mananumber'>
    <span class="label label-default">活动单位负责人</span>
    <input type="text" class="form-control" v-model='apply.actleader'>
    <span class="label label-default">活动简介</span>
    <textarea rows="4" class="form-control" v-model="apply.acttype" placeholder="最多50字"></textarea>
    <span class="label label-default">使用日期</span>
    <vueSlider v-bind="datedemo" v-model="datedemo.value" />   
    <span class="label label-default">使用时间</span>
    <vueSlider v-bind="timedemo" v-model="timedemo.value" />

    <div class="row" style="margin-bottom: 10px;margin-top: 10px">
      <div class="btn btn-info col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4" onclick="modal.ShowTimeTable()">点我查看时刻表</div>
    </div>
    <span class="label label-default">活动人数</span>
    <vueSlider v-model="apply.actpeo" :min="1" :max="80" />
    <span class="label label-default">活动流程</span>
    <textarea rows="10" class="form-control" v-model="apply.process"></textarea>
    <span class="label label-default">安全预案</span>
    <textarea rows="10" class="form-control" v-model="apply.safe" placeholder="至少需要200字，否则不予通过"></textarea>
    <span class="label label-default">备注信息</span>
    <input type="text" class="form-control" v-model="apply.extra">
    <span class="label label-default">设备使用</span>

    <label class="checkuni" style="margin-top:4px;">
      <input type="checkbox" v-model="apply.mask">
      <h5>投影仪</h5>
    </label>
    <label class="checkuni">
      <input type="checkbox" v-model="apply.sound">
      <h5>音响(话筒请自备两节五号电池)</h5>
    </label>
    <label class="checkuni">
      <input type="checkbox" v-model="apply.aircon">
      <h5>空调</h5>
    </label>

    <label style="position:relative">
      <div class="checkuni">
        <input type="checkbox" v-model="apply.agree">
        <h5 style="font-weight:bold">我已阅读并且同意
          <label>
            <a type="button" @click="ShowAgree">《O-Lab场地使用规则与协议》</a>
          </label>
        </h5>
      </div>
    </label>
    <div style="margin-top: 30px;">
      <template v-if="apply.state==0">
        <div class="btn btn-info" style='margin-right: 35px' @click='SubmitApply'>保存</div>
        <div class="btn btn-warning" @click='SubmitApply(true)'>保存并提交申请</div>
      </template>
      <template v-else-if="apply.state==5">
        <div class="btn btn-success" style='margin-right: 35px' @click='PrintApply'>打印申请表</div>
        <div class="btn btn-warning" @click='RevokeApply'>撤回申请</div>
      </template>
      <template v-else>
        <div class="btn btn-warning" style='margin-right: 35px' @click='RevokeApply'>撤回申请</div>
        <div class="btn btn-warning" @click='SubmitApply(true)'>保存并重新提交申请</div>
      </template>
    </div>
  </div>
</template>

<script>
import vueSlider from "vue-slider-component";
export default {
  name: "",
  components: {    
    vueSlider
  },
  props: ["id"],
  data() {
    return {
      apply: {},
      datedemo: {
        value: "default",
        tooltip: "always",
        disabled: false,
        piecewise: true,
        piecewiseLabel: true,
        data: [],
        piecewiseStyle: {
          backgroundColor: "#ccc",
          visibility: "visible",
          width: "12px",
          height: "12px"
        },
        piecewiseActiveStyle: {
          backgroundColor: "#3498db"
        },
        labelActiveStyle: {
          color: "#3498db"
        }
      },
      timedemo: {
        value: ["8:00", "9:00"],
        tooltip: "always",
        piecewise: true,
        data: [],
        piecewiseActiveStyle: {
          backgroundColor: "#3498db"
        }
      }
    };
  },
  methods: {
    SubmitApply(submit) {
      if (submit == true && !this.apply.agree) {
        modal.Show({
          contains: "请仔细阅读并同意《O-Lab场地使用规则与协议》!"
        });
        return;
      }
      var senddata = JSON.parse(JSON.stringify(this.apply));
      var datestr = "20" + this.datedemo.value.replace(/-/g, "/") + " ";
      senddata.ctime = new Date(datestr + this.timedemo.value[0]) / 1000;
      // senddata.btime = new Date(datestr + senddata.btime) / 1000;
      senddata.etime = new Date(datestr + this.timedemo.value[1]) / 1000;
      debugger;
      axios
        .post(
          `/index/changereq/id/${this.id}${submit == true ? "?submit=1" : ""}`,
          senddata
        )
        .then(res => {
          if (res.data.state == true && submit == true) this.apply.state = 4;
          modal.Common(res);
        });
    },
    PrintApply() {
      modal.Show({
        title: "打印申请表确定",
        contains:
          "您确定要打印申请表？(打印申请表之后，该申请将作为存档，并且无法修改和撤回。)",
        certain: "确定",
        certained: () => {
          window.location = "/index/printapply/id/" + this.id;
        }
      });
    },
    RevokeApply() {
      modal.Show({
        title: "撤回确定",
        contains:
          "您确定要撤回申请吗？（如果该申请已经通过，则撤回后需要重新审核,如果申请表已经下载，则无法撤回）",
        certain: "确定",
        certained: () => {
          axios.get(`/index/revokeapply/id/${this.id}`).then(res => {
            if (res.data.state == true) this.apply.state = 0;
            modal.Common(res);
          });
        }
      });
    },
    ShowAgree() {
      modal.Show({
        title: "O-Lab场地使用规则与协议",
        url: "/static/gd.html"
      });
    }
  },
  mounted() {
    this.$store.commit("ChangeHolding", true);
    axios.get(`/index/applyeach/id/${this.id}`).then(res => {
      var dateTimeStamp = +new Date() + 7 * 3600 * 24 * 1000; //七天
      var dateSelectOptions = [];
      for (var i = 0; i < 7; ++i) {
        var date = new Date(dateTimeStamp);
        dateSelectOptions.push(
          `${date.getFullYear() - 2000}-${date.getMonth() +
            1}-${date.getDate()}`
        );
        dateTimeStamp += 86400000; //一天
      }
      this.datedemo.data = dateSelectOptions;
      this.$common.trigEvent("resize");

      var timeSelectOptions = [];
      for (var i = 16; i < 43; ++i) {
        timeSelectOptions.push(Math.floor(i / 2) + (i % 2 ? ":30" : ":00"));
      }
      this.timedemo.data = timeSelectOptions;
      this.timedemo.value = [timeSelectOptions[0], timeSelectOptions[1]];

      function toTime(a) {
        return a.getHours() + (a.getMinutes() < 10 ? ":00" : ":30");
      }
      var adata = res.data;
      var applyctime = new Date(adata.ctime * 1000);
      var applyctimestr = toTime(applyctime);
      var applyetimestr = toTime(new Date(adata.etime * 1000));
      this.datedemo.value = `${applyctime.getFullYear() -
        2000}-${applyctime.getMonth() + 1}-${applyctime.getDate()}`;

      if(this.datedemo.data.indexOf(this.datedemo.value) == -1)
        if(adata.state == 3)
          this.datedemo.data.unshift(this.datedemo.value);
        else this.datedemo.value = this.datedemo.data[0];
      
      this.timedemo.value = [applyctimestr, applyetimestr];
      this.apply = res.data;
    });
  },
  beforeDestroy() {
    this.$store.commit("ChangeHolding", false);
  }
};
</script>

<style lang='scss'>
#UselabEach {
  .vue-slider-component {
    margin-top: 35px;
    margin-bottom: 30px;
    width: 80% !important;
    margin-left: 10%;
    @media (max-width: 767px) {
      width: 90% !important;
      margin-left: 5%;
      .vue-slider-piecewise-label {
        font-size: 3.5px;
      }
    }
  }
  .checkuni {
    display: flex;
    align-items: center;
    > input {
      margin: 5px;
    }
  }
  .input-group {
    display: flex;
    > .form-control {
      width: inherit;
    }
  }
}
</style>