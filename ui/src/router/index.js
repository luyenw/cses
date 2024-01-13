import {createRouter, createWebHistory} from 'vue-router'
import ProblemList from '@/components/pages/ProblemList'
import ProblemPage from '@/components/pages/problem/ProblemPage'
import LoginPage from '@/components/pages/LoginPage'
import SignupPage from '@/components/pages/SignupPage'
import ContestPage from '@/components/pages/contest/ContestPage'
import ContestProblemList from '@/components/pages/contest/ContestProblemList'
import ContestProblemPage from '@/components/pages/contest/ContestProblemPage'
import NotFound from '@/components/pages/NotFound'
import ProfilePage from '@/components/pages/ProfilePage'
import LMSPage from '@/components/pages/LMSPage'
import SubmissionView from '@/components/pages/SubmissionView'
import CourseMain from '@/components/pages/CourseMain'
import CoursePageView from '@/components/pages/course/CoursePageView'

const routes = [
    {
        path: '/',
        component: ProblemList,

    },
    {
        path: '/problems/:id',
        component: ProblemPage
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
        path: '/users/:id',
        component: ProfilePage
    },
    {
        path: '/course/:id',
        component: CourseMain
    },
    {
        path: '/contests/',
        component: ContestPage
    },
    {
        path: '/contests/:id',
        component: ContestProblemList
    },
    {
        path: '/contests/:contest_id/problems/:problem_id',
        component: ContestProblemPage
    },
    {
        path: '/course/:id/page/:page_id',
        component: CoursePageView
    },
    {
        path: '/lms',
        component: LMSPage
    },
    {
        path: '/submit/:id/view',
        component: SubmissionView
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