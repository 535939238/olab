<template>
  <div id='Setting' class="container">
    <p class="pretitle">设置</p>
    <div class="settingblock">
      <ul class="nav nav-pills">
        <li v-for="(item,index) in list" :key="index" :class="ActiveClass(item.url)">
          <router-link :to="item.url">{{item.name}}</router-link>
        </li>
      </ul>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      list: [
        {
          name: "主页设置",
          url: "main"
        },
        {
          name: "页面设置",
          url: "page"
        },
        {
          name: "图片设置",
          url: "image"
        },
        {
          name: "菜单设置",
          url: "menu"
        },
        {
          name: "Footer设置",
          url: "footer"
        },
        {
          name: "php",
          url: "php"
        }
      ]
    };
  },  
  methods: {
    ActiveClass(url){
      // debugger;
      return {
        active: this.$route.path.search(new RegExp(`\/${url}$`))!=-1
      }
    }
  }  
};
</script>

<style lang='scss'>
#Setting {
  .settingblock {
    background: rgba(255, 255, 255, 0.87);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.47);
    padding: 30px;
    h3 {
      margin-left: 15px;
    }
  }
  .altbtn {
    width: 30px;
    height: 30px;
    &-info {
      color: #5bc0de;
    }
    &-success {
      color: #5cb85c;
    }
    &-warning {
      color: #f0ad4e;
    }
    &-danger {
      color: #d9534f;
    }
    &-default {
      color: #959595;
    }
    &-white{
      color: white;
    }
  }
  .input-group {
    .altbtn {
      width: 20px;
      height: 20px;
    }
  }
}
</style>