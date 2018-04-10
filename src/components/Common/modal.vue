<template>
  <transition name="modal">
    <div id="Modal" class="modalbox" v-if="show">
      <div class="modal-backdrop in"></div>
      <div class="modal fade in" tabindex="-1">
        <div class="modal-dialog" :class="large ? 'modal-lg':''">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="Cancel">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">{{title}}</h4>
            </div>
            <div class="modal-body" v-if="SubComp">
              <component ref="subcomp" :is="SubComp" :data="SubCompData" @select="this.SubCompEvent"></component>
            </div>
            <div class="modal-body" v-else v-html="contains">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="Cancel">关闭</button>
              <button v-if="certain" type="button" class="btn btn-primary" @click="Certain">{{certain}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

const TimelinePage = resolve => require(["@/components/Timeline/TimelinePage"], resolve)
const LoginComp = resolve => require(["./LoginComp"], resolve)

export default {
  name: "Modal",
  components: {},
  data() {
    return {
      show: false,
      title: "提示",
      contains: "内容",
      large: false,
      SubComp: null,
      SubCompData: null,
      SubCompEvent: null
    };
  },  
  methods: {
    Show(options) {
      var options = options || {};
      this.title = options.title || "提示";
      if (options.contains && options.contains.innerHTML)
        this.contains = options.contains.innerHTML;
      else this.contains = options.contains || "";
      this.large = options.large || false;
      this.certain = options.certain;
      this.cancelled = options.cancelled;
      this.certained = options.certained;
      this.SubComp = options.SubComp;
      this.SubCompData = options.SubCompData;
      this.SubCompEvent = options.SubCompEvent;
      this.show = true;
      if (options.url)
        axios.get(options.url).then(
          function(res) {
            this.contains = res.data;
            this.$nextTick(function() {
              this.$emit("loaded");
            });
          }.bind(this)
        );
      return this;
    },
    Cancel() {
      this.show = false;
      this.$emit("cancelled", this.cancelled ? this.cancelled() : undefined);
    },
    Certain() {
      this.show = false;
      this.$emit("certained", this.certained ? this.certained() : undefined);
    },
    Common(res) {
      res = res.data;
      switch (res.res) {
        case -1:
          loadLoginModal();
          break;
        case 0:
          this.Show({
            contains: res.mes,
            cancelled: res.callback
          });
          break;
        case 1:
          this.Show({
            contains: res.mes,
            cancelled: res.callback
          });
          break;
        default:
          break;
      }
    },
    ShowTimeTable() {
      modal.Show({
        title: "O-Lab时刻表",
        SubComp: TimelinePage,
        large: true
      });
    },
    ShowLogin() {
      if (
        !this.$store.state.User.user &&
        window.navigator.userAgent.match(/MicroMessenger/i) == "MicroMessenger"
      ) {
        window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
          this.$store.state.appid
        }&redirect_uri=https%3A%2F%2Fwww.oucolab.cn%2Findex%2Fcodegetmob&response_type=code&scope=snsapi_userinfo&state=${encodeURIComponent(
          this.$route.path
        )}#wechat_redirect`;
      } else
        this.Show({
          title: "账户",
          SubComp: LoginComp
        });
    }
  },
  watch: {
    show(val) {
      if (val == true) {        
        this.$nextTick(() => {
          this.$emit("show");
        });
        this.$store.commit('ChangeHolding',true);
      } else {        
        this.$nextTick(() => {
          this.$emit("hide");
        });
        this.$store.commit('ChangeHolding',false);
      }
    },
    contains(htmldata) {
      this.$nextTick(function() {
        var scriptlist = this.$el.querySelectorAll("script");
        var f = function(i) {
          if (!scriptlist[i]) return;
          if (scriptlist[i].src && scriptlist[i].src != "")
            axios.get(scriptlist[i].src).then(function(res) {
              eval(res.data);
              return f(i + 1);
            });
          else {
            eval(scriptlist[i].innerHTML);
            return f(i + 1);
          }
        };
        f(0);
      });
    }
  },
  mounted() {
    global.modal = this;
  }
};
</script>

<style lang='scss'>
#Modal {
  .modal {
    display: block;
    transition: all ease-in-out 0.3s;
    text-align: left;    
    &-backdrop{
      z-index: 1050;
    }
    &-dialog{
      transform: none;
    }
  }
  &.modal-enter > .modal-backdrop,
  &.modal-leave-to > .modal-backdrop {
    opacity: 0;
  }
  &.modal-enter > .modal,
  &.modal-leave-to > .modal {
    transform: translate(0, -100px);
    opacity: 0;
  }
  #TimelinePage>p.pretitle{
    margin-top: 0px;
  }
}
</style>