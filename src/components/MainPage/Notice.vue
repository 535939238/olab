<template>
  <div id='Notice' class="wow fadeInUp">
    <p class="subtitle subtitle-lg visible-xs">
      公告通知
    </p>
    <p class="subtitle subtitle-sm visible-xs">
      GONG GAO TONG ZHI
    </p>
    <div class="activ-nav">
      <a class="rma activ-panel wow fadeInUp" :data-wow-delay="index*100+'ms'" target="#" v-for="(item,index) in items" :key="index" @click="$emit('select',item,index)">
        <div class="activ-panel-img" :style="{'background-image':'url('+item.image+')'}"></div>
        <div class="activ-panel-contains">
          <h5 class="title">{{item.title}}</h5>
          <h5 class="contains">{{item.contains}}</h5>
        </div>
      </a>
    </div>
    <!-- <a href="/more/notice" class="rma morebtn visible-xs">更多
      <span>&gt;</span>
    </a> -->
    <div class="row"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props:{
    items:{
      default(){
        return []
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss'>
#Notice {  
  @media (max-width: 767px) {
    background: #e9e9e9;
    padding-bottom: 50px;
  }
  .activ-nav {
    background: white;
    width: 100%;
    height: 158px;
    transform: translate(0, -30%);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);    
    margin-bottom: 40px;
    @media (max-width: 767px) {
      transform: translate(0, 0%);
      box-shadow: none;
      background: transparent;
    }
    .activ-panel { 
      @media (min-width: 768px){
        width: 33.33%;
      }
      float: left;      
      height: 100%;      
      background: transparent;
      border-right: 1px solid #dfdfdf;
      position: relative;
      &:last-child {
        border-right: 0;
      }
      &-img {
        position: absolute;
        left: 25%;
        top: 10%;
        height: 50%;
        width: 50%;
        background-image: url(/static/images/bg2.jpg);
        background-size: cover;
      }
      &-contains {
        position: absolute;
        transform: translate(-50%, 0);
        left: 50%;
        top: 60%;
        width: 100%;
        height: 40%;
        padding: 5px;
        text-align: center;
        .title {
          font-size: 17px;
          margin-bottom: 5px;
        }
        .contains {
          margin: 0;
        }
      }
      @media (min-width: 768px) {
        &:hover {
          background: #e5e5e5;
          .activ-panel {
            &-img {
              width: 90%;
              height: 90%;
              left: 5%;
              top: 5%;
            }
            &-contains {
              top: 15%;
              width: 70%;
              height: 70%;
              background: rgba(255, 255, 255, 0.7);
              padding-top: 15px;
              > .title {
                font-size: 21px;
              }
              > .contains {
                font-size: 15px;
              }
            }
          }
        }
      }
      @media (max-width: 767px) {
        width: 100%;
        border-right: 0;
        background: #f3f3f3;
        height: 200px;
        margin-bottom: 5px;
        > .activ-panel {
          &-img {
            left: 5%;
            width: 40%;
            height: 60%;
            top: 20%;
          }
          &-contains {
            transform: translate(-50%, -50%);
            left: 73%;
            top: 50%;
            width: 52%;
            height: auto;
            text-align: left;
            > .title {
              font-size: 27px;
            }
            > .contains {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>