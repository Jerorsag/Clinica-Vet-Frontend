<!-- src/components/appointments/ServiceSelector.vue -->
<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      ¿Qué servicio necesitas? *
    </label>
    <div class="space-y-2">
      <button
        v-for="service in services"
        :key="service.id"
        @click="$emit('select', service)"
        :class="[
          'w-full p-3 text-left border-2 rounded-lg transition-all',
          selectedService?.id === service.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
        ]"
      >
        <div class="flex items-center">
          <span class="text-2xl mr-3">{{ service.icon }}</span>
          <div>
            <div class="font-medium text-gray-900">{{ service.nombre }}</div>
            <div class="text-sm text-gray-500">{{ service.descripcion }}</div>
            <div class="text-xs text-blue-600 font-medium">
              ${{ service.precio.toLocaleString() }} - {{ service.duracion }}min
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServicioVeterinario } from '../../composables/useAppointmentBooking'

// Props
defineProps<{
  services: ServicioVeterinario[]
  selectedService: ServicioVeterinario | null
}>()

// Emits
defineEmits<{
  (e: 'select', service: ServicioVeterinario): void
}>()
</script>