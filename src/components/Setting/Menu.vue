<template>
  <div id='Menu'>
    <div class="navbox" style="margin-top: 10px;">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h4>主菜单</h4>
        </div>
        <draggable class="list-group" v-model="items" :options="{handle:'.altbtn'}">
          <transition-group name="fade">
            <li class="list-group-item" v-for="(item,index) in items" :class="{active:checkedindex==index}" @click="checkedindex=index" :key="item.name" draggable="true">
              <h5>&nbsp;{{item.name}}</h5>
              <div class="altbtn altbtn-default">
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365">
                  <path d="M896 544 128 544C110.32 544 96 529.68 96 512 96 494.32 110.32 480 128 480L896 480C913.68 480 928 494.32 928 512 928 529.68 913.68 544 896 544ZM896 224 128 224C110.32 224 96 209.68 96 192 96 174.32 110.32 160 128 160L896 160C913.68 160 928 174.32 928 192 928 209.68 913.68 224 896 224ZM128 800 896 800C913.68 800 928 814.32 928 832 928 849.68 913.68 864 896 864L128 864C110.32 864 96 849.68 96 832 96 814.32 110.32 800 128 800Z" p-id="1366"></path>
                </svg>
              </div>
            </li>
          </transition-group>
        </draggable>
        <div class="panel-footer">
          <div class="col-xs-6">
            <div class="btn btn-success btn-block" @click="NewItem">新建</div>
          </div>
          <div class="col-xs-6">
            <div class="btn btn-info btn-block" @click="SaveSetting">保存</div>
          </div>
          <div class="row"></div>
        </div>
      </div>

      <transition name="fadeRight">
        <div class="slidepanel" v-if="checkedindex!=-1">
          <button class="close" @click="checkedindex=-1" style="margin-bottom: 20px">&times;</button>
          <div class="row"></div>
          <div class="panel panel-primary">
            <div class="panel-heading">
              <h4>主链接</h4>
            </div>
            <div class="panel-body">
              <span class="label label-primary">名称</span>
              <input type="text" class="form-control" v-model="items[checkedindex].name">
              <span class="label label-primary">链接</span>
              <div class="input-group">
                <input type="text" class="form-control" v-model="items[checkedindex].url" placeholder="外部链接需要加http://或https://">
                <span class="input-group-addon">
                  <div class="altbtn altbtn-info" @click="BindPage">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M964.940394 344.606549 822.362118 487.339344c-53.011354 53.063543-128.142495 70.249971-195.641819 51.869345l119.004371-118.846782c1.766226-1.531889 3.687996-2.700505 5.349845-4.362354l142.577253-142.732795c39.356356-39.434128 39.356356-103.32425 0-142.759401-39.35738-39.408545-103.196337-39.408545-142.577253 0L608.497263 273.266757c0 0 0 0 0 0.025583l-0.105401-0.103354L485.078349 396.320351c-17.757432-67.186192-0.491187-141.746328 52.129264-194.446597l142.577253-142.732795c78.763878-78.818113 206.414163-78.818113 285.154505 0C1043.679713 137.958048 1043.679713 265.789459 964.940394 344.606549zM378.586966 719.325929l-0.155543-0.154519c-9.29469 9.397021-22.196535 15.264659-36.474726 15.264659-28.297486 0-51.221592-22.897499-51.221592-51.14382 0-14.798031 6.385431-28.037567 16.45988-37.383422l338.867848-338.426803c9.371438-10.020214 22.611997-16.406668 37.434587-16.406668 28.29851 0 51.222615 22.897499 51.222615 51.14382 0 13.967106-5.658883 26.635637-14.746866 35.878139l0.155543 0.156566L378.586966 719.325929zM272.926508 608.005564 130.349255 750.740406c-39.356356 39.406498-39.356356 103.325273 0 142.729725 39.355333 39.409568 103.19429 39.409568 142.577253 0l142.576229-142.729725c0.98749-1.039679 1.661849-2.208295 2.648316-3.245927l120.615055-120.485095c18.016329 67.3929 0.802272 142.215002-51.974745 195.09435l-142.577253 142.734842c-78.765925 78.844719-206.41621 78.844719-285.154505 0-78.739319-78.840626-78.739319-206.622918 0-285.491173l142.577253-142.732795c52.856835-52.908 127.674844-70.120011 195.017602-52.000328L273.937534 607.176686C273.60189 607.486748 273.237593 607.694479 272.926508 608.005564z"></path>
                    </svg>
                  </div>
                </span>
              </div>
            </div>
            <div class="panel-heading">
              <h4>子菜单</h4>
              <div class="altbtn altbtn-white" @click="NewItem(true)">
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512 884.736H197.973333c-32.768 0-59.392-26.624-59.392-59.392V197.973333c0-32.768 26.624-59.392 59.392-59.392h628.053334c32.768 0 59.392 26.624 59.392 59.392v314.026667c0 11.605333-8.874667 20.48-20.48 20.48s-20.48-8.874667-20.48-20.48V197.973333c0-9.557333-8.874667-18.432-18.432-18.432H197.973333c-9.557333 0-18.432 8.874667-18.432 18.432v627.370667c0 9.557333 8.874667 18.432 18.432 18.432h314.026667c11.605333 0 20.48 8.874667 20.48 20.48s-8.874667 20.48-20.48 20.48zM864.256 408.917333H159.744c-11.605333 0-20.48-8.874667-20.48-20.48s8.874667-20.48 20.48-20.48h704.512c11.605333 0 20.48 8.874667 20.48 20.48s-8.874667 20.48-20.48 20.48zM864.256 708.608H512c-11.605333 0-20.48-8.874667-20.48-20.48s8.874667-20.48 20.48-20.48h352.256c11.605333 0 20.48 8.874667 20.48 20.48s-8.874667 20.48-20.48 20.48zM688.128 884.736c-11.605333 0-20.48-8.874667-20.48-20.48V512c0-11.605333 8.874667-20.48 20.48-20.48s20.48 8.874667 20.48 20.48v352.256c0 11.605333-8.874667 20.48-20.48 20.48z"></path>
                </svg>
              </div>
            </div>
            <draggable v-model="items[checkedindex].subitems" class="list-group" :options="{handle:'.altbtn'}">
              <li class="list-group-item" v-for="(subitem,index) in items[checkedindex].subitems" :key="index">
                <span class="label label-primary">名称</span>
                <div class="input-group">
                  <input type="text" class="form-control" v-model="subitem.name">
                  <span class="input-group-addon">
                    <div class="altbtn altbtn-default">
                      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365">
                        <path d="M896 544 128 544C110.32 544 96 529.68 96 512 96 494.32 110.32 480 128 480L896 480C913.68 480 928 494.32 928 512 928 529.68 913.68 544 896 544ZM896 224 128 224C110.32 224 96 209.68 96 192 96 174.32 110.32 160 128 160L896 160C913.68 160 928 174.32 928 192 928 209.68 913.68 224 896 224ZM128 800 896 800C913.68 800 928 814.32 928 832 928 849.68 913.68 864 896 864L128 864C110.32 864 96 849.68 96 832 96 814.32 110.32 800 128 800Z" p-id="1366"></path>
                      </svg>
                    </div>
                  </span>
                </div>
                <span class="label label-primary">链接</span>
                <div class="input-group">
                  <input type="text" class="form-control" v-model="subitem.url" placeholder="外部链接需要加http://或https://">
                  <span class="input-group-addon">
                    <div class="altbtn altbtn-info" @click="BindPage(subitem)">
                      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M964.940394 344.606549 822.362118 487.339344c-53.011354 53.063543-128.142495 70.249971-195.641819 51.869345l119.004371-118.846782c1.766226-1.531889 3.687996-2.700505 5.349845-4.362354l142.577253-142.732795c39.356356-39.434128 39.356356-103.32425 0-142.759401-39.35738-39.408545-103.196337-39.408545-142.577253 0L608.497263 273.266757c0 0 0 0 0 0.025583l-0.105401-0.103354L485.078349 396.320351c-17.757432-67.186192-0.491187-141.746328 52.129264-194.446597l142.577253-142.732795c78.763878-78.818113 206.414163-78.818113 285.154505 0C1043.679713 137.958048 1043.679713 265.789459 964.940394 344.606549zM378.586966 719.325929l-0.155543-0.154519c-9.29469 9.397021-22.196535 15.264659-36.474726 15.264659-28.297486 0-51.221592-22.897499-51.221592-51.14382 0-14.798031 6.385431-28.037567 16.45988-37.383422l338.867848-338.426803c9.371438-10.020214 22.611997-16.406668 37.434587-16.406668 28.29851 0 51.222615 22.897499 51.222615 51.14382 0 13.967106-5.658883 26.635637-14.746866 35.878139l0.155543 0.156566L378.586966 719.325929zM272.926508 608.005564 130.349255 750.740406c-39.356356 39.406498-39.356356 103.325273 0 142.729725 39.355333 39.409568 103.19429 39.409568 142.577253 0l142.576229-142.729725c0.98749-1.039679 1.661849-2.208295 2.648316-3.245927l120.615055-120.485095c18.016329 67.3929 0.802272 142.215002-51.974745 195.09435l-142.577253 142.734842c-78.765925 78.844719-206.41621 78.844719-285.154505 0-78.739319-78.840626-78.739319-206.622918 0-285.491173l142.577253-142.732795c52.856835-52.908 127.674844-70.120011 195.017602-52.000328L273.937534 607.176686C273.60189 607.486748 273.237593 607.694479 272.926508 608.005564z"></path>
                      </svg>
                    </div>
                  </span>
                  <span class="input-group-addon">
                    <div class="altbtn altbtn-danger" @click="items[checkedindex].subitems.splice(index,1)">
                      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M823.04 840.32 524.16 540.16l296.32-294.4c12.8-12.8 12.8-33.28 0-45.44-12.8-12.8-33.28-12.8-46.08 0L478.08 494.08 184.96 200.32c-12.8-12.8-33.28-12.8-45.44 0s-12.8 33.28 0 45.44l292.48 293.76-302.72 300.8c-12.8 12.8-12.8 33.28 0 45.44 12.8 12.8 33.28 12.8 46.08 0l302.72-300.16 299.52 300.16c12.8 12.8 33.28 12.8 45.44 0C835.2 873.6 835.2 853.12 823.04 840.32z"></path>
                      </svg>
                    </div>
                  </span>
                </div>
              </li>
            </draggable>
          </div>
          <div class="btn btn-danger btn-block btn-lg" @click="DeleteMain">删除</div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import PageSelect from "./PageSelect";
