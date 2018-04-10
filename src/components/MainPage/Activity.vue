<template>
  <div id='Activity'>
    <div :class="{container:!nocontainer}">
      <p class="subtitle subtitle-lg wow fadeInUp">
        相关活动
      </p>
      <p class="subtitle subtitle-sm wow fadeInUp" data-wow-delay=".4s">
        XIANG GUAN HUO DONG
      </p>      
      <ActivityList :items="items" @select="$emit('select',arguments[0],arguments[1])"/>
      <!-- <a href="/more/activity" class="rma morebtn wow fadeInLeft">更多
        <span>&gt;</span>
      </a> -->
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import ActivityList from './ActivityList'
export default {
  name: "",
  components:{
    ActivityList
  },
  props: {
    nocontainer:{
      default: false,
    },
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
#Activity {
  background: #f2f2f2;
  padding-bottom: 50px;
}
p.subtitle {
  font-size: 30px;
  text-align: center;
  &-sm {
    font-size: 18px;
    color: gray;
  }
  &-lg {
    font-size: 40px;
    margin-top: 25px;
    padding-top: 15px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
    margin-top: 5px;
    margin-bottom: 5px;
    &-sm {
      font-size: 13px;
      margin-bottom: 20px;
    }
    &-lg {
      margin-top: 30px;      
    }
  }
}

.morebtn {
  float: right;
  width: 100px;
  text-align: center;
  border: 1px solid #b8b8b8;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 3px;
  > span {
    margin-left: -13px;
    opacity: 0;
  }
  &:hover {
    background: #d4d4d4;
    > span {
      opacity: 1;
      margin-left: 5px;
    }
  }
}
</style>