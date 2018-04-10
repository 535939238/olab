<template>
    <div id='Close' class="container">
        <p class="pretitle">登陆成功!页面即将关闭</p>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    axios.get("/static/js/jweixin-1.3.2.js").then(res => {
      new Function(res.data).call(window);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.$store.state.appid, // 必填，公众号的唯一标识
        timestamp: this.$route.params.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.$route.params.nonceStr, // 必填，生成签名的随机串
        signature: this.$route.params.signature, // 必填，签名，见附录1
        jsApiList: ["closeWindow"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function() {
        wx.closeWindow();
      });
    });
  }
};
</script>

<style lang='scss'>
#Close {
}
</style>