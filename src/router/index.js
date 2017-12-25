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
import list from '../components/teacher/list/list'  // 作业列表
import info from '../components/teacher/list/info'
import studentlist from '../components/teacher/list/info/studentList'
import finish from '../components/teacher/list/info/finishInfo'
import box from '../components/teacher/publish/publishBox'   // 添加作业
import publish from '../components/teacher/publish/index'
import importlibrary from '../components/teacher/library/index'   // 导入题库
import library from '../components/teacher/library/library'
import libraryChoose from '../components/teacher/library/show/choose'
import libraryFill from '../components/teacher/library/show/fill'

// 学生部分
import student from '../components/student/index'

Vue.use(Router)

export default new Router({
  routes: [
      // ************************************登录注册部分****************************************
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
    // *****************************************教师部分*********************************************
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
                path: 'box',
                component: box,
                children: [
                    {
                        path: 'publish',
                        component: publish
                    },
                    {
                        path: 'library',
                        component: library,
                        children: [
                            {
                                path:'choose',
                                name:'choose',
                                component: libraryChoose
                            },
                            {
                                path: 'fill',
                                name: 'fill',
                                component: libraryFill
                            },
                            {
                                path: '/',
                                redirect: 'choose'
                            }
                        ]
                    },
                    {
                        path: '/',
                        redirect: 'publish'
                    }
                ]
            },
            {
                path: 'import',
                component: importlibrary
            },
            {
                path:'/',
                redirect: 'list'
            }
        ]
    },
    // *****************************************学生部分*********************************************
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
