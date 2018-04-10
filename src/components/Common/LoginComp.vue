<template>
  <div id='LoginComp'>
    <template v-if="$store.state.User.user">
      <img :src="$store.state.User.imgpath" alt="140x140" class="img-rounded headimg">
      <div style="display:table;width: 100%;" key="1">
        <div class="col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4 btn btn-warning" @click="Logout">注销</div>
      </div>
    </template>
    <template v-else>
      <div class="logincode" key="2"></div>
      <h3>请使用微信扫一扫登录</h3>
      <h3>(或在微信客户端中打开)</h3>
    </template>
  </div>
</template>

<script>
import('@/assets/qrcode.min.js')
export default {
  name: "",
  data() {
    return {
      timer: false
    };
  },
  methods: {
    Logout() {
      axios.get("/index/logout").then(() => {
        this.$store.commit("Logout");
        this.$nextTick(res => {
          if(window.navigator.userAgent.match(/MicroMessenger/i) == "MicroMessenger")
            modal.show = false;
          else this.AddCode();
        });
      });
    },
    AddCode() {
      var MakeCode = function() {
        axios.get("/index/gettoken").then(res => {          
          new QRCode(this.$el.querySelector(".logincode"), {
            text: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
              this.$store.state.appid
            }&redirect_uri=https%3A%2F%2Fwww.oucolab.cn%2Findex%2Fcodevue&response_type=code&scope=snsapi_userinfo&state=${
              res.data
            }#wechat_redirect`,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
        });
      }.bind(this);
      /*if (!window.QRCode)
        axios.get("/static/js/qrcode.min.js").then(res => {
          new Function(res.data).call(window);
          MakeCode();
          //这是骚操作
        });
      else */MakeCode();
      this.timer = window.setInterval(() => {
        axios.get("/index/checklogin").then(res => {
          if (res.data.state == true) {
            this.$store.commit("Login", res.data);
            window.clearInterval(this.timer);
            modal.show = false;
          }
        });
      }, 2000);
    }
  },
  mounted() {
    if (!this.$store.state.User.user) {
      this.$nextTick(() => {
        this.AddCode();
      });
    }
  },
  beforeDestroy() {
    if (this.timer !== false) {
      window.clearInterval(this.timer);
    }
  }
};
</script>

<style lang='scss'>
#LoginComp {
  text-align: center;
  .logincode img {
    display: inline !important;    
  }
  .headimg{
    height: 256px;
    margin-bottom: 10px;
  }
}
</style>