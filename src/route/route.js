import Vue from 'vue'
import Router from 'vue-router';

import ImageOnly from '../pages/ImageOnly.vue'
import List from '../pages/List.vue'
import TextOnly from '../pages/TextOnly.vue'
import Default from '../pages/Default.vue'
import MoreActions from '../pages/MoreActions.vue'
import Horizontal from '../pages/Horizontal.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
        path: '/',
        redirect: '/list'
    },
    {
        path: '/list',
        name: 'List',
        component: List
    },
    {
        path: '/imageonly',
        component: ImageOnly
    },
    {
        path: '/textonly',
        component: TextOnly
    },
    {
        path: '/default',
        component: Default
    },
    {
        path: '/moreactions',
        component: MoreActions
    },
    {
        path: '/horizontal',
        component: Horizontal
    }
  ]
})

export default router