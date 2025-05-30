<!-- src/components/appointments/PetSelector.vue -->
<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      ¿Para qué mascota? *
    </label>
    <div class="space-y-2">
      <button
        v-for="pet in pets"
        :key="pet.id_paciente"
        @click="$emit('select', pet)"
        :class="[
          'w-full p-3 text-left border-2 rounded-lg transition-all',
          selectedPet?.id_paciente === pet.id_paciente
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        ]"
      >
        <div class="flex items-center">
          <div class="bg-blue-100 p-2 rounded-full mr-3">
            <PawPrint class="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div class="font-medium text-gray-900">{{ pet.nombre }}</div>
            <div class="text-sm text-gray-500">{{ pet.descripcion }}</div>
          </div>
        </div>
      </button>
      
      <!-- Opción para agregar nueva mascota -->
      <router-link 
        to="/profile"
        class="w-full p-3 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-all flex items-center text-gray-600 hover:text-blue-600"
      >
        <Plus class="h-5 w-5 mr-2" />
        Registrar nueva mascota
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PawPrint, Plus } from 'lucide-vue-next'
import type { Paciente } from '../../composables/useAppointmentBooking'

// Props
defineProps<{
  pets: Paciente[]
  selectedPet: Paciente | null
}>()

// Emits
defineEmits<{
  (e: 'select', pet: Paciente): void
}>()
</script>