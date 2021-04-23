/* Layout */
import Layout from '@/views/layout/Index'

export const appRouter = [
    {
        path: '/',
        // redirect重定向
        redirect: {
            name: 'home'
        },
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                // 这种写法是懒加载
                component: resolve => {
                    require(['@/views/home/Index.vue'], resolve)
                }
            },
            {
                path: 'search',
                name: 'search',
                component: resolve => {
                    require(['@/views/search/Index.vue'], resolve)
                }
            },
            {
                path: 'rank',
                name: 'rank',
                component: resolve => {
                    require(['@/views/rank/Index.vue'], resolve)
                }
            },
            {
                path: 'playlist',
                meta: {
                    title: '歌单',
                    keepAlive: true
                },
                name: 'playlist',
                component: resolve => {
                    require(['@/views/playlist/Index.vue'], resolve)
                }
            }
        ]

    }
]

export const routes = [...appRouter]
