import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {path: '/part1', name: 'home', component: () => import('@/views/part1/index')},
    {path: '/part1/setup', name: 'setup', component: () => import('@/views/part1/setup')},

    {path: '/part2', name: 'part2', component: () => import('@/views/part2/index')},
    {path: '/part2/variables', name: 'variables', component: () => import('@/views/part2/variables')},

    {path: '/part3', name: 'part3', component: () => import('@/views/part3/index')},

    {path: '/part4', name: 'part4', component: () => import('@/views/part4/index')},
    {path: '/part4/component', name: 'part4/component', component: () => import('@/views/part4/component')},
    {path: '/part4/slot', name: 'part4/slot', component: () => import('@/views/part4/slot')},
    {path: '/part4/pluginWithComponent', name: 'part4/pluginWithComponent', component: () => import('@/views/part4/pluginWithComponent')},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
