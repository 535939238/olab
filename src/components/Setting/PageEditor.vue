<template>
  <div id='PageEditor' class="slidepanel">
    <button class="close" @click="$emit('goback')">&times;</button>
    <p class="pretitle">{{name}}</p>
    <div class="imgcontainer">
      <a :href="ownerdat.image" target="#" :style="'background-image:url('+ownerdat.image+')'"></a>
    </div>
    <span class="label label-default">链接后缀</span>
    <input type="text" class="form-control" v-model="ownerdat.id">
    <span class="label label-default">标题</span>
    <input type="text" class="form-control" v-model="ownerdat.title">
    <span class="label label-default">作者</span>
    <input type="text" class="form-control" v-model="ownerdat.author">
    <span class="label label-default">标题图片</span>
    <div class="input-group">
      <input type="text" class="form-control" v-model="ownerdat.image">
      <span class="input-group-addon" @click="BindImage">
        <div class="altbtn altbtn-info">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path d="M964.940394 344.606549 822.362118 487.339344c-53.011354 53.063543-128.142495 70.249971-195.641819 51.869345l119.004371-118.846782c1.766226-1.531889 3.687996-2.700505 5.349845-4.362354l142.577253-142.732795c39.356356-39.434128 39.356356-103.32425 0-142.759401-39.35738-39.408545-103.196337-39.408545-142.577253 0L608.497263 273.266757c0 0 0 0 0 0.025583l-0.105401-0.103354L485.078349 396.320351c-17.757432-67.186192-0.491187-141.746328 52.129264-194.446597l142.577253-142.732795c78.763878-78.818113 206.414163-78.818113 285.154505 0C1043.679713 137.958048 1043.679713 265.789459 964.940394 344.606549zM378.586966 719.325929l-0.155543-0.154519c-9.29469 9.397021-22.196535 15.264659-36.474726 15.264659-28.297486 0-51.221592-22.897499-51.221592-51.14382 0-14.798031 6.385431-28.037567 16.45988-37.383422l338.867848-338.426803c9.371438-10.020214 22.611997-16.406668 37.434587-16.406668 28.29851 0 51.222615 22.897499 51.222615 51.14382 0 13.967106-5.658883 26.635637-14.746866 35.878139l0.155543 0.156566L378.586966 719.325929zM272.926508 608.005564 130.349255 750.740406c-39.356356 39.406498-39.356356 103.325273 0 142.729725 39.355333 39.409568 103.19429 39.409568 142.577253 0l142.576229-142.729725c0.98749-1.039679 1.661849-2.208295 2.648316-3.245927l120.615055-120.485095c18.016329 67.3929 0.802272 142.215002-51.974745 195.09435l-142.577253 142.734842c-78.765925 78.844719-206.41621 78.844719-285.154505 0-78.739319-78.840626-78.739319-206.622918 0-285.491173l142.577253-142.732795c52.856835-52.908 127.674844-70.120011 195.017602-52.000328L273.937534 607.176686C273.60189 607.486748 273.237593 607.694479 272.926508 608.005564z"></path>
          </svg>
        </div>
      </span>
    </div>
    <span class="label label-default">概述</span>
    <input type="text" class="form-control" v-model="ownerdat.contains">
    <div ref="editor">
    </div>
    <div class="alert alert-info">页面链接:
      <a class="alert-link" target="#" :href="staticLocate">{{staticLocate}}</a>
    </div>
    <div class="flexdep">
      <div>
        <div class="btn btn-primary btn-block" @click="EditInXiuMi">秀米编辑</div>
      </div>
      <div>
        <div class="btn btn-info btn-block" @click="Save">保存</div>
      </div>
      <div>
        <div class="btn btn-warning btn-block" @click="Delete">删除</div>
      </div>
    </div>
    <transition name="fadeUp">
      <div class="XFrame" v-if="XShow==true">
        <button class="close" @click="XShow=false">&times;</button>
        <!-- <iframe ref="xframe" src="http://xiumi.us/#/studio/papers"></iframe> -->
        <iframe ref="xframe" src="http://xiumi.us/studio/v5#/paper"></iframe>
      </div>
    </transition>
  </div>
</template>

