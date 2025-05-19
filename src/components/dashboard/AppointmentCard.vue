<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-emerald-100 rounded-full p-3">
            <Calendar class="h-6 w-6 text-emerald-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ formatDate(appointment.fecha) }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ formatTime(appointment.fecha) }} - {{ appointment.motivo }} - {{ appointment.veterinario.nombre }}
            </p>
            <p class="text-sm font-medium text-emerald-600">
              Para: {{ appointment.mascota.nombre }}
            </p>
          </div>
        </div>
        <div>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Confirmada
          </span>
        </div>
      </div>
      <div class="mt-4 flex justify-end space-x-3">
        <button 
          @click="$emit('reschedule', appointment.id)"
          class="inline-flex items-center px-3 py-2 border border-emerald-600 text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <Clock class="h-4 w-4 mr-1" />
          Reprogramar
        </button>
        <button 
          @click="$emit('cancel', appointment.id)"
          class="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <XCircle class="h-4 w-4 mr-1" />
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Clock, XCircle } from 'lucide-vue-next'

// Props
const props = defineProps({
  appointment: {
    type: Object,
    required: true
  }
})

// Emits
defineEmits(['reschedule', 'cancel'])

// Formatear fecha (10 de junio, 2025)
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('es-ES', options)
}

// Formatear hora (14:30)
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  }
  return date.toLocaleTimeString('es-ES', options)
}
</script>