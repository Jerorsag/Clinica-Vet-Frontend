// src/composables/useSettings.ts
import { ref, computed } from 'vue'
import type { User, NotificationPreferences, Paciente } from '@/types'

export function useSettings() {
  // Estado reactivo
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // Datos del usuario
  const user = ref<User | null>(null)
  const userRole = ref<'cliente' | 'veterinario' | 'administrador'>('cliente')
  const notificationPreferences = ref<NotificationPreferences | null>(null)
  const userPets = ref<Paciente[]>([])

  // Estado de configuración específica
  const securitySettings = ref({
    twoFactorEnabled: false,
    activeSessions: [],
    lastPasswordChange: null
  })

  // Computed
  const isAdmin = computed(() => userRole.value === 'administrador')
  const isVeterinarian = computed(() => userRole.value === 'veterinario')
  const isClient = computed(() => userRole.value === 'cliente')

  // Cargar datos del usuario
  const loadUserData = async () => {
    isLoading.value = true
    error.value = null

    try {
      // Simular llamada a API - reemplazar con llamada real
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Obtener datos del localStorage o API
      const userJson = localStorage.getItem('user')
      if (userJson) {
        const userData = JSON.parse(userJson)
        user.value = userData
        
        // Determinar rol del usuario
        // Esto debería venir del backend, aquí simulamos
        userRole.value = determineUserRole(userData)
      }

      // Cargar preferencias de notificación
      await loadNotificationPreferences()
      
      // Cargar mascotas si es cliente
      if (userRole.value === 'cliente') {
        await loadUserPets()
      }

      // Cargar configuración de seguridad
      await loadSecuritySettings()

    } catch (err) {
      error.value = 'Error al cargar los datos del usuario'
      console.error('Error loading user data:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Determinar rol del usuario (temporal)
  const determineUserRole = (userData: any): 'cliente' | 'veterinario' | 'administrador' => {
    // Lógica temporal - esto debe venir del backend
    if (userData.email?.includes('admin')) return 'administrador'
    if (userData.email?.includes('vet')) return 'veterinario'
    return 'cliente'
  }

  // Cargar preferencias de notificación
  const loadNotificationPreferences = async () => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Valores por defecto
      notificationPreferences.value = {
        email: {
          appointments: true,
          reminders: true,
          promotions: false,
          system: true
        },
        sms: {
          appointments: true,
          reminders: true,
          promotions: false,
          system: false
        },
        whatsapp: {
          appointments: false,
          reminders: true,
          promotions: false,
          system: false
        },
        push: {
          appointments: true,
          reminders: true,
          promotions: true,
          system: true
        }
      }
    } catch (err) {
      console.error('Error loading notification preferences:', err)
    }
  }

  // Cargar mascotas del usuario
  const loadUserPets = async () => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Datos simulados
      userPets.value = [
        {
          id_paciente: 1,
          nombre: 'Max',
          id_propietario: user.value?.id_propietario || 1,
          id_especie: 1,
          id_raza: 1,
          fecha_nacimiento: '2019-05-15',
          sexo: 'M',
          descripcion: 'Labrador color chocolate'
        },
        {
          id_paciente: 2,
          nombre: 'Luna',
          id_propietario: user.value?.id_propietario || 1,
          id_especie: 2,
          id_raza: 6,
          fecha_nacimiento: '2020-03-10',
          sexo: 'H',
          descripcion: 'Gata persa blanca'
        }
      ]
    } catch (err) {
      console.error('Error loading user pets:', err)
    }
  }

  // Cargar configuración de seguridad
  const loadSecuritySettings = async () => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 300))
      
      securitySettings.value = {
        twoFactorEnabled: false,
        activeSessions: [
          {
            id: 1,
            device: 'Chrome - Windows',
            location: 'Armenia, Colombia',
            lastActive: new Date(),
            current: true
          }
        ],
        lastPasswordChange: new Date('2024-05-15')
      }
    } catch (err) {
      console.error('Error loading security settings:', err)
    }
  }

  // Actualizar información del usuario
  const updateUser = async (updatedUser: Partial<User>) => {
    isLoading.value = true
    error.value = null

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Actualizar usuario local
      if (user.value) {
        user.value = { ...user.value, ...updatedUser }
        
        // Actualizar localStorage
        localStorage.setItem('user', JSON.stringify(user.value))
      }

    } catch (err) {
      error.value = 'Error al actualizar la información del usuario'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Actualizar preferencias de notificación
  const updateNotificationPreferences = async (preferences: NotificationPreferences) => {
    isLoading.value = true
    error.value = null

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      notificationPreferences.value = preferences

    } catch (err) {
      error.value = 'Error al actualizar las preferencias de notificación'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Cambiar contraseña
  const changePassword = async (currentPassword: string, newPassword: string) => {
    isLoading.value = true
    error.value = null

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Validaciones básicas
      if (currentPassword === newPassword) {
        throw new Error('La nueva contraseña debe ser diferente a la actual')
      }

      if (newPassword.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres')
      }

      // Actualizar fecha de último cambio
      securitySettings.value.lastPasswordChange = new Date()

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cambiar la contraseña'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Actualizar información de mascotas
  const updateUserPets = async (pets: Paciente[]) => {
    isLoading.value = true
    error.value = null

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      userPets.value = pets

    } catch (err) {
      error.value = 'Error al actualizar la información de las mascotas'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Habilitar/deshabilitar autenticación de dos factores
  const toggleTwoFactor = async (enable: boolean) => {
    isLoading.value = true
    error.value = null

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      securitySettings.value.twoFactorEnabled = enable

    } catch (err) {
      error.value = 'Error al configurar la autenticación de dos factores'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Cerrar sesión en dispositivo específico
  const terminateSession = async (sessionId: number) => {
    isLoading.value = true
    error.value = null

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 600))
      
      securitySettings.value.activeSessions = securitySettings.value.activeSessions.filter(
        session => session.id !== sessionId
      )

    } catch (err) {
      error.value = 'Error al cerrar la sesión'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // Estado
    isLoading,
    error,
    
    // Datos
    user,
    userRole,
    notificationPreferences,
    userPets,
    securitySettings,
    
    // Computed
    isAdmin,
    isVeterinarian,
    isClient,
    
    // Métodos
    loadUserData,
    updateUser,
    updateNotificationPreferences,
    changePassword,
    updateUserPets,
    toggleTwoFactor,
    terminateSession
  }
}

// Tipos adicionales para el composable
export interface NotificationPreferences {
  email: NotificationChannelSettings
  sms: NotificationChannelSettings
  whatsapp: NotificationChannelSettings
  push: NotificationChannelSettings
}

export interface NotificationChannelSettings {
  appointments: boolean
  reminders: boolean
  promotions: boolean
  system: boolean
}

export interface SecuritySession {
  id: number
  device: string
  location: string
  lastActive: Date
  current: boolean
}