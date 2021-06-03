Vue.use(VueRouter)

const routes = [
    {
        path: '/', 
        component: () => import('../views/_home.js')
    }
]

const router = new VueRouter({
    routes
});

export default router