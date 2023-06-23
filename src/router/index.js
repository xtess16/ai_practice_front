import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import ProfilePage from "@/pages/profile/ProfilePage.vue";
import SignupPage from "@/pages/profile/SignupPage.vue";
import SigninPage from "@/pages/profile/SigninPage.vue";
import TestExercisesPage from "@/pages/exercises/TestExercisesPage.vue";
import BigDataPage from "@/pages/learning/BigDataPage.vue";
import AIHistoryPage from "@/pages/learning/AIHistoryPage.vue";
import ComputerVisionPage from "@/pages/learning/ComputerVisionPage.vue";
import MachineLearningPage from "@/pages/learning/MachineLearningPage.vue";
import ArticleDetailPage from "@/pages/learning/ArticleDetailPage.vue";

const routes = [
  {
    path: '/',
    component: MainPage,
    name: 'home'
  },
  {
    path: '/profile',
    component: ProfilePage,
    name: 'profile'
  },
  {
    path: '/signup',
    component: SignupPage,
    name: 'signup'
  },
  {
    path: '/signin',
    component: SigninPage,
    name: 'signin'
  },
  // Обучение
  {
    path: '/learning/big-data',
    component: BigDataPage,
    name: 'learning:big-data'
  },
  {
    path: '/learning/ai-history',
    component: AIHistoryPage,
    name: 'learning:ai-history'
  },
  {
    path: '/learning/computer-vision',
    component: ComputerVisionPage,
    name: 'learning:computer-vision'
  },
  {
    path: '/learning/machine-learning',
    component: MachineLearningPage,
    name: 'learning:machine-learning'
  },
  {
    path: '/learning/article-detail/:id',
    component: ArticleDetailPage,
    name: 'learning:article-detail'
  },
  // Задания
  {
    path: '/test-exercises',
    component: TestExercisesPage,
    name: 'test-exercises'
  }
]

const index = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default index
