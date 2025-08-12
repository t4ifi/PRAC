<template>
  <div class="principal-container">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">NullDevs</h1>
        <div class="user-menu">
          <div class="user-info" @click="showUserMenu = !showUserMenu">
            <span class="user-name">{{ appStore.currentUser?.name || 'Usuario' }}</span>
            <div class="user-avatar">{{ getUserInitials() }}</div>
          </div>
          <div v-if="showUserMenu" class="user-dropdown">
            <button @click="handleLogout" class="dropdown-item logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <div class="welcome-section">
        <h2 class="welcome-message">
          ¡Bienvenido, {{ appStore.currentUser?.name || 'Usuario' }}!
        </h2>
        <p class="welcome-subtitle">¿Qué te gustaría hacer hoy?</p>
      </div>
      
      <div class="navigation-menu">
        <div class="menu-section">
          <h3>Mi Perfil</h3>
          <div class="menu-items">
            <router-link to="/usuario" class="menu-item">
              <div class="menu-icon">👤</div>
              <div class="menu-info">
                <h4>Datos del Usuario</h4>
                <p>Ver y editar información personal</p>
              </div>
            </router-link>
            
            <router-link to="/usuario/mensajes" class="menu-item">
              <div class="menu-icon">💬</div>
              <div class="menu-info">
                <h4>Mensajes</h4>
                <p>Ver mensajes enviados y recibidos</p>
              </div>
            </router-link>
          </div>
        </div>
        
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-number">{{ appStore.getCurrentUserMessages.length }}</div>
            <div class="stat-label">Mensajes Enviados</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ appStore.registeredUsers.length }}</div>
            <div class="stat-label">Usuarios Registrados</div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Modal de confirmación para cerrar sesión -->
    <div v-if="showLogoutModal" class="modal-overlay" @click="closeLogoutModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Confirmar Cierre de Sesión</h3>
          <button @click="closeLogoutModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
        </div>
        <div class="modal-footer">
          <button @click="closeLogoutModal" class="btn btn-secondary">Cancelar</button>
          <button @click="confirmLogout" class="btn btn-primary">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const appStore = useAppStore()

// Estado local
const showUserMenu = ref(false)
const showLogoutModal = ref(false)

// Función para obtener iniciales del usuario
function getUserInitials() {
  const name = appStore.currentUser?.name || 'Usuario'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Función para manejar logout
function handleLogout() {
  showUserMenu.value = false
  showLogoutModal.value = true
}

// Función para confirmar logout
function confirmLogout() {
  appStore.logout()
  router.push('/login')
}

// Función para cerrar modal de logout
function closeLogoutModal() {
  showLogoutModal.value = false
}

// Cerrar menú de usuario al hacer click fuera
function closeUserMenu() {
  showUserMenu.value = false
}

// Verificar autenticación
if (!appStore.isAuthenticated) {
  router.push('/login')
}
</script>

<style scoped>
.principal-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  margin: 0;
  padding: 0;
}

.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  width: 100%;
}

.header-content {
  width: 100%;
  margin: 0;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.user-info:hover {
  background: rgba(248, 250, 252, 0.8);
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 150px;
  z-index: 100;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem;
  border: none;
  background: none;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.logout-btn {
  color: #ef4444;
}

.logout-btn:hover {
  background: rgba(254, 242, 242, 0.8);
}

.main-content {
  width: 100%;
  margin: 0;
  padding: 3rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-message {
  font-size: 3rem;
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.welcome-subtitle {
  font-size: 1.3rem;
  color: #6b7280;
  font-weight: 400;
}

.navigation-menu {
  display: grid;
  gap: 2rem;
  grid-template-columns: 2fr 1fr;
}

.menu-section h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.menu-item:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

.menu-icon {
  font-size: 2.5rem;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.menu-info h4 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 1.3rem;
  font-weight: 700;
}

.menu-info p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.5;
}

.stats-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(229, 231, 235, 0.5);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 15px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 1.5rem 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1rem 1.5rem;
}

.modal-footer {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
}

.btn-secondary {
  background: #ddd;
  color: #333;
}

.btn-secondary:hover {
  background: #ccc;
}

@media (max-width: 1200px) {
  .main-content {
    padding: 2rem;
  }
  
  .header-content {
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .navigation-menu {
    grid-template-columns: 1fr;
  }
  
  .welcome-message {
    font-size: 2rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-message {
    font-size: 1.5rem;
  }
  
  .main-content {
    padding: 1rem 0.5rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
}

/* Para pantallas muy anchas */
@media (min-width: 1400px) {
  .main-content {
    padding: 3rem 4rem;
  }
  
  .header-content {
    padding: 0 4rem;
  }
}
</style>
