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
import listBox from '../components/teacher/list/listBox'  // 作业列表
import list from '../components/teacher/list/list'
import info from '../components/teacher/list/info'
import studentlist from '../components/teacher/list/info/studentList'
import finish from '../components/teacher/list/info/finishInfo'
import box from '../components/teacher/publish/publishBox'   // 添加作业
import publish from '../components/teacher/publish/index'
import addBox from '../components/teacher/publish/add/addBox'
import addChoose from '../components/teacher/publish/add/chooseAdd'
import addFill from '../components/teacher/publish/add/fillAdd'
import showBox from '../components/teacher/publish/show/showBox'
import showChoose from '../components/teacher/publish/show/chooseShow'
import showFill from '../components/teacher/publish/show/fillShow'

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
                path: 'show',
                component: listBox,
                children: [
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
                        path: '/',
                        redirect: 'list'
                    }
                ]
            },
            {
                path: 'box',
                component: box,
                children: [
                    {
                        path: 'publish',
                        component: publish,
                        children: [
                            {
                                path: 'add',
                                component: addBox,
                                children: [
                                    {
                                        path: 'choose',
                                        component: addChoose
                                    },
                                    {
                                        path: 'fill',
                                        component: addFill
                                    },
                                    {
                                        path: '/',
                                        redirect: 'choose'
                                    }
                                ]
                            },
                            {
                                path: 'show',
                                component: showBox,
                                children: [
                                    {
                                        path: 'choose',
                                        component: showChoose
                                    },
                                    {
                                        path: 'fill',
                                        component: showFill
                                    },
                                    {
                                        path: '/',
                                        redirect: 'choose'
                                    }
                                ]
                            },
                            {
                                path: '/',
                                redirect: 'add'
                            }
                        ]
                    },
                    {
                        path: 'library',
                        component: library
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
                redirect: 'show'
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
