<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con fondo decorativo -->
      <div class="relative h-32 bg-emerald-600 overflow-hidden flex items-center justify-center">
        <!-- Patrón decorativo de fondo -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -left-4 -top-4 w-32 h-32">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-full h-full" fill="white">
              <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
            </svg>
          </div>
          <div class="absolute right-0 bottom-0 w-40 h-40">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-full h-full" fill="white">
              <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
            </svg>
          </div>
        </div>
        
        <!-- Círculo con ícono de mascota -->
        <div class="relative z-10">
          <div class="bg-white p-4 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-14 h-14 text-emerald-600" fill="currentColor">
              <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
            </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="font-medium text-gray-700 mb-1">Más tarde</h3>
            <p class="text-sm text-gray-500">Continuar sin registrar</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="pt-4 border-t border-gray-200">
          <div class="flex justify-center space-x-4">
            <div class="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <div class="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div class="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
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