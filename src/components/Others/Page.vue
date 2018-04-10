<template>
    <div id='Page' class="container">
        <p class="pretitle">{{info.title}}</p>
        <div v-html="StyleDom"></div>
        <div class="pagebg">
            <div v-html="info.html"></div>
            <div class="row">
                <div class="actic-foot">
                    <h5>作者: {{info.author}}</h5>
                    <h5>
                        <small>时间: </small>
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      info: {
        title: 'Loading'
      },
      StyleDom: ""
    };
  },
  computed:{
      
  },
  mounted() {
    axios.get(`/pagdat/${this.$route.params.id}`).then(res => {
      this.info = res.data;
      this.StyleDom = `<style>#bgdiv {background: url(${this.info.image}) !important;background-size:cover !important}</style>`;
    });
  }
};
</script>

<style lang='scss'>
#Page {
  .pagebg {
    background: rgba(255, 255, 255, 0.87);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.47);
    padding: 30px;
    .actic-foot {
      float: right;
    }
  }
}
</style>