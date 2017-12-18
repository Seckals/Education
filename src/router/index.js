import Vue from 'vue'
import Router from 'vue-router'
// 登陆，注册
import lrBox from '../components/login/lrBox'
import login from '../components/login/login'
import register from '../components/login/register'
import verificPhone from '../components/login/register/verificPhone'
import registerStudent from '../components/login/register/registerStudent'
import registerClass from '../components/login/register/registerClass'
import registerTeacher from '../components/login/register/registerTeacher'
// 教师部分
import teacher from '../components/teacher/index'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/lrBox',
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
    },
    {
        path: '/teacher',
        component: teacher
    },
    {
        path:'/',
        redirect: '/lrBox'
    }
  ]
})
