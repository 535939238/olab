<template>
    <footer id="footer">
        <div class="container">
            <ul>
                <li>
                    <a href="http://www.ouc.edu.cn">中国海洋大学</a>
                </li>
                <li>
                    <a href="https://www.oucolab.cn">O-Lab</a>
                </li>
                <li>
                    <a href="#">联系管理员</a>
                </li>
                <li>
                    <a href="/index/bugreport">bug反馈</a>
                </li>
            </ul>
            <p>CopyRight © 2017 O-Lab创享会
                <a href="https://www.oucolab.cn">oucolab.cn</a>
            </p>
            <p>中国海洋大学 大学生活动中心 2006 O-Lab</p>
        </div>
    </footer>
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
#footer {
  position: relative;
  top: 0;
  margin-top: 20px;
  border-top: 1px solid #e5e5e5;
  background: #3e3e3e;
  color: darkgray;
  padding-top: 20px;
  padding-bottom: 30px;
  ul {
    margin-top: 20px;
    text-align: center;
    padding-left: 0;
    > li {
      display: inline-block;
      text-align: center;
      margin: 5px;
    }
  }
  p {
    text-align: center;
  }
  a {
    color: white;
    &:hover {
      color: #c2c2c2;
    }
  }
}
</style>