<template>
  <div id="Contus">
    <div class="wow fadeInUp">
      <p class="subtitle subtitle-lg wow fadeInUp" data-wow-delay=".3s">
        关于我们
      </p>
      <p class="subtitle subtitle-sm wow fadeInUp" data-wow-delay=".4s">
        About Us
      </p>
      <div class="wow slideInLeft" data-wow-duration="2s">
        <textarea v-if="editable" cols="30" rows="10" v-model.lazy="SetAbout"></textarea>
        <div v-else v-html="about"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    editable: {
      default: false
    },
    about: {
      default: "关于我们"
    }
  },
  data() {
    return {};
  },
  computed: {
    SetAbout: {
      get() {
        return this.about;
      },
      set(val) {
        this.$emit("about", val);
      }
    }
  },
  methods: {}
};
</script>

<style lang='scss'>
#Contus {
  background: #ebebeb;
  background-image: url(/static/images/bg2.jpg);
  background-size: auto 100%;
  background-repeat: no-repeat;
  position: relative;
  height: 500px;
  > div {
    position: absolute;
    left: 40%;
    top: 11%;
    height: 80%;
    right: 10%;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    padding: 50px 72px 47px 72px;
    &:hover {
      top: 9%;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }
    > div {
      padding-top: 10px;
      text-align: left;
      textarea {
        width: 100%;
      }
      h5 {
        font-size: 15.5px;
      }
    }
  }
  @media (max-width: 767px) {
    background-size: 767px auto;
    > div {
      left: 10%;
      padding-top: 20px;
    }
  }
  textarea {
    border: 1px solid #d6d6d6;
    resize: none;
    &:focus {
      outline: none;
    }
  }
}
</style>