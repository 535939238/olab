webpackJsonp([14],{DXM5:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={name:"",data:function(){return{data:{}}},methods:{Download:function(){window.open("/actrl/dltable/table/"+this.data.table)}},mounted:function(){var t=this;axios.get("/actrl/pvtableajax/table/"+this.$route.params.table).then(function(a){!1===a.data?modal.Show({contains:"不存在该表格!"+t.$route.params.table}):t.data=a.data})}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container",attrs:{id:"PvTable"}},[e("p",{staticClass:"pretitle"},[t._v(t._s(t.data.cn))]),t._v(" "),e("div",{staticStyle:{"overflow-x":"auto"}},[e("table",{staticClass:"table table-striped table-hover table-condensed"},[e("thead",[e("tr",t._l(t.data.cols,function(a){return e("th",{key:a},[t._v(t._s(a))])}))]),t._v(" "),e("tbody",t._l(t.data.rows,function(a,n){return e("tr",{key:n},t._l(a,function(a){return e("td",{key:a},[t._v(t._s(a))])}))}))])]),t._v(" "),e("div",{staticClass:"btn btn-success col-sm-4 col-sm-offset-4 col-xs-12",on:{click:t.Download}},[t._v("下载")])])},staticRenderFns:[]};var l=e("VU/8")(n,s,!1,function(t){e("VDV/")},null,null);a.default=l.exports},"VDV/":function(t,a){}});
//# sourceMappingURL=14.adc52e75715857bb8306.js.map