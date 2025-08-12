<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Iniciar Sesión</h1>
      <p class="login-subtitle">Ingresa a tu cuenta</p>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email"
            v-model="loginForm.email"
            :class="{ 'error': showErrors && !loginForm.email }"
            placeholder="usuario@ejemplo.com"
          >
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password"
            v-model="loginForm.password"
            :class="{ 'error': showErrors && !loginForm.password }"
            placeholder="Tu contraseña"
          >
        </div>
        
        <button type="submit" class="btn btn-primary btn-full">
          Iniciar Sesión
        </button>
      </form>
      
      <div class="login-actions">
        <router-link to="/" class="link">Volver al inicio</router-link>
        <router-link to="/registro" class="link">¿No tienes cuenta? Regístrate</router-link>
      </div>
    </div>
    
    <!-- Modal de error -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Error de validación</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p>Por favor, completa todos los campos antes de continuar.</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="btn btn-secondary">Entendido</button>
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

// Estado del formulario
const loginForm = ref({
  email: '',
  password: ''
})

// Estado de errores y modal
const showErrors = ref(false)
const showModal = ref(false)

// Función para manejar el login
function handleLogin() {
  // Validar campos
  if (!loginForm.value.email || !loginForm.value.password) {
    showErrors.value = true
    showModal.value = true
    return
  }
  
  // Intentar login
  const success = appStore.login(loginForm.value.email, loginForm.value.password)
  
  if (success) {
    router.push('/principal')
  } else {
    // Si no existe el usuario, crear uno temporal para la demo
    appStore.registerUser({
      name: 'Usuario Demo',
      email: loginForm.value.email,
      password: loginForm.value.password,
      phone: '123456789'
    })
    appStore.login(loginForm.value.email, loginForm.value.password)
    router.push('/principal')
  }
}

// Función para cerrar modal
function closeModal() {
  showModal.value = false
  showErrors.value = false
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 2rem;
  margin: 0;
}

.login-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 480px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
}

.login-title {
  font-size: 2.8rem;
  color: #1f2937;
  margin-bottom: 0.75rem;
  text-align: center;
  font-weight: 900;
  font-family: Arial, sans-serif;
  line-height: 1.2;
}

.login-subtitle {
  color: #4b5563;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  line-height: 1.4;
}

.login-form {
  margin-bottom: 2.5rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #1f2937;
  font-weight: 700;
  font-size: 1rem;
  font-family: Arial, sans-serif;
}

.form-group input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: white;
  font-weight: 500;
  font-family: Arial, sans-serif;
}

.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  border: none;
  font-weight: 800;
  padding: 16px;
  font-size: 1.1rem;
  font-family: Arial, sans-serif;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
}

.btn-secondary {
  background: #ddd;
  color: #333;
}

.btn-full {
  width: 100%;
}

.login-actions {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.link {
  color: #6366f1;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
}

.link:hover {
  color: #4f46e5;
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
}

.modal-footer {
  padding: 0 1.5rem 1.5rem;
  text-align: right;
}

@media (max-width: 1200px) {
  .login-container {
    padding: 1.5rem;
  }
  
  .login-card {
    padding: 2.5rem;
  }
}

@media (max-width: 768px) {
  .login-card {
    padding: 2rem;
    max-width: 90%;
  }
  
  .login-title {
    font-size: 2.2rem;
  }
  
  .login-subtitle {
    font-size: 1.1rem;
  }
  
  .login-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
    margin: 0.5rem;
  }
  
  .login-title {
    font-size: 1.8rem;
  }
  
  .login-subtitle {
    font-size: 1rem;
  }
  
  .login-container {
    padding: 0.5rem;
  }
}
</style>
