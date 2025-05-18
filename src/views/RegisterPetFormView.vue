<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con imagen y título -->
      <div class="bg-emerald-600 py-6 relative">
        <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-full h-full" fill="white">
            <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
          </svg>
        </div>
        <div class="flex justify-center mb-3">
          <div class="bg-white p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-emerald-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-center text-white">Registra a tu Mascota</h1>
        <p class="text-center text-emerald-100 mt-1">Agreguemos información sobre tu compañero</p>
      </div>

      <!-- Formulario -->
      <div class="p-6">
        <form @submit.prevent="handleRegisterPet" class="space-y-4">
          <!-- Mensaje de error -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span>{{ error }}</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nombre de la mascota -->
            <div class="md:col-span-2">
              <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la mascota
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  id="nombre"
                  v-model="petData.nombre"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400"
                  placeholder="Firulais"
                />
              </div>
            </div>

            <!-- Especie -->
            <div>
              <label for="especie" class="block text-sm font-medium text-gray-700 mb-1">
                Especie
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 text-gray-400" fill="currentColor">
                    <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3z" />
                  </svg>
                </div>
                <select
                  id="especie"
                  v-model="petData.id_especie"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                >
                  <option value="" disabled>Seleccionar</option>
                  <option v-for="especie in especies" :key="especie.id" :value="especie.id">
                    {{ especie.nombre }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Raza -->
            <div>
              <label for="raza" class="block text-sm font-medium text-gray-700 mb-1">
                Raza
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <select
                  id="raza"
                  v-model="petData.id_raza"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                >
                  <option value="" disabled>Seleccionar</option>
                  <option v-for="raza in razasFiltradas" :key="raza.id" :value="raza.id">
                    {{ raza.nombre }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Fecha de nacimiento -->
            <div>
              <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="fecha_nacimiento"
                  v-model="petData.fecha_nacimiento"
                  type="date"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                />
              </div>
            </div>

            <!-- Sexo -->
            <div>
              <label for="sexo" class="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <select
                  id="sexo"
                  v-model="petData.sexo"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                >
                  <option value="" disabled>Seleccionar</option>
                  <option value="M">Macho</option>
                  <option value="H">Hembra</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Descripción / Notas -->
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-1">
              Descripción / Características especiales
            </label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute top-3 left-3 flex items-start pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <textarea
                id="descripcion"
                v-model="petData.descripcion"
                rows="3"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-400"
                placeholder="Color, tamaño, comportamiento, etc."
              ></textarea>
            </div>
          </div>

          <!-- Sección de foto de mascota -->
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors duration-200">
            <div class="space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div class="flex text-sm text-gray-600 justify-center">
                <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                  <span>Subir una foto</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileChange" accept="image/*" />
                </label>
                <p class="pl-1">o arrastra y suelta</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
            </div>
            <!-- Preview de imagen -->
            <div v-if="imagePreview" class="mt-3">
              <img :src="imagePreview" alt="Vista previa" class="h-32 mx-auto rounded-lg object-cover" />
            </div>
          </div>

          <!-- Botones -->
          <div class="flex space-x-4 pt-4">
            <button 
              type="button" 
              @click="$router.push('/register-pet-prompt')"
              class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Volver
            </button>
            
            <button 
              type="submit" 
              class="flex-1 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              :disabled="isLoading"
            >
              <span v-if="!isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </span>
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Registrando...' : 'Guardar Mascota' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Especie, Raza, Paciente } from '../types'

const router = useRouter()

// Estado
const isLoading = ref(false)
const error = ref('')
const imagePreview = ref('')
const imageFile = ref<File | null>(null)

// Datos simulados de especies y razas
const especies = ref<Especie[]>([
  { id: 1, nombre: 'Perro' },
  { id: 2, nombre: 'Gato' }
])

const razas = ref<Raza[]>([
  // Perros
  { id: 1, nombre: 'Labrador', id_especie: 1 },
  { id: 2, nombre: 'Pastor Alemán', id_especie: 1 },
  { id: 3, nombre: 'Bulldog', id_especie: 1 },
  { id: 4, nombre: 'Chihuahua', id_especie: 1 },
  { id: 5, nombre: 'Husky', id_especie: 1 },
  // Gatos
  { id: 6, nombre: 'Persa', id_especie: 2 },
  { id: 7, nombre: 'Siamés', id_especie: 2 },
  { id: 8, nombre: 'Maine Coon', id_especie: 2 },
  { id: 9, nombre: 'Bengala', id_especie: 2 },
])

// Datos del formulario
const petData = reactive<Paciente>({
  nombre: '',
  id_propietario: 0, // Se asignará al cargar el componente
  id_especie: null,
  id_raza: null,
  fecha_nacimiento: '',
  sexo: '',
  descripcion: ''
})

// Razas filtradas basadas en la especie seleccionada
const razasFiltradas = computed(() => {
  if (!petData.id_especie) return []
  return razas.value.filter(raza => raza.id_especie === petData.id_especie)
})

// Cargar datos del propietario al montar el componente
onMounted(() => {
  const userJson = localStorage.getItem('user')
  if (userJson) {
    try {
      const user = JSON.parse(userJson)
      petData.id_propietario = user.id_propietario
    } catch (err) {
      console.error('Error al cargar datos del usuario:', err)
      error.value = 'No se pudo cargar la información del propietario'
    }
  } else {
    router.push('/login') // Redirigir al login si no hay usuario
  }
})

// Manejar cambio de archivo de imagen
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  
  const file = target.files[0]
  imageFile.value = file
  
  // Crear preview
  const reader = new FileReader()
  reader.onload = e => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

// Manejar el envío del formulario
const handleRegisterPet = async () => {
  try {
    isLoading.value = true
    error.value = ''

    // Simular carga de archivo (en una implementación real, esto sería una carga a un servidor)
    if (imageFile.value) {
      // Aquí iría la lógica para subir la imagen
      console.log('Subiendo imagen:', imageFile.value.name)
      // Espera simulada para la carga de la imagen
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    // Registrar mascota en el backend
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petData)
    })
    
    const result = await response.json()
    
    if (!result.success) {
      error.value = result.message || 'Error al registrar la mascota'
      return
    }
    
    // Redireccionar a la página de éxito
    router.push({ 
      path: '/success', 
      query: { 
        action: 'pet-registered',
        message: `¡Excelente! ${petData.nombre} ha sido registrado correctamente en nuestra clínica.` 
      } 
    })
  } catch (err) {
    console.error('Error al registrar mascota:', err)
    error.value = 'Error al conectar con el servidor'
  } finally {
    isLoading.value = false
  }
}
</script>