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
import publish from '../components/teacher/publish/index'   // 添加作业
import add from '../components/teacher/publish/add/add'
import chooseAdd from '../components/teacher/publish/add/chooseAdd'
import fillAdd from '../components/teacher/publish/add/fillAdd'
import show from '../components/teacher/publish/show/show'
import chooseShow from '../components/teacher/publish/show/chooseShow'
import fillShow from '../components/teacher/publish/show/fillShow'
import importlibrary from '../components/teacher/library/index'   // 导入题库
import library from '../components/teacher/library/library'

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
                path: 'publish',
                component: publish,
                children: [
                    {
                        path: 'add',
                        component: add,
                        children: [
                            {
                                path: 'choose',
                                component: chooseAdd
                            },
                            {
                                path: 'fill',
                                component: fillAdd
                            },
                            {
                                path: '/',
                                redirect: 'choose'
                            }
                        ]
                    },
                    {
                        path: 'show',
                        component: show,
                        children:[
                            {
                                path:'choose',
                                component: chooseShow
                            },
                            {
                                path: 'fill',
                                component: fillShow
                            },
                            {
                                path: '/',
                                redirect: 'choose'
                            }
                        ]
                    },
                    {
                        path: 'library',
                        component: library
                    },
                    {
                        path: '/',
                        redirect: 'add'
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
