<!-- src/components/appointments/VeterinarianSelector.vue -->
<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Veterinario preferido
    </label>
    <div class="space-y-2">
      <!-- Opción "Sin preferencia" -->
      <button
        @click="$emit('select', null)"
        :class="[
          'w-full p-3 text-left border-2 rounded-lg transition-all',
          selectedVeterinarian === null
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        ]"
      >
        <div class="flex items-center">
          <div class="bg-gray-100 p-2 rounded-full mr-3">
            <Users class="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div class="font-medium text-gray-900">Sin preferencia</div>
            <div class="text-sm text-gray-500">Mostrar todos disponibles</div>
          </div>
        </div>
      </button>
      
      <!-- Veterinarios disponibles -->
      <button
        v-for="vet in availableVeterinarians"
        :key="vet.id"
        @click="$emit('select', vet)"
        :class="[
          'w-full p-3 text-left border-2 rounded-lg transition-all',
          selectedVeterinarian?.id === vet.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        ]"
      >
        <div class="flex items-center">
          <img 
            :src="vet.foto" 
            :alt="vet.nombre"
            class="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <div class="font-medium text-gray-900">{{ vet.nombre }} {{ vet.apellido }}</div>
            <div class="text-sm text-gray-500">{{ vet.especialidades.join(', ') }}</div>
            <div class="flex items-center text-xs text-yellow-600">
              <Star class="h-3 w-3 mr-1 fill-current" />
              {{ vet.rating }}
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Users, Star } from 'lucide-vue-next'
import type { Veterinario } from '../../composables/useAppointmentBooking'

// Props
defineProps<{
  availableVeterinarians: Veterinario[]
  selectedVeterinarian: Veterinario | null
}>()

// Emits
defineEmits<{
  (e: 'select', veterinarian: Veterinario | null): void
}>()
</script>