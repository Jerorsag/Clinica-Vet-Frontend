<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con fondo decorativo -->
      <div class="relative bg-emerald-600 h-32 overflow-hidden">
        <!-- Elementos decorativos de fondo -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-2 left-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="absolute top-4 right-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-12 h-12">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="absolute bottom-2 right-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="absolute bottom-4 left-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <!-- Contenedor del ícono de éxito -->
        <div class="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
          <div class="bg-white p-4 rounded-full shadow-lg border-4 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Contenido principal -->
      <div class="px-8 pt-16 pb-8 text-center">
        <!-- Título con efecto de brillos -->
        <div class="relative">
          <h1 class="text-2xl font-bold text-emerald-700 mb-6">¡Operación Exitosa!</h1>
          
          <!-- Brillos decorativos -->
          <div class="absolute -top-10 left-0 text-yellow-400 text-xl transform rotate-12">✨</div>
          <div class="absolute -top-6 right-4 text-emerald-300 text-lg transform -rotate-12">✨</div>
          <div class="absolute top-0 right-0 text-blue-300 text-base">✨</div>
        </div>
        
        <!-- Mensaje personalizado -->
        <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-6 mb-8">
          <div class="flex justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-emerald-800 font-medium">{{ message }}</p>
          <p class="text-emerald-600 text-sm mt-2">Te agradecemos por confiar en nuestra clínica veterinaria</p>
        </div>
        
        <!-- Sección de beneficios rápidos -->
        <div class="grid grid-cols-3 gap-4 mb-8 text-center">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs text-gray-600">Citas Rápidas</span>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span class="text-xs text-gray-600">Atención Segura</span>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span class="text-xs text-gray-600">Personalización</span>
          </div>
        </div>
        
        <!-- Botón principal -->
        <button 
          @click="goToLogin" 
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150 ease-in-out shadow-md"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
            </svg>
          </span>
          Volver al Inicio
        </button>
        
        <!-- Footer con logo de pata -->
        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-center">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 text-emerald-400" fill="currentColor">
              <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
            </svg>
            <span class="text-sm text-emerald-700 font-medium">Clínica Veterinaria</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const message = computed(() => {
  return route.query.message as string || 'La operación se completó con éxito.'
})

const goToLogin = () => {
  router.push('/login')
}
</script>