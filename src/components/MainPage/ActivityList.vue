<template>
    <transition-group id='ActivityList' class="flexdep" tag="div" name="fadeUp">
        <a target="#" class="activity-panel rma" v-for="(item,index) in items" :key="index" @click="$emit('select',item,index)" :style="{'animation-delay':index*100+'ms'}">
            <div class="activity-ctn">
                <div class="activity-img" :style="{'background-image':'url('+item.image+')'}"></div>
                <div class="activity-mask"></div>
                <div class="activity-ico">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M968.826774 320.553846c-25.065587-59.258623-60.940665-112.471674-106.6319-158.162909S763.290587 80.823606 704.031965 55.758019C642.664422 29.801998 577.495729 16.640094 510.33324 16.640094c-67.162489 0-132.33322 13.160885-193.699744 39.117924-59.258623 25.065587-112.471674 60.941684-158.163928 106.632919-45.691235 45.691235-81.567331 98.904286-106.6319 158.162909-25.957039 61.367543-39.117924 126.537255-39.117924 193.699744s13.160885 132.33322 39.117924 193.699744c25.065587 59.258623 60.940665 112.471674 106.6319 158.162909 45.691235 45.691235 98.905305 81.567331 158.163928 106.6319 61.366524 25.958058 126.537255 39.117924 193.699744 39.117924 67.162489 0 132.332201-13.160885 193.698725-39.117924 59.258623-25.065587 112.471674-60.940665 158.162909-106.6319s81.567331-98.904286 106.6319-158.162909c25.958058-61.366524 39.117924-126.537255 39.117924-193.699744S994.784832 381.921389 968.826774 320.553846zM180.947398 546.091155c-17.583505 0-31.837565-14.253041-31.837565-31.837565 0-17.582486 14.25406-31.837565 31.837565-31.837565l498.703614 0c17.583505 0 31.837565 14.255079 31.837565 31.837565 0 17.584524-14.25406 31.837565-31.837565 31.837565L180.947398 546.091155zM896.093475 533.502837 563.45358 829.989521c-13.077343 11.754938-33.207854 10.683159-44.961773-2.394185-11.754938-13.077343-10.68214-33.206835 2.395204-44.960754L827.774646 509.102527 524.057523 237.05996c-13.077343-11.754938-14.150142-31.883411-2.395204-44.960754 11.75392-13.076325 31.88443-14.149123 44.961773-2.394185l329.470402 295.112321c7.16931 6.443923 10.720854 15.405306 10.538489 24.343257C906.815348 518.09753 903.263804 527.057895 896.093475 533.502837z" p-id="2254"></path>
                    </svg>
                </div>
            </div>
            <div class="activity-label">{{item.title}}</div>
        </a>
    </transition-group>
</template>

<script>
export default {
  name: "",
  props: {
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
#ActivityList {
  > .activity-panel {
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