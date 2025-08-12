import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PrincipalView from '../views/PrincipalView.vue'
import UsuarioView from '../views/UsuarioView.vue'
import UsuarioMensajesView from '../views/UsuarioMensajesView.vue'
import RegistroView from '../views/RegistroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/principal',
      name: 'principal',
      component: PrincipalView,
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsuarioView,
    },
    {
      path: '/usuario/mensajes',
      name: 'usuarioMensajes',
      component: UsuarioMensajesView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
  ],
})

export default router
