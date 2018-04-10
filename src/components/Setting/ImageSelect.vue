<template>
  <div id='ImageSelect'>
    <transition-group class="flexdep" name="fadeUp">
      <a v-for="(item,index) in items" class="activity-panel rma" @click="$emit('select',item.name)" :key="index" :style="{'animation-delay':index*100+'ms'}">
        <div class="activity-ctn">
          <div class="activity-img" :style="'background-image:url(/static/uploads/'+item.name+');'" style="background-size:contain;background-repeat:no-repeat;"></div>
        </div>
        <div class="activity-label">{{item.name}}</div>
        <div class="activity-author">{{item.time}}</div>
        <div class="activity-author">{{item.size}}</div>
      </a>
    </transition-group>
    <Pagination @page="pageat=arguments[0]" @div="div=arguments[0]" :pagenum="pagenum" />    
  </div>
</template>

<script>
import BaseSelect from "./BaseSelect";
export default {
  name: "",
  mixins: [BaseSelect],
  data() {
    return {
      type: "image"
    };
  },
  methods: {}
};
</script>

<style lang='scss'>
#ImageSelect {
  .activity-panel {
    margin-top: 10px;
    margin-bottom: 10px;
    color: black;
    > .activity {
      &-ctn {
        height: 176px;
        width: 100%;
        overflow: hidden;
        position: relative;
        > .activity {
          &-img {
            background-size: cover;
            height: 100%;
            background-position: center;
          }
          &-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
          }
          &-ico {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            width: 0%;
            > svg {
              fill: currentColor;
              color: white;
              transform: rotate(-180deg);
            }
          }
        }
      }
      &-label {
        margin-top: 10px;
        margin-left: 10px;
        font-size: 20px;
        text-align: left;
      }
    }
    &:hover {
      .activity {
        &-img {
          transform: scale(1.1);
        }
        &-mask {
          background: rgba(255, 255, 255, 0.2);
        }
        &-label {
          margin-left: 20px;
        }
        &-ico {
          width: 19%;
          > svg {
            transform: rotate(0deg);
          }
        }
      }
    }
  }
}
</style>