<template>
    <div class='ApplyPanel panel' :class="{'panel-success':apply.state==5}">
        <div class="panel-heading">申请单编号:{{apply.id}}</div>
        <div class="panel-body">
            <h5>申请人姓名:{{apply.name}}</h5>
            <h5>申请单位:{{apply.unit}}</h5>
            <h5>活动名称:{{apply.actname}}</h5>
            <h5>活动时间:{{Time}}</h5>
            <h5>状态:{{State}}</h5>
        </div>
        <div class="panel-footer">
            <div class="row">
                <div v-if="admin=='true'" class="btn btn-warning" style="float:right;margin-right:15px;" @click="$emit('change')">修改</div>
                <template v-else>
                    <div class="btn btn-info" style="float:right;margin-right:15px;" @click="$emit('change')">修改</div>
                    <div class="btn btn-warning" style="float:right;margin-right:5px" @click="$emit('delete')">删除</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  props: ["apply", "admin"],
  data() {
    return {};
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
    },
    Time() {
      if (this.apply.ctime == undefined) return "";
      var begin = new Date(this.apply.ctime * 1000);
      var end = new Date(this.apply.etime * 1000);
      var ftt = function(val) {
        return val < 10 ? "0" + val : val;
      };
      return `${begin.getFullYear()}-${begin.getMonth() +
        1}-${begin.getDate()} ${begin.getHours()}:${ftt(
        begin.getMinutes()
      )}-${end.getHours()}:${ftt(end.getMinutes())}`;
    }
  }
};
</script>

<style lang='scss'>
.ApplyPanel {
  border: 0;
  box-shadow: 6px 6px 17px rgba(54, 54, 54, 0.3);
  background: rgba(255, 255, 255, 0.6);
  > .panel-heading {
    color: white;
    background-color: rgb(255, 177, 86);
    padding: 16px;
    font-size: 17px;
  }
  > .panel-body {
    text-align: left;
  }
  > .panel-footer {
    border-top: 0;
  }
  &.panel-success > .panel-heading {
    color: #3c763d;
    background-color: #dff0d8;
  }
}
</style>