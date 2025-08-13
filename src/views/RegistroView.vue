<template>
  <div class="registro-container">
    <div class="registro-card">
      <h1 class="registro-title">Crear Cuenta</h1>
      <p class="registro-subtitle">Únete a la comunidad NullDevs</p>
      
      <form @submit.prevent="handleRegister" class="registro-form">
        <div class="form-group">
          <label for="name">Nombre Completo</label>
          <input 
            type="text" 
            id="name"
            v-model="registerForm.name"
            :class="{ 'error': showErrors && !registerForm.name }"
            placeholder="Tu nombre completo"
          >
        </div>
        
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email"
            v-model="registerForm.email"
            :class="{ 'error': showErrors && !registerForm.email }"
            placeholder="usuario@ejemplo.com"
          >
        </div>
        
        <div class="form-group">
          <label for="phone">Teléfono</label>
          <input 
            type="tel" 
            id="phone"
            v-model="registerForm.phone"
            :class="{ 'error': showErrors && !registerForm.phone }"
            placeholder="Tu número de teléfono"
          >
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password"
            v-model="registerForm.password"
            :class="{ 'error': showErrors && !registerForm.password }"
            placeholder="Elige una contraseña segura"
          >
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input 
            type="password" 
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            :class="{ 'error': showErrors && !registerForm.confirmPassword }"
            placeholder="Confirma tu contraseña"
          >
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-full">
            Registrarse
          </button>
          <button type="button" @click="resetForm" class="btn btn-secondary btn-full">
            Limpiar Formulario
          </button>
        </div>
      </form>
      
      <div class="registro-actions">
        <router-link to="/" class="link">Volver al inicio</router-link>
        <router-link to="/login" class="link">¿Ya tienes cuenta? Inicia sesión</router-link>
      </div>
    </div>
    
    <!-- Modal de error -->
    <div v-if="showErrorModal" class="modal-overlay" @click="closeErrorModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Error de validación</h3>
          <button @click="closeErrorModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-icon error-icon">⚠️</div>
          <p>{{ errorMessage }}</p>
          <ul v-if="missingFields.length > 0" class="error-list">
            <li v-for="field in missingFields" :key="field">{{ field }}</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button @click="closeErrorModal" class="btn btn-primary">Entendido</button>
        </div>
      </div>
    </div>
    
    <!-- Modal de éxito -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>¡Registro exitoso!</h3>
          <button @click="closeSuccessModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-icon success-icon">✅</div>
          <p>Tu cuenta ha sido creada exitosamente.</p>
          <p>¡Bienvenido a NullDevs, {{ registerForm.name }}!</p>
        </div>
        <div class="modal-footer">
          <button @click="goToLogin" class="btn btn-primary">Ir al Login</button>
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

const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const showErrors = ref(false)
const showErrorModal = ref(false)
const showSuccessModal = ref(false)
const errorMessage = ref('')

const missingFields = computed(() => {
  const missing = []
  if (!registerForm.value.name) missing.push('Nombre Completo')
  if (!registerForm.value.email) missing.push('Correo Electrónico')
  if (!registerForm.value.phone) missing.push('Teléfono')
  if (!registerForm.value.password) missing.push('Contraseña')
  if (!registerForm.value.confirmPassword) missing.push('Confirmar Contraseña')
  return missing
})

// Función para manejar el registro
function handleRegister() {
  // Validar campos vacíos
  if (missingFields.value.length > 0) {
    showErrors.value = true
    errorMessage.value = 'Por favor, completa todos los campos obligatorios:'
    showErrorModal.value = true
    return
  }
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = 'Las contraseñas no coinciden. Por favor, verifícalas.'
    showErrorModal.value = true
    return
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.value.email)) {
    errorMessage.value = 'Por favor, ingresa un correo electrónico válido.'
    showErrorModal.value = true
    return
  }
  
  const existingUser = appStore.registeredUsers.find(user => user.email === registerForm.value.email)
  if (existingUser) {
    errorMessage.value = 'Este correo electrónico ya está registrado. Intenta con otro.'
    showErrorModal.value = true
    return
  }
  
  try {
    appStore.registerUser({
      name: registerForm.value.name,
      email: registerForm.value.email,
      phone: registerForm.value.phone,
      password: registerForm.value.password
    })
    
    showSuccessModal.value = true
  } catch (error) {
    errorMessage.value = 'Ocurrió un error durante el registro. Inténtalo nuevamente.'
    showErrorModal.value = true
  }
}

function resetForm() {
  registerForm.value = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }
  showErrors.value = false
}

// Función para cerrar modal de error
function closeErrorModal() {
  showErrorModal.value = false
  showErrors.value = false
}

// Función para cerrar modal de éxito
function closeSuccessModal() {
  showSuccessModal.value = false
}

// Función para ir al login después del registro exitoso
function goToLogin() {
  closeSuccessModal()
  router.push('/login')
}
</script>

<style scoped>
.registro-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  padding: 2rem;
  margin: 0;
}

.registro-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 550px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
}

.registro-title {
  font-size: 2.8rem;
  color: #1f2937;
  margin-bottom: 0.75rem;
  text-align: center;
  font-weight: 900;
  font-family: Arial, sans-serif;
  line-height: 1.2;
}

.registro-subtitle {
  color: #4b5563;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  line-height: 1.4;
}

.registro-form {
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
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-group input.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  font-weight: 800;
  padding: 16px;
  font-size: 1.1rem;
  font-family: Arial, sans-serif;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #d1d5db;
  font-weight: 800;
  padding: 16px;
  font-size: 1.1rem;
  font-family: Arial, sans-serif;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-full {
  width: 100%;
}

.registro-actions {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.link {
  color: #10b981;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.link:hover {
  color: #059669;
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

.error-icon {
  color: #ff7675;
}

.success-icon {
  color: #00b894;
}

.modal-body p {
  margin: 0.5rem 0;
  color: #666;
}

.error-list {
  text-align: left;
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: #d63031;
}

.error-list li {
  margin-bottom: 0.25rem;
}

.modal-footer {
  padding: 0 1.5rem 1.5rem;
  text-align: center;
}

@media (max-width: 1200px) {
  .registro-container {
    padding: 1.5rem;
  }
  
  .registro-card {
    padding: 2.5rem;
  }
}

@media (max-width: 768px) {
  .registro-card {
    padding: 2rem;
    max-width: 90%;
  }
  
  .registro-title {
    font-size: 2.2rem;
  }
  
  .registro-subtitle {
    font-size: 1.1rem;
  }
  
  .registro-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .registro-card {
    padding: 1.5rem;
    margin: 0.5rem;
  }
  
  .registro-title {
    font-size: 1.8rem;
  }
  
  .registro-subtitle {
    font-size: 1rem;
  }
  
  .registro-container {
    padding: 0.5rem;
  }
}
</style>
