<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con fondo decorativo -->
      <div class="relative h-32 bg-emerald-600 overflow-hidden flex items-center justify-center">
        <!-- Patrón decorativo de fondo -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -left-4 -top-4 w-32 h-32">
            <PawPrint class="w-full h-full text-white"/>
          </div>
          <div class="absolute right-0 bottom-0 w-40 h-40">
            <PawPrint class="w-full h-full text-white"/>
          </div>
        </div>
        
        <!-- Círculo con ícono de mascota -->
        <div class="relative z-10">
          <div class="bg-white p-4 rounded-full shadow-lg">
            <PawPrint class="w-14 h-14 text-emerald-600" />
          </div>
        </div>
      </div>
      
      <!-- Contenido -->
      <div class="p-8 text-center">
        <!-- Mensaje de éxito -->
        <div class="relative">
          <h1 class="text-2xl font-bold text-emerald-700 mb-2">¡Registro Exitoso!</h1>
          
          <!-- Confeti decorativo -->
          <span class="absolute -top-6 -left-2 text-yellow-500 text-xl">✦</span>
          <span class="absolute -top-4 right-4 text-emerald-400 text-lg">✦</span>
          <span class="absolute top-1 -right-2 text-blue-400 text-xl">✦</span>
        </div>
        
        <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg my-6">
          <p class="text-emerald-800 font-medium">Tu cuenta ha sido creada correctamente.</p>
        </div>
        
        <div class="mb-8">
          <p class="text-gray-800 text-lg font-medium mb-3">¿Deseas registrar una mascota ahora?</p>
          <p class="text-gray-600 text-sm">Puedes hacerlo en este momento o más tarde desde tu perfil.</p>
        </div>
        
        <!-- Opciones con ilustraciones -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Opción Sí -->
          <div 
            @click="handleRegisterPet"
            class="bg-white border-2 border-emerald-200 hover:border-emerald-500 rounded-xl p-5 flex flex-col items-center cursor-pointer transition-all duration-300 hover:shadow-md"
          >
            <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
              <CirclePlus class="h-8 w-8 text-emerald-600"/>
            </div>
            <h3 class="font-medium text-emerald-800 mb-1">Registrar ahora</h3>
            <p class="text-sm text-gray-500">Agrega tu primera mascota</p>
          </div>
          
          <!-- Opción No -->
          <div 
            @click="handleSkip"
            class="bg-white border-2 border-gray-200 hover:border-gray-400 rounded-xl p-5 flex flex-col items-center cursor-pointer transition-all duration-300 hover:shadow-md"
          >
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Eye class="h-8 w-8 text-gray-600"/>
            </div>
            <h3 class="font-medium text-gray-700 mb-1">Más tarde</h3>
            <p class="text-sm text-gray-500">Continuar sin registrar</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="pt-4 border-t border-gray-200">
          <div class="flex justify-center space-x-4">
            <div class="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <Fingerprint class="h-5 w-5 text-emerald-500" />
            </div>
            <div class="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <Heart class="h-5 w-5 text-emerald-500" />
            </div>
            <div class="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <ShieldCheck class="h-5 w-5 text-emerald-500"  />
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-3">Tu compañero siempre estará en buenas manos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { PawPrint, CirclePlus, Eye, Fingerprint, Heart, ShieldCheck } from 'lucide-vue-next'

const router = useRouter()

const handleRegisterPet = () => {
  // En la versión actualizada, ahora redirigimos al formulario de registro de mascota
  router.push('/register-pet')
}

const handleSkip = () => {
  router.push({ 
    path: '/success',
    query: { 
      action: 'skip-pet',
      message: 'Has elegido no registrar mascota por ahora. ¡Puedes hacerlo más tarde!' 
    }
  })
}
</script>