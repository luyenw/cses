import {createRouter, createWebHistory} from 'vue-router'
import ProblemList from '@/components/pages/ProblemList'
import ProblemDetail from '@/components/pages/ProblemDetail'
import LoginPage from '@/components/pages/LoginPage'
import SignupPage from '@/components/pages/SignupPage'
import NotFound from '@/components/pages/NotFound'
import ProfilePage from '@/components/pages/ProfilePage'
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
    },
    {
        path: '/user/:id',
        component: ProfilePage
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router