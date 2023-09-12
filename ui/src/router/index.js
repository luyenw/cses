import {createRouter, createWebHistory} from 'vue-router'
import ProblemList from '@/components/pages/ProblemList'
import ProblemDetail from '@/components/pages/ProblemDetail'
import LoginPage from '@/components/pages/LoginPage'
import SignupPage from '@/components/pages/SignupPage'
const routes = [
    {
        path: '/',
        component: ProblemList,

    },
    {
        path: '/task/:id',
        component: ProblemDetail
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/signup',
        component: SignupPage
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router