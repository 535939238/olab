<template>
  <div id="app">    
    <div id="bgdiv">
      <div></div>
      <div></div>
    </div>
    <modal/>
    <transition name="fadeDown" appear>
      <navbar ref="navbar" />
    </transition>
    <transition name="fade" mode="out-in" @before-leave="footershow=false" @before-enter="footershow=true">
      <router-view style="margin-top: 52px;" />
    </transition>
    <transition name="fade">
      <Footer v-if="footershow" />
    </transition>
  </div>
</template>

<script>
import store from "@/store";
import modal from "@/components/Common/modal";
import navbar from "@/components/Common/navbar";
import Footer from "@/components/Common/footer";
export default {
  store,
  data() {
    return {
      footershow: false
    };
  },
  name: "App",
  components: {
    navbar,
    modal,
    Footer
  },
  methods: {
    InitAjax() {
      axios.get("/index/pageinit").then(res => {
        this.$refs.navbar.items = JSON.parse(res.data.navbar);
        if (res.data.user.state == true) {
          this.$store.commit("Login", res.data.user);
        }
      });
    }
  },
  mounted() {
    new WOW().init();
    this.InitAjax();    
  }
};
</script>

<style lang="scss">
#app {
  font-family: 微软雅黑, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
  #bgdiv {
    height: 300px;
    background: url(/static/images/bg2.jpg);
    position: absolute;
    width: 100%;
    z-index: -1;
    top: 0;
    background-size: cover;
    > div:nth-child(1) {
      width: 100%;
      height: 25%;
    }
    > div:nth-child(2) {
      width: 100%;
      height: 75%;
      background: linear-gradient(transparent, white);
    }
  }

  p.pretitle {
    color: #f87b0d;
    text-align: center;
    font-size: 40px;
    margin-left: 50px;
    margin-right: 50px;
    background: rgba(235, 235, 235, 0.8);
    margin-top: 50px;
    @media (max-width: 767px) {
      font-size: 30px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .rma {
    text-decoration: none;
    color: inherit;
    &:hover,
    &:focus {
      text-decoration: none;
      color: inherit;
    }
  }

  .msinput {
    background: transparent;
    border: none;
    border-bottom: 1px solid black;
    color: #7f7f7f;
    &:focus {
      outline: none !important;
    }
    &-group * {
      display: inline-block;
      margin-right: 10px;
    }
  }
  textarea.msinput {
    border: 1px solid gray;
  }

  .msbtn {
    text-align: center;
    padding: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.38);
    display: inline-block;
    font-size: 15px;
    transition: all 0.2s;
    border-radius: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:disabled {
      border: 0;
      box-shadow: none;
      color: #e8e8e8;
    }
    &:active {
      box-shadow: none;
      transform: translate(3px, 3px);
    }
  }
  button.msbtn {
    border: 0;
  }

  .slidepanel {
    position: fixed;
    width: 60%;
    min-width: 767px;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.66);
    z-index: 1041;
    padding: 35px;
    overflow: auto;
    text-align: left;
    &::-webkit-scrollbar {
      display: none;
    }
    a {
      word-wrap: break-word;
    }
    .imgcontainer {
      height: 400px;
      width: 100%;
      display: block;
      padding: 20px;
      > a {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 5px;
        height: 100%;
        display: block;
      }
    }
    .form-control {
      margin-bottom: 10px;
    }
    .input-group {
      margin-bottom: 10px;
      > .form-control {
        margin-bottom: 0;
      }
    }
    span.label {
      font-weight: normal;
    }
    @media (max-width: 767px) {
      width: 100%;
      min-width: 0;
      padding: 20px;
      .imgcontainer {
        height: 300px;
      }
    }
  }

  .icon {
    vertical-align: middle;
    fill: currentColor;
  }

  %animated {
    animation-fill-mode: both;
    animation-duration: 0.8s;
  }
  %fast {
    animation-duration: 0.4s;
  }

  .fade {
    &-enter-active {
      @extend %animated;
      @extend %fast;
      animation-name: fadeIn;
    }
    &-leave-active {
      @extend %animated;
      @extend %fast;
      animation-name: fadeOut;
    }
  }
  .fadeLeft {
    &-enter-active {
      @extend %animated;
      animation-name: fadeInLeft;
    }
    &-leave-active {
      @extend %animated;
      animation-name: fadeOutLeft;
    }
  }
  .fadeRight {
    &-enter-active {
      @extend %animated;
      animation-name: fadeInRight;
    }
    &-leave-active {
      @extend %animated;
      animation-name: fadeOutRight;
    }
  }
  .fadeUp {
    &-enter-active {
      @extend %animated;
      animation-name: fadeInUp;
    }
    &-leave-active {
      @extend %animated;
      animation-name: fadeOutDown;
    }
  }
  .fadeUp-move,
  .fade-move {
    transition: all 1s !important;
  }
  .wow {
    visibility: hidden;
  }

  .flexdep {
    display: flex;
    flex-wrap: wrap;
    > * {
      flex-basis: 33.33%;
      padding: 2px 13px;
      @media (max-width: 991px) {
        flex-basis: 50%;
      }
      @media (max-width: 677px) {
        flex-basis: 100%;
      }
    }
    > .fixall {
      flex-basis: 100%;
    }
  }
}
@media (max-width: 767px) {
  .modal-open-by-nav {
    overflow: hidden;
  }
}
* {
  transition: all ease-in-out 0.4s;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
