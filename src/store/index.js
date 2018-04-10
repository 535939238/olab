import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const User = {
    state: {
        user: false,
        imgpath: "",
        sup: []
    },
    mutations: {
        Login(state, user) {
            state.user = user.username;
            state.imgpath = user.imgpath;
            state.sup = user.sup;
            console.log('login with user : ' + state.user);
        },
        Logout(state) {
            state.user = false;
            state.sup = [];
            console.log('logout success.');
        }
    }
}

const Body = {
    state: {
        holding: 0
    },
    mutations: {
        ChangeHolding(state, inc) {
            if (inc === true) {
                state.holding++;
                document.body.classList.add('modal-open');
            } else {
                state.holding--;                
                if(state.holding<=0){
                    state.holding=0;
                    document.body.classList.remove('modal-open');
                }
            }
        }
    }
}

export default new Vuex.Store({
    state: {
        appid: "wxdea6a42866410230"
    },
    modules: {
        User,
        Body
    }
})