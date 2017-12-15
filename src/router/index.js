import Vue from 'vue'
import Router from 'vue-router'
import lrBox from '../components/login/lrBox'
import login from '../components/login/login'
import register from '../components/login/register'
import verificPhone from '../components/login/verificPhone'
import registerStudent from '../components/login/registerStudent'
import registerClass from '../components/login/registerClass'
import registerTeacher from '../components/login/registerTeacher'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'lrBox',
      component: lrBox,
      children: [{
          path: 'login',
          component: login
        },
        {
          path: 'register',
          component: register,
          children: [{
              path: "verify",
              component: verificPhone
            },
            {
              path: 'registerTeacher',
              component: registerTeacher
            },
            {
              path:'registerStudent',
              component:registerStudent
            },
            {
              path: 'registerClass',
              component:registerClass
            },
            {
              path: '/',
              redirect: 'verify'
            }
          ]
        },
        {
          path: '/',
          redirect: 'login'
        }
      ]
    }
  ]
})
