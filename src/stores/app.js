import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // Estado del usuario actual
  const currentUser = ref(null)
  const isAuthenticated = computed(() => currentUser.value !== null)
  
  // Lista de usuarios registrados
  const registeredUsers = ref([])
  
  // Mensajes del usuario
  const userMessages = ref([])
  
  // Funciones para autenticación
  function login(email, password) {
    const user = registeredUsers.value.find(u => u.email === email && u.password === password)
    if (user) {
      currentUser.value = user
      return true
    }
    return false
  }
  
  function logout() {
    currentUser.value = null
  }
  
  // Función para registrar usuario
  function registerUser(userData) {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date()
    }
    registeredUsers.value.push(newUser)
    return newUser
  }
  
  // Función para añadir mensaje
  function addMessage(messageData) {
    const newMessage = {
      id: Date.now(),
      ...messageData,
      sender: currentUser.value?.name || 'Usuario',
      createdAt: new Date(),
      timestamp: new Date().toLocaleString('es-ES')
    }
    userMessages.value.push(newMessage)
    return newMessage
  }
  
  // Función para obtener mensajes del usuario actual
  const getCurrentUserMessages = computed(() => {
    return userMessages.value.filter(msg => msg.sender === currentUser.value?.name)
  })

  return { 
    currentUser, 
    isAuthenticated, 
    registeredUsers,
    userMessages,
    getCurrentUserMessages,
    login, 
    logout, 
    registerUser,
    addMessage
  }
})
