import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const currentUser = ref(null)
  const isAuthenticated = computed(() => currentUser.value !== null)
  
  const registeredUsers = ref([
    {
      id: 1,
      name: 'Ana García',
      email: 'ana@email.com',
      password: '123456',
      phone: '555-0101',
      createdAt: new Date('2025-01-15')
    },
    {
      id: 2,
      name: 'Carlos López',
      email: 'carlos@email.com',
      password: 'password123',
      phone: '555-0102',
      createdAt: new Date('2025-02-20')
    }
  ])
  
  const userMessages = ref([
    {
      id: 1,
      recipient: 'Carlos López',
      title: 'Reunión del proyecto',
      content: 'Hola Carlos, necesitamos coordinar la reunión del próximo lunes para revisar el avance.',
      sender: 'Ana García',
      createdAt: new Date('2025-08-10T14:30:00'),
      timestamp: '10/08/2025 - 14:30'
    },
    {
      id: 2,
      recipient: 'María Silva',
      title: 'Documentación pendiente',
      content: 'María, podrías revisar los documentos que envié ayer? Necesito tu feedback.',
      sender: 'Ana García',
      createdAt: new Date('2025-08-09T16:45:00'),
      timestamp: '09/08/2025 - 16:45'
    }
  ])
  
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
  
  function registerUser(userData) {
    const existingUser = registeredUsers.value.find(u => u.email === userData.email)
    if (existingUser) {
      return false
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date()
    }
    registeredUsers.value.push(newUser)
    return true
  }
  
  function addMessage(messageData) {
    const newMessage = {
      id: Date.now(),
      ...messageData,
      sender: currentUser.value?.name || 'Usuario',
      createdAt: new Date(),
      timestamp: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', ' -')
    }
    userMessages.value.push(newMessage)
    return newMessage
  }
  
  function updateUserProfile(updatedData) {
    if (currentUser.value) {
      Object.assign(currentUser.value, updatedData)
      const userIndex = registeredUsers.value.findIndex(u => u.id === currentUser.value.id)
      if (userIndex !== -1) {
        registeredUsers.value[userIndex] = { ...currentUser.value }
      }
    }
  }
  
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
    addMessage,
    updateUserProfile
  }
})
