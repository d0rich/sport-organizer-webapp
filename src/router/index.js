import Vue from 'vue'
import VueRouter from 'vue-router'


import Profile from '../views/profile/Profile.vue'
import Sections from '../views/profile/Sections.vue'
import Groups from "@/views/profile/Groups";


import CreateSection from '../views/entities/section/Create.vue'
import Section from '../views/entities/section/Section.vue'

import Group from '../views/entities/group/Group.vue'


import Register from '../views/account/Register.vue'
import Login from '../views/account/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/account/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/account/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:login',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profile/:login/sections',
    name: 'Sections',
    component: Sections
  },
  {
    path: '/profile/:login/groups',
    name: 'Groups',
    component: Groups
  },
  {
    path: '/sections/create',
    name: 'CreateSection',
    component: CreateSection
  },
  {
    path: '/sections/:sectionID',
    name: 'Section',
    component: Section
  },
  {
    path: '/groups/:groupID',
    name: 'Group',
    component: Group
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
