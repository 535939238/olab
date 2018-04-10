import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/(ht|f)tp(s)?\://*',
      beforeEnter: (to, from, next) => {
        window.location = to.fullPath.substr(1)
      }
    },    
    {
      path: '*',
      redirect: { path: '/err404' }
    },
    {
      path: '/err404',
      component: resolve => require(['@/components/Common/404'], resolve)
    },
    {
      path: '/vue',
      name: 'HelloWorld',
      component: resolve => require(['@/components/Others/HelloWorld'], resolve)
    },
    {
      path: '/',
      name: 'MainPage',
      component: resolve => require(['@/components/MainPage/MainPage'], resolve)
    },
    {
      path: '/queryclass',
      component: resolve => require(['@/components/QueryClass/QueryClass'], resolve)
    },
    {
      path: '/querylist',
      component: resolve => require(['@/components/QueryClass/QueryList'], resolve)
    },
    {
      path: '/applyshow',
      component: resolve => require(['@/components/Uselab/ApplyShow'], resolve)
    },
    {
      path: '/uselab',
      component: resolve => require(['@/components/Uselab/Uselab'], resolve)
    },
    {
      path: '/timeline',
      component: resolve => require(['@/components/Timeline/Timeline'], resolve)
    },
    {
      path: '/aboutus',
      component: resolve => require(['@/components/Others/Aboutus'], resolve)
    },
    {
      path: '/page/:id',
      component: resolve => require(['@/components/Others/Page'], resolve)
    },
    {
      path: '/pvtable/:table',
      component: resolve => require(['@/components/Others/PvTable'], resolve)
    },
    {
      path: '/close/:timestamp/:nonceStr/:signature',
      component: resolve => require(['@/components/Others/close'], resolve)
    },
    {
      path: '/active/*',
      component: resolve => require(['@/components/Others/Active'], resolve)
    },
    {
      path: '/agreement',
      component: resolve => require(['@/components/Others/Agreement'], resolve)
    },    
    {
      path: '/setting',
      redirect: '/setting/main'
    },
    {
      path: '/setting/',
      component: resolve => require(['@/components/Setting/Setting'], resolve),
      children: [
        {
          path: 'main',
          component: resolve => require(['@/components/Setting/Main'], resolve)
        },
        {
          path: 'page',
          component: resolve => require(['@/components/Setting/Page'], resolve)
        },
        {
          path: 'image',
          component: resolve => require(['@/components/Setting/Image'], resolve)
        },
        {
          path: 'menu',
          component: resolve => require(['@/components/Setting/Menu'], resolve)
        }
      ]
    }
  ]
})

export default router;