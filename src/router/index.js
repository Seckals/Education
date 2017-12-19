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
import list from '../components/teacher/list/list'
import info from '../components/teacher/list/info'
import studentlist from '../components/teacher/list/studentList'
import finish from '../components/teacher/list/finishInfo'
// 学生部分
import student from '../components/student/index'

Vue.use(Router)

export default new Router({
  routes: [
      {
      path: '/lrBox',
      component: lrBox,
      children: [
        {
          path: 'login',
          component: login
        },
        {
          path: 'register',
          component: register,
          children: [
            {
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
        component: teacher,
        children:[
            {
                path: 'list',
                component: list
            },
            {
                path: 'info',
                component: info,
                children: [
                    {
                        path: 'studentlist',
                        component: studentlist
                    },
                    {
                        path: 'finish',
                        component: finish
                    },
                    {
                        path: '/',
                        redirect: 'studentlist'
                    }
                ]
            },
            {
                path:'/',
                redirect: 'list'
            }
        ]
    },
    {
        path: '/student',
        component: student
    },
    {
        path:'/',
        redirect: '/lrBox'
    }
  ]
})
