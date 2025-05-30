<!-- src/components/appointments/AppointmentConfirmationModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <!-- Header del modal -->
      <div class="bg-blue-600 px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-white flex items-center">
          <CheckCircle class="h-6 w-6 mr-2" />
          Confirmar tu Cita
        </h2>
        <button 
          @click="$emit('close')"
          class="text-blue-100 hover:text-white"
        >
          <X class="h-6 w-6" />
        </button>
      </div>

      <!-- Contenido principal -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <!-- Resumen visual de la cita -->
        <div class="text-center mb-6">
          <div class="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Calendar class="h-10 w-10 text-blue-600" />
          </div>
          
          <!-- Fecha y hora destacada -->
          <div class="mb-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-1">
              {{ formatDisplayDate(appointmentSummary.date) }}
            </h3>
            <p class="text-lg text-blue-600 font-semibold">
              {{ appointmentSummary.startTime }} - {{ appointmentSummary.endTime }}
            </p>
          </div>
        </div>

        <!-- Detalles de la cita -->
        <div class="space-y-4 mb-6">
          <!-- Información de la mascota -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="bg-blue-100 p-3 rounded-full mr-4">
                <PawPrint class="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ appointmentSummary.pet.nombre }}</h4>
                <p class="text-sm text-gray-600">{{ appointmentSummary.pet.descripcion }}</p>
              </div>
            </div>
          </div>

          <!-- Información del servicio -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <div class="bg-green-100 p-3 rounded-full mr-4">
                <span class="text-2xl">{{ appointmentSummary.service.icon }}</span>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{{ appointmentSummary.service.nombre }}</h4>
                <p class="text-sm text-gray-600">{{ appointmentSummary.service.descripcion }}</p>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-sm text-gray-500">{{ appointmentSummary.service.duracion }} minutos</span>
                  <span class="text-sm font-medium text-green-600">
                    ${{ appointmentSummary.service.precio.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Información del veterinario -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <img 
                :src="appointmentSummary.veterinarian.foto" 
                :alt="appointmentSummary.veterinarian.nombre"
                class="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 class="font-semibold text-gray-900">
                  {{ appointmentSummary.veterinarian.nombre }} {{ appointmentSummary.veterinarian.apellido }}
                </h4>
                <p class="text-sm text-gray-600">{{ appointmentSummary.veterinarian.especialidades.join(', ') }}</p>
                <div class="flex items-center mt-1">
                  <Star class="h-4 w-4 text-yellow-500 mr-1" />
                  <span class="text-sm text-gray-600">{{ appointmentSummary.veterinarian.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Campo de notas opcional -->
        <div class="mb-6">
          <label for="appointment-notes" class="block text-sm font-medium text-gray-700 mb-2">
            ¿Algo importante que debamos saber? (Opcional)
          </label>
          <textarea
            id="appointment-notes"
            v-model="localNotes"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Mi mascota tiene miedo a los ruidos fuertes, necesita medicación especial, etc."
          ></textarea>
        </div>

        <!-- Mensaje de advertencia -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <AlertTriangle class="h-5 w-5 text-yellow-400" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                <strong>Importante:</strong> La cita se confirmará inmediatamente. 
                Recibirás una confirmación por email y un recordatorio 24 horas antes.
              </p>
            </div>
          </div>
        </div>

        <!-- Estado de error si hay problemas -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <AlertCircle class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error al confirmar la cita</h3>
              <p class="text-sm text-red-700 mt-1">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer del modal -->
      <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <button 
          @click="goBack"
          :disabled="isSubmitting"
          class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <ArrowLeft class="h-4 w-4 mr-2 inline" />
          Volver a editar
        </button>
        
        <button 
          @click="confirmAppointment"
          :disabled="isSubmitting"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <template v-if="isSubmitting">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Confirmando cita...
          </template>
          <template v-else>
            <CheckCircle class="h-4 w-4 mr-2" />
            Confirmar Cita
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  CheckCircle, X, Calendar, PawPrint, Star, 
  AlertTriangle, AlertCircle, ArrowLeft 
} from 'lucide-vue-next'
import { useAppointmentBooking } from '../../composables/useAppointmentBooking'

// Props
const props = defineProps<{
  appointmentSummary: {
    service: any
    pet: any
    veterinarian: any
    date: string
    startTime: string
    endTime: string
    notes: string
  }
}>()

// Emits
const emit = defineEmits(['close', 'back', 'success'])

// Composable para submitAppointment
const { submitAppointment } = useAppointmentBooking()

// Estado local
const isSubmitting = ref(false)
const error = ref('')
const localNotes = ref(props.appointmentSummary.notes || '')

// Computed
const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).replace(/^\w/, (c) => c.toUpperCase())
}

// Métodos
const goBack = () => {
  emit('back')
}

const { submitAppointmentWithData } = useAppointmentBooking()

const confirmAppointment = async () => {
  isSubmitting.value = true
  error.value = ''
  
  try {
    const appointmentDataToSubmit = {
      ...props.appointmentSummary,
      notes: localNotes.value
    }
    
    const success = await submitAppointmentWithData(appointmentDataToSubmit)
    
    if (success) {
      localStorage.setItem('lastAppointment', JSON.stringify(appointmentDataToSubmit))
      emit('success', appointmentDataToSubmit)
    } else {
      error.value = 'No se pudo confirmar la cita. Por favor, intenta nuevamente.'
    }
  } catch (err) {
    console.error('Error confirming appointment:', err)
    error.value = 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>