import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {path: '/part1', name: 'home', component: () => import('@/views/part1/index')},
    {path: '/part1/setup', name: 'setup', component: () => import('@/views/part1/setup')},

    {path: '/part2', name: 'part2', component: () => import('@/views/part2/index')},
    {path: '/part2/variables', name: 'variables', component: () => import('@/views/part2/variables')},

    {path: '/part3/plugin', name: 'part3/plugin', component: () => import('@/views/part3/plugin')},
    {path: '/part3/component', name: 'part3/component', component: () => import('@/views/part3/component')},
    {path: '/part3/slot', name: 'part3/slot', component: () => import('@/views/part3/slot')},
    {path: '/part3/pluginWithComponent', name: 'part3/pluginWithComponent', component: () => import('@/views/part3/pluginWithComponent')},

    {path: '/part4/component', name: 'part4/component', component: () => import('@/views/part4/component')},
    {path: '/part4/transition', name: 'part4/transition', component: () => import('@/views/part4/transition')},
    {path: '/part4/gameLayout', name: 'part4/gameLayout', component: () => import('@/views/part4/gameLayout')},
    {path: '/part4/game', name: 'part4/game', component: () => import('@/views/part4/game')},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
