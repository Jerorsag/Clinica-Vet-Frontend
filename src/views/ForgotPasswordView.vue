<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con imagen y título -->
      <div class="bg-blue-600 py-6 relative">
        <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
          <RotateCcwKey class="w-full h-full text-white"/>
        </div>
        <div class="flex justify-center mb-3">
          <div class="bg-white p-2 rounded-full shadow-md">
            <Lock class="p-1 w-12 h-12 text-blue-600"/>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-center text-white">Recupera tu Contraseña</h1>
        <p class="text-center text-blue-100 mt-1">Te enviaremos instrucciones por correo</p>
      </div>

      <!-- Contenido principal -->
      <div class="p-8">
        <div v-if="!emailSent" class="space-y-6">
          <!-- Panel informativo -->
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <Info class="h-5 w-5 text-blue-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  Ingresa tu correo electrónico y te enviaremos un enlace para restaurar tu contraseña.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Mensaje de error -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start">
            <Info class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{{ error }}</span>
          </div>
          
          <!-- Formulario -->
          <form @submit.prevent="handleResetPassword" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out shadow-md"
                :disabled="isLoading"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3" v-if="!isLoading">
                  <Upload class="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                </span>
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Enviando...' : 'Enviar Instrucciones' }}
              </button>
            </div>
          </form>

          <div class="text-center">
            <router-link to="/login" class="font-medium text-sm text-blue-600 hover:text-blue-500">
              Volver al inicio de sesión
            </router-link>
          </div>
        </div>
        
        <!-- Pantalla de éxito cuando se envía el correo -->
        <div v-if="emailSent" class="text-center space-y-6">
          <div class="flex justify-center">
            <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <h2 class="text-xl font-bold text-gray-800">¡Listo! Revisa tu correo</h2>
          
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-blue-800">
              Hemos enviado instrucciones a <strong>{{ email }}</strong> para recuperar tu contraseña.
            </p>
          </div>
          
          <p class="text-gray-600 text-sm">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o correo no deseado.
          </p>
          
          <div class="pt-4">
            <button 
              @click="goToLogin" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="bg-gray-50 px-8 py-4 border-t border-gray-100">
        <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Lock class="h-4 w-4 text-blue-500"/>
          <span>Toda la información es encriptada y segura</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RotateCcwKey, Lock, Info, AtSign, Upload } from 'lucide-vue-next'

const router = useRouter()
const email = ref('')
const isLoading = ref(false)
const error = ref('')
const emailSent = ref(false)

const handleResetPassword = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Simular el envío de correo de recuperación
    // En una implementación real, esto sería una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simular retraso de red
    
    // Simular éxito
    emailSent.value = true
    
  } catch (err) {
    console.error('Error al solicitar recuperación de contraseña:', err)
    error.value = 'Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente.'
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>