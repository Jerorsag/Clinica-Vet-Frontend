<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-6 gap-6">
          <!-- Nombre de la mascota -->
          <div class="col-span-6 sm:col-span-4">
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre de la mascota</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="nombre"
                v-model="formData.nombre"
                type="text"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Ej. Max"
              />
            </div>
          </div>
          
          <!-- Especie -->
          <div class="col-span-6 sm:col-span-3">
            <label for="especie" class="block text-sm font-medium text-gray-700">Especie</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PawPrint class="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="especie"
                v-model="formData.id_especie"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                @change="formData.id_raza = null"
              >
                <option value="" disabled>Seleccionar</option>
                <option v-for="specie in species" :key="specie.id" :value="specie.id">
                  {{ specie.nombre }}
                </option>
              </select>
            </div>
          </div>
          
          <!-- Raza -->
          <div class="col-span-6 sm:col-span-3">
            <label for="raza" class="block text-sm font-medium text-gray-700">Raza</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tags class="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="raza"
                v-model="formData.id_raza"
                required
                :disabled="!formData.id_especie"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="" disabled>{{ formData.id_especie ? 'Seleccionar' : 'Primero selecciona una especie' }}</option>
                <option v-for="breed in filteredBreeds" :key="breed.id" :value="breed.id">
                  {{ breed.nombre }}
                </option>
              </select>
            </div>
          </div>
          
          <!-- Fecha de nacimiento -->
          <div class="col-span-6 sm:col-span-3">
            <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fecha_nacimiento"
                v-model="formData.fecha_nacimiento"
                type="date"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>
          
          <!-- Sexo -->
          <div class="col-span-6 sm:col-span-3">
            <label for="sexo" class="block text-sm font-medium text-gray-700">Sexo</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircle class="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="sexo"
                v-model="formData.sexo"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="" disabled>Seleccionar</option>
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
              </select>
            </div>
          </div>
          
          <!-- Descripción -->
          <div class="col-span-6">
            <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción / Características especiales</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText class="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="descripcion"
                v-model="formData.descripcion"
                rows="3"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Color, tamaño, comportamiento, etc."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div class="pt-5">
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('cancel')"
              class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span v-if="isSaving" class="mr-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isSaving ? 'Guardando...' : (formData.id_paciente ? 'Actualizar' : 'Guardar') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Tag, PawPrint, Tags, Calendar, UserCircle, FileText } from 'lucide-vue-next'
import type { Paciente } from '@/types'

// Props
const props = defineProps({
  pet: {
    type: Object as () => Paciente | null,
    default: null
  },
  species: {
    type: Array as () => { id: number, nombre: string }[],
    required: true
  },
  breeds: {
    type: Array as () => { id: number, nombre: string, id_especie: number }[],
    required: true
  },
  isSaving: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['save', 'cancel'])

// Formulario
const formData = ref<Paciente>({
  nombre: '',
  id_propietario: 0, // Se debe asignar después
  id_especie: null,
  id_raza: null,
  fecha_nacimiento: '',
  sexo: '',
  descripcion: ''
})

// Razas filtradas según la especie seleccionada
const filteredBreeds = computed(() => {
  if (!formData.value.id_especie) return []
  return props.breeds.filter(breed => breed.id_especie === formData.value.id_especie)
})

// Método para enviar el formulario
const submitForm = () => {
  emit('save', { ...formData.value })
}

// Inicializar datos del formulario
onMounted(() => {
  if (props.pet) {
    // Editar mascota existente
    formData.value = { ...props.pet }
  } else {
    // Nueva mascota, reset
    formData.value = {
      nombre: '',
      id_propietario: 0,
      id_especie: null,
      id_raza: null,
      fecha_nacimiento: '',
      sexo: '',
      descripcion: ''
    }
  }
})
</script>