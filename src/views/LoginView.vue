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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-emerald-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Correo electrónico -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
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
        <div class="flex justify-center mt-6 space-x-4 text-emerald-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M9.597 5.506a.75.75 0 00.5 0l8.5-4.25A.75.75 0 0018.659.75H1.341a.75.75 0 00.062 1.506l8.194 4.25z" />
            <path fill-rule="evenodd" d="M5.232 9.232A50.816 50.816 0 0010 8.5c1.746 0 3.423.134 5.05.383.754.12 1.682.25 2.366.713.684.462 1.082 1.195 1.082 2.233 0 1.199-.88 2.182-2.241 2.183-1.863 0-3.702-.293-5.474-.876a.75.75 0 10-.455 1.428 20.563 20.563 0 003.346.718A.75.75 0 0014 16a3.28 3.28 0 01-1.847-.532 3.28 3.28 0 00-1.83-.535c-.668 0-1.319.234-1.826.534A3.276 3.276 0 016.65 16a.75.75 0 00.326-1.433 21.244 21.244 0 003.774-.777c-1.102-.263-2.414-.445-3.95-.54A50.406 50.406 0 000 14.022c.14.895.86 1.598 1.787 1.8 1.193.26 2.432.445 3.713.57a.75.75 0 10.137-1.494 40.121 40.121 0 01-3.265-.525C1.587 14.156 1 13.325 1 12.19c0-1.196.441-1.96 1.154-2.396z" clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M8.5 7a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM17 7a3 3 0 10-6 0 3 3 0 006 0zm-9 3.75a.75.75 0 000-1.5H2.612l1.178 2.417A3.192 3.192 0 006.773 13h5.954c.83 0 1.584-.478 1.94-1.227l.762-1.613a.75.75 0 00-1.354-.63l-.762 1.613a.696.696 0 01-.63.407H6.773a1.692 1.692 0 01-1.576-.958l-.995-2.04a.75.75 0 00-.676-.417H8z" clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { LoginCredentials, ApiResponse, Propietario } from '../types'

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