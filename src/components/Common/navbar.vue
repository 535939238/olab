<template>
  <nav id="navbar" class="navbar navbar-default navbar-fixed-top navbar-olab">
    <div class="container" :class="{menushow:show}">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" @click="show=!show">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand"><img src="@/assets/olab.png" style="height: 30px; margin-top: -4px;"></a>
      </div>
      <transition name="fade">
        <div v-if="show" class="collapse-bg" @click="show=false"></div>
      </transition>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li v-for="(item,index) in items" :key="index" class="dropdown">
            <router-link :to="item.url ? item.url : ''" onclick="this.parentElement.classList.toggle('op')">{{item.name}}
              <span v-if="item.subitems && item.subitems.length" class="caret"></span>
            </router-link>
            <ul v-if="item.subitems && item.subitems.length" class="lab-menu">
              <li v-for="(sub,index) in item.subitems" :key="index">
                <router-link :to="sub.url">{{sub.name}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li @click="ShowLogin">
            <a>{{$store.state.User.user ? $store.state.User.user : '登录'}}</a>
          </li>
          <li class="dropdown" v-if="$store.state.User.sup.length">
            <a class="dropdown-toggle" onclick="this.parentElement.classList.toggle('op')">super
              <span class="caret"></span>
            </a>
            <ul class="lab-menu">
              <li v-for="(item,index) in $store.state.User.sup" :key="index">
                <router-link :to="item.url">{{item.name}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      sup: [
        { name: "O-Lab申请表审核", url: "/applyshow" },
        { name: "设置", url: "/setting" },
        { name: "课表", url: "/queryclass" },
        { name: "教室课表", url: "/querylist" }
      ],
      show: false
    };
  },
  watch:{
    show(val){
      if(val===true)
        document.body.classList.add("modal-open-by-nav");
      else document.body.classList.remove("modal-open-by-nav");
    }
  },
  methods: {
    ShowLogin() {
      modal.ShowLogin();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#navbar {
  background-color: rgba(248, 248, 248, 0.9);
  border: 0;
  top: 0;
  min-height: 50.1px;
  li {
    text-align: left;
    &:hover {
      background: #e7e7e7;
    }
    &.dropdown {
      > .lab-menu {
        position: absolute;
        min-width: 190px;
        background: rgba(255, 255, 255, 0.93);
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
        padding: 7px 0;
        transform-origin: 0% 0% 0;
        transform: scale(0);
        > li {
          list-style-type: none;
        }
        a {
          color: black;
          padding: 4px 20px;
          display: block;
          &:hover {
            color: #262626;
            text-decoration: none;
            background-color: #dbdbdb;
          }
          &:focus {
            text-decoration: none;
          }
        }
      }
      &:hover > .lab-menu {
        transform: scale(1);
      }
      @media (max-width: 767px) {
        > .lab-menu {
          position: inherit;
          background: transparent;
          box-shadow: none;
          height: 0;
          display: none;
        }
        &.op > .lab-menu {
          display: inherit;
          height: auto;
          transform: scale(1);
        }
      }
    }
  }

  .navbar-right .lab-menu {
    right: 0;
    transform-origin: 100% 0 !important;
  }
  .navbar-toggle {
    border: 0;
  }
  @media (max-width: 767px) {
    * {
      transition: all cubic-bezier(0.24, 0.5, 0.38, 0.96) 0.6s;
    }
    .navbar-collapse {
      display: block;
      position: fixed;
      top: 0;
      bottom: 0;
      width: 240px;
      background: rgba(255, 255, 255, 0.9);
      padding-top: 60px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.24);
      transform: translate(-100%, 0%);
      max-height: inherit;
    }
    .collapse-bg {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, .3);            
    }
    .menushow {
      .navbar-collapse {
        transform: translate(0%, 0%);
      }
      .collapse-bg {
        display: inherit;
        opacity: 1;
      }
      .navbar-toggle {
        transform: rotate(360deg);
        background-color: #ddd;
        .icon-bar {
          &:nth-child(1) {
            transform: rotate(225deg) translate(0px, -15px);
            width: 12px;
            margin-left: 10px;
          }
          &:nth-child(3) {
            transform: rotate(135deg) translate(0px, 15px);
            width: 12px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>