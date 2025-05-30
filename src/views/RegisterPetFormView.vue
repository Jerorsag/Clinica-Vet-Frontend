<template>
  <div class="min-h-screen bg-gradient-to-b from-teal-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Encabezado con imagen y título -->
      <div class="bg-blue-600 py-6 relative">
        <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
          <PawPrint class="w-full h-full" fill="white"/>
        </div>
        <div class="flex justify-center mb-3">
          <div class="bg-white p-2 rounded-full shadow-md">
            <Smile class="w-10 h-10 text-blue-600"/>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-center text-white">Registra a tu Mascota</h1>
        <p class="text-center text-blue-100 mt-1">Agreguemos información sobre tu compañero</p>
      </div>

      <!-- Formulario -->
      <div class="p-6">
        <form @submit.prevent="handleRegisterPet" class="space-y-4">
          <!-- Mensaje de error -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md flex items-start">
            <Info class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
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
                  <Info class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nombre"
                  v-model="petData.nombre"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
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
                  <PawPrint class="h-5 w-5 text-gray-400"/>
                </div>
                <select
                  id="especie"
                  v-model="petData.id_especie"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                  <Tags class="h-5 w-5 text-gray-400"/>
                </div>
                <select
                  id="raza"
                  v-model="petData.id_raza"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                  <CalendarMinus2 class="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  id="fecha_nacimiento"
                  v-model="petData.fecha_nacimiento"
                  type="date"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                  <User class="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="sexo"
                  v-model="petData.sexo"
                  required
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                <Text class="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="descripcion"
                v-model="petData.descripcion"
                rows="3"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="Color, tamaño, comportamiento, etc."
              ></textarea>
            </div>
          </div>

          <!-- Sección de foto de mascota -->
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors duration-200">
            <div class="space-y-2">
              <ImageUp class="mx-auto h-12 w-12 text-gray-400"/>
              <div class="flex text-sm text-gray-600 justify-center">
                <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
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
              class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver
            </button>
            
            <button 
              type="submit" 
              class="flex-1 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              :disabled="isLoading"
            >
              <span v-if="!isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <Save class="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
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
import { PawPrint, Smile, Info, Tags, CalendarMinus2, User, Text, ImageUp, Save } from 'lucide-vue-next'

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