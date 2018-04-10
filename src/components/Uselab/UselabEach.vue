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
    <div class="input-group">

    </div>
    <div class="input-group">
      <select class="form-control" v-model="apply.date_year">
        <option v-for="year in opt_year" :key="year">{{ year }}</option>
      </select>
      <span class="input-group-addon">-</span>
      <select class="form-control" v-model="apply.date_month">
        <option v-for="month in opt_month" :key="month">{{ month }}</option>
      </select>
      <span class="input-group-addon">-</span>
      <select class="form-control" v-model="apply.date_date">
        <option v-for="date in opt_date" :key="date">{{ date }}</option>
      </select>
    </div>
    <div class="choosetime">
      <span class="label label-default">彩排时间</span>
      <TimeChooser :time="apply.ctime" :begin="'7:30'" :end="'20:00'" @time="apply.ctime=arguments[0]"></TimeChooser>
    </div>
    <div class="choosetime">
      <span class="label label-default">开始时间</span>
      <TimeChooser :time="apply.btime" :begin="apply.ctime" :end="'20:30'" @time="apply.btime=arguments[0]"></TimeChooser>
    </div>
    <div class="choosetime">
      <span class="label label-default">结束时间</span>
      <TimeChooser :time="apply.etime" :begin="apply.btime" :end="'21:00'" @time="apply.etime=arguments[0]"></TimeChooser>
    </div>
    <div class="row" style="margin-bottom: 10px;margin-top: 10px">
      <div class="btn btn-info col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4" onclick="modal.ShowTimeTable()">点我查看时刻表</div>
    </div>
    <span class="label label-default">活动人数</span>
    <input type="number" class="form-control" v-model="apply.actpeo" placeholder="不超过80人">
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
import TimeChooser from "./TimeChooser";
export default {
  name: "",
  components: {
    TimeChooser
  },
  props: ["id"],
  data() {
    return {
      apply: {}
    };
  },
  computed: {
    opt_year() {
      var date = new Date();
      if (date.getMonth() > 10)
        return ["", date.getFullYear(), date.getFullYear() + 1];
      else return ["", date.getFullYear()];
    },
    opt_month() {
      var date = new Date();
      if (this.apply.date_year == date.getFullYear())
        if (date.getMonth() == 11) return ["", 12];
        else return ["", date.getMonth() + 1, date.getMonth() + 2];
    },
    opt_date() {
      var date = new Date();
      var arr = [""];
      function getDayOfMonth(month) {
        return new Date(
          this.getFullYear(),
          month ? month : this.getMonth() + 1,
          0
        ).getDate();
      }
      for (
        var i =
          this.apply.date_month == date.getMonth() + 1 ? date.getDate() : 1;
        i <= getDayOfMonth.call(date, this.apply.date_month);
        ++i
      )
        arr.push(i);
        this.apply.date_date = arr[0];
      return arr;
    }
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
      var datestr = `${senddata.date_year}/${senddata.date_month}/${
        senddata.date_date
      } `;
      senddata.ctime = new Date(datestr + senddata.ctime) / 1000;
      senddata.btime = new Date(datestr + senddata.btime) / 1000;
      senddata.etime = new Date(datestr + senddata.etime) / 1000;
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
    this.$store.commit('ChangeHolding',true);
    axios.get(`/index/applyeach/id/${this.id}`).then(res => {
      var adata = res.data;
      var applydate = new Date(adata.ctime * 1000);
      adata.date_year = applydate.getFullYear();
      adata.date_month = applydate.getMonth() + 1;
      adata.date_date = applydate.getDate();

      function toTime(a) {
        return `${a.getHours()}:${
          a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes()
        }`;
      }
      adata.ctime = toTime(applydate);
      applydate = new Date(adata.btime * 1000);
      adata.btime = toTime(applydate);
      applydate = new Date(adata.etime * 1000);
      adata.etime = toTime(applydate);
      this.apply = res.data;
    });
  },
  beforeDestroy(){
    this.$store.commit('ChangeHolding',false);
  }
};
</script>

<style lang='scss'>
#UselabEach {
  .choosetime {
    display: flex;
    align-items: center;
    height: 50px;
    .label {
      margin-right: 20px;
    }
    .TimeChooser {
      flex-grow: 1;
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