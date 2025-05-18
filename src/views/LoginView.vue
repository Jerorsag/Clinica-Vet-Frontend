<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con imagen y título -->
      <div class="bg-emerald-600 py-6 relative">
        <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-full h-full">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
        <div class="flex justify-center mb-3">
          <div class="bg-white p-2 rounded-full shadow-md">
            <User class="text-emerald-600" />
          </div>
        </div>
        <h1 class="text-2xl font-bold text-center text-white">Bienvenido de vuelta</h1>
        <p class="text-center text-emerald-100 mt-1">Accede a tu cuenta de Clínica Veterinaria</p>
      </div>

      <!-- Formulario -->
      <div class="p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Mensaje de error -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start">
            <Info class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{{ error }}</span>
          </div>

          <!-- Correo electrónico -->
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
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <!-- Contraseña -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400"/>
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                autocomplete="current-password"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400"
                placeholder="********"
              />
            </div>
          </div>

          <!-- Opciones de recordar y contraseña olvidada -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>

            <div class="text-sm">
              <router-link to="/forgot-password" class="font-medium text-emerald-600 hover:text-emerald-500">
                ¿Olvidaste tu contraseña?
              </router-link>
            </div>
          </div>

          <!-- Botón de envío -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-150 ease-in-out shadow-md"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3" v-if="!isLoading">
                <LogIn class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" />
              </span>
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
            </button>
          </div>
        </form>

        <!-- Enlace para crear cuenta -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            ¿No tienes cuenta?
            <router-link to="/register" class="font-medium text-emerald-600 hover:text-emerald-500">
              Créala aquí
            </router-link>
          </p>
        </div>

        <!-- Iconos de mascotas decorativos -->
        <div class="flex justify-center mt-6 space-x-2 text-emerald-500">
          <Cat class="w-5 h-5" />
          <PawPrint class="w-5 h-5" />
          <Dog class="w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { LoginCredentials, ApiResponse, Propietario } from '../types'
import { User, Info, AtSign, Lock, LogIn, PawPrint, Cat, Dog } from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      } as LoginCredentials)
    })
    
    const result = await response.json() as ApiResponse<Propietario>
    
    if (!result.success) {
      error.value = result.message || 'Error al iniciar sesión'
      return
    }
    
    // Almacenar el usuario en localStorage o en un store global
    localStorage.setItem('user', JSON.stringify(result.data))
    
    // Redireccionar a la página de éxito (o al dashboard en una app real)
    router.push('/success')
  } catch (err) {
    console.error('Error during login:', err)
    error.value = 'Error al conectar con el servidor'
  } finally {
    isLoading.value = false
  }
}
</script>