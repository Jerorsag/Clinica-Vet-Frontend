<!-- src/components/appointments/AppointmentBookingModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <!-- Header del modal -->
      <div class="bg-blue-600 px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-white flex items-center">
          <CalendarPlus class="h-6 w-6 mr-2" />
          Agendar Nueva Cita
        </h2>
        <button 
          @click="$emit('close')"
          class="text-blue-100 hover:text-white"
        >
          <X class="h-6 w-6" />
        </button>
      </div>

      <!-- Contenido principal -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <!-- Loading state -->
        <div v-if="isLoading && !hasInitialized" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p class="mt-4 text-gray-600">Cargando información...</p>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <AlertCircle class="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-red-900 mb-2">Error al cargar datos</h3>
            <p class="text-red-700 mb-4">{{ error }}</p>
            <button 
              @click="retryInitialization"
              class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        </div>

        <!-- Contenido principal del formulario -->
        <div v-else class="space-y-6">
          <!-- Selectores principales -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Selector de Servicio -->
            <service-selector
              :services="services"
              :selected-service="selectedService"
              @select="selectService"
            />

            <!-- Selector de Mascota -->
            <pet-selector
              :pets="userPets"
              :selected-pet="selectedPet"
              @select="selectPet"
            />

            <!-- Selector de Veterinario -->
            <veterinarian-selector
              :available-veterinarians="availableVeterinarians"
              :selected-veterinarian="selectedVeterinarian"
              @select="selectVeterinarian"
            />
          </div>

          <!-- Calendario semanal -->
          <div v-if="selectedService && selectedPet" class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Selecciona fecha y hora</h3>
            
            <weekly-calendar 
              :veterinarian-id="selectedVeterinarian?.id || null"
              :service-duration="selectedService.duracion"
              :loading="isLoading"
              @slot-selected="handleSlotSelection"
              :selected-date="selectedDate"
              :selected-time="selectedTime"
            />
          </div>

          <!-- Mensaje si faltan selecciones -->
          <div v-else class="border-t pt-6">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <Calendar class="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p class="text-gray-600">
                Selecciona un servicio y una mascota para ver los horarios disponibles
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer del modal -->
      <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div class="flex items-center text-sm text-gray-600">
          <Info class="h-4 w-4 mr-1" />
          Los campos marcados con * son obligatorios
        </div>
        
        <div class="flex space-x-3">
          <button 
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          
          <button 
            @click="proceedToConfirmation"
            :disabled="!canProceedToConfirmation || isLoading"
            :class="[
              'px-6 py-2 rounded-md font-medium transition-colors',
              canProceedToConfirmation && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            <template v-if="isLoading">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verificando...
            </template>
            <template v-else>
              Continuar
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CalendarPlus, X, Calendar, Info, AlertCircle } from 'lucide-vue-next'
import { useAppointmentBooking } from '../../composables/useAppointmentBooking'
import ServiceSelector from './ServiceSelector.vue'
import PetSelector from './PetSelector.vue'
import VeterinarianSelector from './VeterinarianSelector.vue'
import WeeklyCalendar from './WeeklyCalendar.vue'

// Composable
const {
  // Estado
  isLoading,
  error,
  
  // Datos de selección
  selectedService,
  selectedPet,
  selectedVeterinarian,
  selectedDate,
  selectedTime,
  
  // Datos disponibles
  services,
  userPets,
  availableVeterinarians,
  
  // Computed
  canProceedToConfirmation,
  getAppointmentSummary,
  
  // Métodos
  selectService,
  selectPet,
  selectVeterinarian,
  selectDateTime,
  verifySlotAvailability,
  initializeBooking
} = useAppointmentBooking()

// Estado local
const hasInitialized = ref(false)

// Métodos locales
const handleSlotSelection = async (date: string, time: string) => {
  // Si hay un veterinario seleccionado, verificar disponibilidad
  if (selectedVeterinarian.value) {
    const isAvailable = await verifySlotAvailability(
      selectedVeterinarian.value.id, 
      date, 
      time
    )
    
    if (!isAvailable) {
      // Mostrar mensaje de error o actualizar calendario
      return
    }
  }
  
  selectDateTime(date, time)
}

const proceedToConfirmation = () => {
  if (canProceedToConfirmation.value) {
    emit('show-confirmation', getAppointmentSummary.value)
  }
}

const retryInitialization = async () => {
  hasInitialized.value = false
  await initializeBooking()
  hasInitialized.value = true
}

// Emits
const emit = defineEmits(['close', 'success', 'show-confirmation'])

// Inicialización
onMounted(async () => {
  try {
    await initializeBooking()
    hasInitialized.value = true
  } catch (err) {
    console.error('Error initializing appointment booking:', err)
    hasInitialized.value = true
  }
})
</script>