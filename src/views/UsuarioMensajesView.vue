<template>
  <div class="mensajes-container">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Mis Mensajes</h1>
        <nav class="breadcrumb">
          <router-link to="/principal">Principal</router-link>
          <span>/</span>
          <router-link to="/usuario">Usuario</router-link>
          <span>/</span>
          <span>Mensajes</span>
        </nav>
      </div>
    </header>
    
    <main class="main-content">
      <div class="messages-header">
        <div class="messages-info">
          <h2>Mensajes Enviados</h2>
          <p>Total: {{ appStore.getCurrentUserMessages.length }} mensajes</p>
        </div>
        <div class="messages-actions">
          <router-link to="/principal" class="btn btn-secondary">
            Volver al Principal
          </router-link>
          <button @click="openNewMessageModal" class="btn btn-primary">
            Nuevo Mensaje
          </button>
        </div>
      </div>
      
      <div v-if="appStore.getCurrentUserMessages.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>No hay mensajes</h3>
        <p>Aún no has enviado ningún mensaje.</p>
        <button @click="openNewMessageModal" class="btn btn-primary">
          Enviar tu primer mensaje
        </button>
      </div>
      
      <div v-else class="messages-list">
        <div 
          v-for="message in sortedMessages" 
          :key="message.id" 
          class="message-card"
        >
          <div class="message-header">
            <div class="message-recipient">
              <span class="recipient-label">Para:</span>
              <span class="recipient-name">{{ message.recipient }}</span>
            </div>
            <div class="message-time">{{ message.timestamp }}</div>
          </div>
          
          <div class="message-body">
            <h3 class="message-title">{{ message.title }}</h3>
            <p class="message-content">{{ message.content }}</p>
          </div>
          
          <div class="message-footer">
            <span class="message-status">Enviado</span>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Modal para nuevo mensaje -->
    <div v-if="showNewMessageModal" class="modal-overlay" @click="closeNewMessageModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Nuevo Mensaje</h3>
          <button @click="closeNewMessageModal" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="sendMessage" class="modal-body">
          <div class="form-group">
            <label for="recipient">Destinatario</label>
            <input 
              type="text" 
              id="recipient"
              v-model="newMessage.recipient"
              :class="{ 'error': showErrors && !newMessage.recipient }"
              placeholder="Nombre del destinatario"
            >
          </div>
          
          <div class="form-group">
            <label for="title">Título</label>
            <input 
              type="text" 
              id="title"
              v-model="newMessage.title"
              :class="{ 'error': showErrors && !newMessage.title }"
              placeholder="Asunto del mensaje"
            >
          </div>
          
          <div class="form-group">
            <label for="content">Contenido</label>
            <textarea 
              id="content"
              v-model="newMessage.content"
              :class="{ 'error': showErrors && !newMessage.content }"
              placeholder="Escribe tu mensaje aquí..."
              rows="4"
            ></textarea>
          </div>
          
          <div v-if="showErrors" class="error-message">
            Por favor, completa todos los campos antes de enviar el mensaje.
          </div>
        </form>
        
        <div class="modal-footer">
          <button @click="closeNewMessageModal" class="btn btn-secondary">
            Cancelar
          </button>
          <button @click="sendMessage" class="btn btn-primary">
            Enviar Mensaje
          </button>
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

// Estado del modal y formulario
const showNewMessageModal = ref(false)
const showErrors = ref(false)
const newMessage = ref({
  recipient: '',
  title: '',
  content: ''
})

// Verificar autenticación
if (!appStore.isAuthenticated) {
  router.push('/login')
}

// Mensajes ordenados por fecha (más recientes primero)
const sortedMessages = computed(() => {
  return [...appStore.getCurrentUserMessages].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )
})

// Función para abrir modal de nuevo mensaje
function openNewMessageModal() {
  showNewMessageModal.value = true
  showErrors.value = false
  // Resetear formulario
  newMessage.value = {
    recipient: '',
    title: '',
    content: ''
  }
}

// Función para cerrar modal
function closeNewMessageModal() {
  showNewMessageModal.value = false
  showErrors.value = false
}

// Función para enviar mensaje
function sendMessage() {
  // Validar campos
  if (!newMessage.value.recipient || !newMessage.value.title || !newMessage.value.content) {
    showErrors.value = true
    return
  }
  
  // Añadir mensaje al store
  appStore.addMessage({
    recipient: newMessage.value.recipient,
    title: newMessage.value.title,
    content: newMessage.value.content
  })
  
  // Cerrar modal
  closeNewMessageModal()
}
</script>

<style scoped>
.mensajes-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.page-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header-content {
  width: 100%;
  margin: 0;
  padding: 0 3rem;
}

.page-title {
  color: #333;
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  font-weight: 500;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.main-content {
  width: 100%;
  margin: 0;
  padding: 3rem;
  flex: 1;
}

.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.messages-info h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
}

.messages-info p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.messages-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 14px 28px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: 2px solid #e0e0e0;
}

.btn-secondary:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.empty-state p {
  color: #666;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.messages-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
}

.message-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
}

.message-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
}

.message-recipient {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.recipient-label {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.recipient-name {
  font-weight: 700;
  color: #333;
  font-size: 1.1rem;
}

.message-time {
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
}

.message-body {
  margin-bottom: 1.5rem;
}

.message-title {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
}

.message-content {
  margin: 0;
  color: #555;
  line-height: 1.7;
  font-size: 1rem;
}

.message-footer {
  display: flex;
  justify-content: flex-end;
}

.message-status {
  background: #e8f5e8;
  color: #28a745;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
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
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
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

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ff7675;
  background-color: #fff5f5;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.error-message {
  background: #fff5f5;
  border: 1px solid #ff7675;
  color: #d63031;
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.modal-footer {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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
  .main-content {
    padding: 2rem 1rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .messages-header {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
    padding: 1.5rem;
  }
  
  .messages-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .messages-list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .message-card {
    padding: 1.5rem;
  }
  
  .message-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .modal {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .messages-header {
    padding: 1rem;
  }
  
  .main-content {
    padding: 1rem 0.5rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
  
  .empty-state {
    padding: 3rem 1rem;
  }
  
  .messages-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Para pantallas muy anchas */
@media (min-width: 1400px) {
  .messages-list {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
  
  .main-content {
    padding: 3rem 4rem;
  }
  
  .header-content {
    padding: 0 4rem;
  }
}
</style>
