<template>
  <div>
    <div v-if="pets.length > 0" class="space-y-4">
      <div 
        v-for="pet in pets" 
        :key="pet.id_paciente" 
        class="bg-white overflow-hidden shadow rounded-lg"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="bg-blue-100 p-3 rounded-full">
                  <component :is="getPetIcon(pet.id_especie)" class="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">{{ pet.nombre }}</h3>
                <div class="mt-1 text-sm text-gray-500 space-y-1">
                  <p><span class="font-medium">Especie:</span> {{ getSpeciesName(pet.id_especie) }}</p>
                  <p><span class="font-medium">Raza:</span> {{ getBreedName(pet.id_raza) }}</p>
                  <p><span class="font-medium">Sexo:</span> {{ pet.sexo === 'M' ? 'Macho' : 'Hembra' }}</p>
                  <p><span class="font-medium">Fecha de nacimiento:</span> {{ formatDate(pet.fecha_nacimiento) }}</p>
                </div>
                <p v-if="pet.descripcion" class="mt-2 text-sm text-gray-700">
                  {{ pet.descripcion }}
                </p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="$emit('edit', pet)"
                class="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit class="h-4 w-4" />
                <span class="sr-only">Editar</span>
              </button>
              <button 
                @click="$emit('delete', pet)"
                class="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash class="h-4 w-4 text-red-500" />
                <span class="sr-only">Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-white shadow rounded-lg p-6 text-center">
      <div class="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
        <PawPrint class="h-6 w-6 text-gray-400" />
      </div>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No tienes mascotas registradas</h3>
      <p class="mt-1 text-sm text-gray-500">
        Comienza registrando tu primera mascota.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PawPrint, Cat, Dog, Bird, Rabbit, Fish, Edit, Trash } from 'lucide-vue-next'
import type { Paciente } from '@/types'

// Props
const props = defineProps({
  pets: {
    type: Array as () => Paciente[],
    required: true
  },
  species: {
    type: Array as () => { id: number, nombre: string }[],
    required: true
  },
  breeds: {
    type: Array as () => { id: number, nombre: string, id_especie: number }[],
    required: true
  }
})

// Emits
defineEmits(['edit', 'delete'])

// Obtener nombre de especie
const getSpeciesName = (speciesId: number | null) => {
  if (!speciesId) return 'Desconocido'
  const found = props.species.find(s => s.id === speciesId)
  return found ? found.nombre : 'Desconocido'
}

// Obtener nombre de raza
const getBreedName = (breedId: number | null) => {
  if (!breedId) return 'Desconocido'
  const found = props.breeds.find(b => b.id === breedId)
  return found ? found.nombre : 'Desconocido'
}

// Obtener ícono según la especie
const getPetIcon = (speciesId: number | null) => {
  if (!speciesId) return PawPrint
  switch (speciesId) {
    case 1: return Dog
    case 2: return Cat
    case 3: return Bird
    case 4: return Rabbit
    case 5: return Fish
    default: return PawPrint
  }
}

// Formatear fecha
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Desconocida'
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>