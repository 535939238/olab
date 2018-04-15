//定义一些全局函数

export var Mrs = {};
Mrs.install = function (Vue, options) {
    Vue.prototype.$common = {
        setClipBoard(ele) {
            if (ele instanceof HTMLElement)
                ele = ele.innerHTML;
            var inp = document.createElement('input');
            inp.style.position = "absolute";
            inp.style.left = "-100%";
            inp.value = ele;
            document.body.appendChild(inp);
            inp.select();
            try {
                document.execCommand("copy");
                inp.remove();
                return true;
            } catch (error) {
                modal.Show({
                    contains: `您的浏览器不支持复制操作！请换个浏览器(推荐: 360 uc)`
                });
                inp.remove();
                return false;
            }
        },
        trigEvent(name,ele){
            if(ele===undefined)
                ele = window;
            var e = document.createEvent("HTMLEvents");
            e.initEvent("resize", true, true);
            ele.dispatchEvent(e);
        }
    }
}