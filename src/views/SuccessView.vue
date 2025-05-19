<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con fondo decorativo -->
      <div class="relative bg-emerald-600 h-32 overflow-hidden">
        <!-- Elementos decorativos de fondo -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-2 left-4">
            <CircleCheck class="w-8 h-8" stroke="white"/>
          </div>
          <div class="absolute top-4 right-8">
            <CircleCheck class="w-12 h-12" stroke="white"/>
          </div>
          <div class="absolute bottom-2 right-4">
            <CircleCheck class="w-10 h-10" stroke="white"/>
          </div>
          <div class="absolute bottom-4 left-8">
            <CircleCheck class="w-6 h-6" stroke="white"/>
          </div>
        </div>
        
        <!-- Contenedor del ícono de éxito -->
        <div class="absolute left-1/2 -bottom-2 transform -translate-x-1/2">
          <div class="bg-white p-4 rounded-full shadow-lg border-4 border-white">
            <CircleCheck class="h-12 w-12 text-emerald-500"/>
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
            <Info class="h-8 w-8 text-emerald-400"/>
          </div>
          <p class="text-emerald-800 font-medium">{{ message }}</p>
          <p class="text-emerald-600 text-sm mt-2">Te agradecemos por confiar en nuestra clínica veterinaria</p>
        </div>
        
        <!-- Sección de beneficios rápidos -->
        <div class="grid grid-cols-3 gap-4 mb-8 text-center">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <Clock class="h-5 w-5 text-emerald-600"/>
            </div>
            <span class="text-xs text-gray-600">Citas Rápidas</span>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <ShieldCheck class="h-5 w-5 text-emerald-600" />
            </div>
            <span class="text-xs text-gray-600">Atención Segura</span>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <ArrowDownUp class="h-5 w-5 text-emerald-600"/>
            </div>
            <span class="text-xs text-gray-600">Personalización</span>
          </div>
        </div>
        
        <!-- Botón principal -->
        <button 
          @click="goToDashboard" 
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150 ease-in-out shadow-md"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <MoveRight  class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" />
          </span>
          Continuar
        </button>
        
        <!-- Footer con logo de pata -->
        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-center">
          <div class="flex items-center space-x-2">
            <PawPrint class="w-5 h-5 text-emerald-400"/> 
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
import { CircleCheck, Info, Clock, ShieldCheck, ArrowDownUp, MoveRight, PawPrint } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const message = computed(() => {
  return route.query.message as string || 'La operación se completó con éxito.'
})

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>