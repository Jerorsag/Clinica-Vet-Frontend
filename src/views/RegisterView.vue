<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con imagen y título -->
      <div class="bg-blue-600 py-6 relative">
        <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-full h-full">
            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
          </svg>
        </div>
        <div class="flex justify-center mb-3">
          <div class="bg-white p-2 rounded-full shadow-md">
            <User class="w-10 h-10 text-blue-600"/>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-center text-white">Crea tu cuenta</h1>
        <p class="text-center text-blue-100 mt-1">Únete a la familia de Clínica Veterinaria</p>
      </div>

      <!-- Formulario -->
      <div class="p-6">
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Mensaje de error -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md flex items-start">
            <Info class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{{ error }}</span>
          </div>

          <!-- Grid de 2 columnas para información personal -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nombre Completo -->
            <div class="md:col-span-2">
              <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="nombre"
                  v-model="formData.nombre"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            <!-- Cédula -->
            <div>
              <label for="cedula" class="block text-sm font-medium text-gray-700 mb-1">
                Cédula
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdCard class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="cedula"
                  v-model="formData.cedula"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="1234567890"
                />
              </div>
            </div>

            <!-- Teléfono -->
            <div>
              <label for="telefono" class="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="telefono"
                  v-model="formData.telefono"
                  type="tel"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="3001234567"
                />
              </div>
            </div>

            <!-- Dirección -->
            <div class="md:col-span-2">
              <label for="direccion" class="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="direccion"
                  v-model="formData.direccion"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="Calle 123 #45-67"
                />
              </div>
            </div>

            <!-- Correo Electrónico -->
            <div class="md:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  autocomplete="email"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <!-- Contraseña -->
            <div class="md:col-span-2">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  required
                  autocomplete="new-password"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  placeholder="********"
                />
              </div>
              <p class="mt-1 text-xs text-gray-500">Mínimo 8 caracteres, incluye números y símbolos para mayor seguridad</p>
            </div>
          </div>

          <!-- Política de privacidad -->
          <div class="flex items-start mt-4">
            <div class="flex items-center h-5">
              <input 
                id="terms" 
                name="terms" 
                type="checkbox" 
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-medium text-gray-700">Acepto los términos y condiciones</label>
              <p class="text-gray-500">Al registrarte, aceptas nuestra política de privacidad y términos de servicio.</p>
            </div>
          </div>

          <!-- Botón de envío -->
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out shadow-md mt-4"
            :disabled="isLoading"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3" v-if="!isLoading">
              <CircleCheck class="h-5 w-5 text-blue-500 group-hover:text-blue-400"/>
            </span>
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Registrando...' : 'Crear Cuenta' }}
          </button>
        </form>

        <!-- Enlace para iniciar sesión -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            ¿Ya tienes cuenta?
            <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión
            </router-link>
          </p>
        </div>

        <!-- Decoración de patas de mascota -->
        <div class="flex justify-center space-x-2 mt-4 text-blue-500">
          <Cat class="w-5 h-5" />
          <PawPrint class="w-5 h-5" />
          <Dog class="w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { RegisterCredentials, ApiResponse, Propietario } from '../types'
import { User, Info, IdCard, Phone, MapPin, AtSign, Lock, CircleCheck, PawPrint, Cat, Dog } from 'lucide-vue-next'

const router = useRouter()

const formData = reactive<RegisterCredentials>({
  id_propietario: 0, // Se asignará en el backend
  nombre: '',
  cedula: '',
  direccion: '',
  telefono: '',
  email: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')

const handleRegister = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    const result = await response.json() as ApiResponse<Propietario>
    
    if (!result.success) {
      error.value = result.message || 'Error al registrar usuario'
      return
    }
    
    // Almacenar el usuario en localStorage o en un store global
    localStorage.setItem('user', JSON.stringify(result.data))
    
    // Redireccionar a la página de registro de mascota
    router.push('/register-pet-prompt')
  } catch (err) {
    console.error('Error during registration:', err)
    error.value = 'Error al conectar con el servidor'
  } finally {
    isLoading.value = false
  }
}
</script>