import draggable from "vuedraggable";
export default {
  name: "",
  components: {
    draggable
  },
  data() {
    return {
      items: [],
      checkedindex: -1
    };
  },
  methods: {
    BindPage(subitem) {
      return modal.Show({
        title: "选择页面",
        large: true,
        SubComp: PageSelect,
        SubCompEvent: index => {
          this.$set(
            subitem instanceof MouseEvent
              ? this.items[this.checkedindex]
              : subitem,
            "url",
            `/page/${index}`
          );
          modal.show = false;
        }
      });
    },
    NewItem(sub) {
      if (sub == true) {
        if (this.items[this.checkedindex].subitems)
          this.items[this.checkedindex].subitems.push({});
        else this.$set(this.items[this.checkedindex], "subitems", [{}]);
      } else {
        this.items.push({ name: "new" });
      }
    },
    SaveSetting() {
      axios
        .post("/setting/saveconfig/name/navbar", { data: this.items })
        .then(res => {
          //此处有耦合
          if(res.data.state==true)
            this.$root.$children[0].InitAjax();
          modal.Common(res);
        });
    },
    DeleteMain() {
      this.items.splice(this.checkedindex, 1);
      this.checkedindex = -1;
    }
  },
  mounted() {
    axios.get("/setting/getconfig/name/navbar").then(res => {
      this.items = JSON.parse(res.data);
      if (!this.items instanceof Array) this.items = [];
    });
  },
  watch: {
    checkedindex(newval, oldval) {
      if (oldval == -1) this.$store.commit("ChangeHolding", true);
      else if (newval == -1) this.$store.commit("ChangeHolding", false);
    }
  }
};
</script>

<style lang='scss'>
#Menu {
  display: table;
  width: 100%;  
  .panel {
    text-align: left;
    .panel-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .navbox {
    > .panel {
      * {
        transition: none;
      }
      .list-group-item {
        display: flex;
        justify-content: space-between;
        align-content: center;
        .altbtn {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>