<template>
  <div class="usuario-container">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Mi Perfil</h1>
        <nav class="breadcrumb">
          <router-link to="/principal">Principal</router-link>
          <span>/</span>
          <span>Usuario</span>
        </nav>
      </div>
    </header>
    
    <main class="main-content">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            {{ getUserInitials() }}
          </div>
          <div class="profile-info">
            <h2 class="profile-name">{{ appStore.currentUser?.name || 'Usuario' }}</h2>
            <p class="profile-subtitle">Miembro desde {{ getJoinDate() }}</p>
          </div>
        </div>
        
        <div class="profile-details">
          <div class="detail-row">
            <label>Nombre Completo:</label>
            <span>{{ appStore.currentUser?.name || 'No especificado' }}</span>
          </div>
          
          <div class="detail-row">
            <label>Correo Electrónico:</label>
            <span>{{ appStore.currentUser?.email || 'No especificado' }}</span>
          </div>
          
          <div class="detail-row">
            <label>Teléfono:</label>
            <span>{{ appStore.currentUser?.phone || 'No especificado' }}</span>
          </div>
          
          <div class="detail-row">
            <label>Fecha de Registro:</label>
            <span>{{ getJoinDate() }}</span>
          </div>
          
          <div class="detail-row">
            <label>Mensajes Enviados:</label>
            <span>{{ appStore.getCurrentUserMessages.length }}</span>
          </div>
        </div>
        
        <div class="profile-actions">
          <router-link to="/principal" class="btn btn-secondary">
            Volver al Principal
          </router-link>
          <button @click="editProfile" class="btn btn-primary">
            Editar Perfil
          </button>
        </div>
      </div>
      
      <div class="activity-card">
        <h3>Actividad Reciente</h3>
        <div v-if="appStore.getCurrentUserMessages.length > 0" class="activity-list">
          <div 
            v-for="message in recentMessages" 
            :key="message.id" 
            class="activity-item"
          >
            <div class="activity-icon">💬</div>
            <div class="activity-info">
              <p class="activity-title">Mensaje enviado a {{ message.recipient }}</p>
              <p class="activity-time">{{ message.timestamp }}</p>
            </div>
          </div>
        </div>
        <div v-else class="no-activity">
          <p>No hay actividad reciente</p>
          <router-link to="/usuario/mensajes" class="link">
            Enviar tu primer mensaje
          </router-link>
        </div>
      </div>
    </main>
    
    <!-- Modal de funcionalidad no disponible -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Funcionalidad no disponible</h3>
          <button @click="closeEditModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-icon">🚧</div>
          <p>Lo sentimos, la funcionalidad de edición de perfil aún no está disponible.</p>
          <p>Estamos trabajando en implementar esta característica.</p>
        </div>
        <div class="modal-footer">
          <button @click="closeEditModal" class="btn btn-primary">Entendido</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const appStore = useAppStore()

const showEditModal = ref(false)

if (!appStore.isAuthenticated) {
  router.push('/login')
}

function getUserInitials() {
  const name = appStore.currentUser?.name || 'Usuario'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function getJoinDate() {
  if (appStore.currentUser?.createdAt) {
    return new Date(appStore.currentUser.createdAt).toLocaleDateString('es-ES')
  }
  return new Date().toLocaleDateString('es-ES')
}

const recentMessages = computed(() => {
  return appStore.getCurrentUserMessages.slice(-3).reverse()
})

function editProfile() {
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
}
</script>

<style scoped>
.usuario-container {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  color: #333;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.profile-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.profile-name {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
}

.profile-subtitle {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.profile-details {
  margin-bottom: 2rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row label {
  font-weight: 600;
  color: #333;
}

.detail-row span {
  color: #666;
}

.profile-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #ddd;
  color: #333;
}

.btn-secondary:hover {
  background: #ccc;
  transform: translateY(-2px);
}

.activity-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.activity-card h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.3rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.activity-icon {
  font-size: 1.5rem;
}

.activity-info {
  flex: 1;
}

.activity-title {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
}

.activity-time {
  margin: 0;
  color: #666;
  font-size: 0.8rem;
}

.no-activity {
  text-align: center;
  color: #666;
  padding: 2rem 0;
}

.link {
  color: #667eea;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
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
  text-align: center;
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-body p {
  margin: 0.5rem 0;
  color: #666;
}

.modal-footer {
  padding: 0 1.5rem 1.5rem;
  text-align: center;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-actions {
    flex-direction: column;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
