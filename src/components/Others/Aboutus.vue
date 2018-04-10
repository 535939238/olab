<template>
    <div id='Aboutus' class="container">
        <p class="pretitle">联系我们</p>
        <div class="panel panel-default col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
            <h3>微信公众号<br>萌萌的欧气君期待您的关注哟~<hr>公众号搜索:oucolab<br>或扫描二维码</h3>
            <img src="@/assets/erweima.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss'>
#Aboutus {
  .panel-default {
    -webkit-box-shadow: 10px 10px 25px #e2e2e2;
    -moz-box-shadow: 10px 10px 25px #e2e2e2;
    box-shadow: 10px 10px 25px #e2e2e2;
    text-align: center;
    img {
      width: 100%;
      max-width: 270px;
    }
  }
}
</style>