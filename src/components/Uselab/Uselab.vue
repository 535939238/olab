<template>
  <div id='Uselab' class="container">
    <transition-group name="fadeUp" tag="div" class="flexdep" appear>
      <p class="pretitle" key="title">O-Lab申请表概览</p>
      <div v-for="(apply,index) in applylist" :key="index" :style="{'animation-delay':index*0.1+'s'}">
        <ApplyPanel :apply="apply" admin="false" @change="checkedindex=index" @delete="Delete(index)"></ApplyPanel>
      </div>
      <div :key="'btn'">
        <div class="btn btn-info col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" @click="AddApply">添加申请表</div>
      </div>
    </transition-group>
    <transition name="fadeRight">
      <UselabEach v-if="checkedindex!==false" :id="applylist[checkedindex].id" @goback="checkedindex=false"></UselabEach>
    </transition>
  </div>
</template>

<script>
import ApplyPanel from "./ApplyPanel";
import UselabEach from "./UselabEach";
export default {
  name: "",
  components: {
    ApplyPanel,
    UselabEach
  },
  data() {
    return {
      applylist: [],
      checkedindex: false
    };
  },
  methods: {
    Delete: function(index) {
      modal.Show({
        title: "删除确定",
        contains: "确定要删除整个申请表？(删除后无法撤回)",
        certain: "确定",
        certained: function() {
          axios.get("/index/deleteapply?id=" + this.applylist[index].id).then(
            function(res) {
              if (res.data.state == true) this.applylist.splice(index, 1);
              modal.Common(res);
            }.bind(this)
          );
        }.bind(this)
      });
    },
    AddApply: function() {
      if(this.$store.User.user === fasle){
        modal.ShowLogin();
      }
      axios.get("/index/addapply").then(
        function(res) {
          if (res.data.state == true) {
            this.applylist.push({
              id: res.data.mes,
              state: 0
            });
          } else modal.Common(res);
        }.bind(this)
      );
    }
  },
  mounted() {
    axios.get("/index/uselablist").then(res => {
      this.applylist = res.data;
    });
  }
};
</script>

<style lang='scss'>
#Uselab {
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
    }
    > p.pretitle {
      flex-basis: 100%;
    }
  }
}
</style>