<script>
import E from "wangEditor";
import ImageSelect from "./ImageSelect";
export default {
  name: "",
  props: ["name"],
  data() {
    return {
      ownerdat: {
        image: "/static/images/default.png"
      },
      editor: null,
      XShow: false
    };
  },
  methods: {
    GoBack() {
      this.$emit("goback");
    },
    Save() {
      if (!this.ownerdat.id || this.ownerdat.id == "") {
        modal.Show({
          contains: "请输入链接后缀!"
        });
        return;
      }
      this.ownerdat.html = this.editor.txt.html();
      axios
        .post(`/setting/alterpage/page/${this.name}`, this.ownerdat)
        .then(res => {
          var callback = res.data.state ? this.GoBack : undefined;
          if (res.data.state == true) {
            this.$emit("rename", this.ownerdat.id);
          }
          modal.Show({
            title: "结果",
            contains: res.data.mes,
            cancelled: callback
          });
        });
    },
    Delete() {
      if (this.name == "new.page") {
        this.GoBack();
        return;
      }
      axios.get(`/setting/deletepage/page/${this.name}`).then(res => {
        modal.Common(res);
        if (res.data.state == true) {
          this.GoBack();
          this.$emit("rename");
        }
      });
    },
    BindImage() {
      modal.Show({
        title: "选择图片",
        large: true,
        SubComp: ImageSelect,
        SubCompEvent: res => {
          this.ownerdat.image = `/static/uploads/${res}`;
          modal.show = false;
        }
      });
    },
    EditInXiuMi() {
      this.XShow = true;
    },
    XiuMiListener(event) {
      if (event.origin == "http://xiumi.us") {
        this.editor.txt.html(event.data);
        this.XShow = false;
      }
    }
  },
  computed: {
    staticLocate() {
      return window.location.origin + "/#/page/" + this.ownerdat.id;
    }
  },
  watch: {
    XShow(val) {
      if (val == true) {
        this.$nextTick(function() {
          var xiumi = this.$refs.xframe;
          var xiumi_url = "http://xiumi.us";
          xiumi.onload = function() {
            xiumi.contentWindow.postMessage("ready", xiumi_url);
          };
          window.addEventListener("message", this.XiuMiListener, false);
        });
      } else {
        window.removeEventListener("message", this.XiuMiListener);
      }
    }
  },
  mounted() {
    if (!E.changed)
      !(function() {
        var create = E.prototype.create;
        E.changed = true;
        E.prototype.create = function() {
          create.call(this);
          var btn = document.createElement("div");
          var toolbar = this.$toolbarElem[0];
          toolbar.appendChild(btn);
          btn.outerHTML = `<div class="w-e-menu" style="z-index:51"><i class="w-e-icon-cphtml">copy</i></div>`;
          toolbar.children[toolbar.children.length - 1].addEventListener(
            "click",
            function() {
              if (window.setClipBoard(this.txt.html()))
                modal.Show({
                  contains: `复制html到剪贴板成功!`
                });
            }.bind(this)
          );
          btn = document.createElement("div");
          toolbar.appendChild(btn);
          btn.outerHTML = `<div class="w-e-menu" style="z-index:51"><i class="w-e-icon-cphtml">html</i></div>`;
          var editor = this;
          toolbar.children[toolbar.children.length - 1].addEventListener(
            "click",
            function() {
              modal.Show({
                title: "编辑html",
                SubComp: {
                  template: `<textarea class="form-control" style="height:${window
                    .document.documentElement.clientHeight -
                    250}px" v-model="html"></textarea>`,
                  data() {
                    return {
                      html: editor.txt.html()
                    };
                  }
                },
                certain: "确定",
                certained() {
                  editor.txt.html(modal.$refs.subcomp.html);
                }
              });
            }
          );
        };
      })();

    this.$store.commit("ChangeHolding", true);

    var CreateEditor = () => {
      this.editor = new E(this.$refs.editor);
      this.editor.customConfig.zIndex = 50;
      this.editor.customConfig.pasteFilterStyle = false;
      this.editor.create();
    };

    if (this.name == "new.page") {
      CreateEditor();
      return;
    }
    axios.get(`/setting/getpage/id/${this.name}`).then(res => {
      this.ownerdat = res.data;
      CreateEditor();
      this.editor.txt.html(res.data.html);
    });
  },
  beforeDestroy() {
    this.$store.commit("ChangeHolding", false);
  }
};
</script>

<style lang='scss'>
#PageEditor {
  .w-e-toolbar {
    flex-wrap: wrap;
    .w-e-menu {
      z-index: inherit !important;
      .w-e-droplist {
        z-index: 52;
      }
    }
  }
  .XFrame {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.8);
    iframe {
      border: 0;
      width: 100%;
      height: 100%;
    }
    .close {
      position: fixed;
      right: 80px;
      top: 10px;
    }
  }
}
</style>