<!-- src/components/appointments/WeeklyCalendar.vue -->
<template>
  <div class="bg-white">
    <!-- Navegación de semana -->
    <div class="flex justify-between items-center mb-4">
      <button 
        @click="previousWeek"
        class="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
        :disabled="!canGoPrevious"
      >
        <ChevronLeft class="h-5 w-5 mr-1" />
        Anterior
      </button>
      
      <h3 class="text-lg font-medium text-gray-900">
        {{ formatWeekRange(currentWeekStart) }}
      </h3>
      
      <button 
        @click="nextWeek"
        class="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
        :disabled="!canGoNext"
      >
        Siguiente
        <ChevronRight class="h-5 w-5 ml-1" />
      </button>
    </div>

    <!-- Calendario semanal -->
    <div class="border border-gray-200 rounded-lg overflow-hidden">
      <!-- Encabezados de días -->
      <div class="grid grid-cols-7 bg-gray-50">
        <div 
          v-for="day in weekDays" 
          :key="day.date"
          :class="[
            'px-3 py-4 text-center border-r border-gray-200 last:border-r-0',
            getDayHeaderClass(day)
          ]"
        >
          <div class="font-medium text-gray-900">{{ day.name }}</div>
          <div class="text-sm text-gray-500">{{ day.dayNumber }}</div>
          <div class="text-xs text-gray-400">{{ day.month }}</div>
          <!-- Indicador de disponibilidad -->
          <div class="mt-1 flex justify-center">
            <div :class="getAvailabilityIndicator(day.date)" class="w-2 h-2 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoadingSlots" class="grid grid-cols-7 min-h-[300px]">
        <div 
          v-for="i in 7" 
          :key="i"
          class="border-r border-gray-200 last:border-r-0 p-2 flex items-center justify-center"
        >
          <div class="animate-pulse text-gray-400">
            <Calendar class="h-6 w-6" />
          </div>
        </div>
      </div>

      <!-- Horarios disponibles -->
      <div v-else class="grid grid-cols-7 min-h-[300px]">
        <div 
          v-for="day in weekDays" 
          :key="day.date"
          class="border-r border-gray-200 last:border-r-0 p-2"
        >
          <!-- Día sin servicio (domingo o día pasado) -->
          <div v-if="day.isWeekend || day.isPast" class="h-full flex items-center justify-center text-gray-400">
            <div class="text-center">
              <Clock class="h-6 w-6 mx-auto mb-2" />
              <span class="text-xs">{{ day.isWeekend ? 'Sin servicio' : 'Día pasado' }}</span>
            </div>
          </div>
          
          <!-- Horarios disponibles -->
          <div v-else class="space-y-1 max-h-[250px] overflow-y-auto">
            <button
              v-for="slot in getAvailableSlots(day.date)"
              :key="`${day.date}-${slot.inicio}`"
              @click="selectSlot(day.date, slot.inicio)"
              :disabled="!slot.disponible"
              :class="[
                'w-full text-xs px-2 py-1 rounded transition-all font-medium',
                !slot.disponible 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  : selectedDate === day.date && selectedTime === slot.inicio
                    ? 'bg-blue-600 text-white shadow-md'
                    : getSlotClasses(slot.ocupacion)
              ]"
            >
              {{ slot.inicio }}
            </button>
            
            <!-- Mensaje si no hay horarios -->
            <div v-if="getAvailableSlots(day.date).length === 0" class="text-center py-4">
              <span class="text-xs text-gray-400">Sin horarios disponibles</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leyenda -->
    <div class="mt-4 flex justify-center space-x-4 text-xs">
      <div class="flex items-center">
        <div class="w-3 h-3 bg-green-200 border border-green-400 rounded mr-2"></div>
        <span class="text-gray-600">Alta disponibilidad</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-yellow-200 border border-yellow-400 rounded mr-2"></div>
        <span class="text-gray-600">Disponibilidad media</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-red-200 border border-red-400 rounded mr-2"></div>
        <span class="text-gray-600">Muy ocupado</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-gray-300 border border-gray-400 rounded mr-2"></div>
        <span class="text-gray-600">No disponible</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-vue-next'
import { appointmentService } from '../../services/appointmentService'

// Props
const props = defineProps<{
  veterinarianId: number | null
  serviceDuration: number
  loading: boolean
  selectedDate: string
  selectedTime: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'slot-selected', date: string, time: string): void
}>()

// Estado local
const currentWeekStart = ref(getStartOfWeek(new Date()))
const weeklyAvailability = ref<any[]>([])
const isLoadingSlots = ref(false)

// Computed
const weekDays = computed(() => {
  const days = []
  const startDate = new Date(currentWeekStart.value)
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const isToday = isDateToday(date)
    const isPast = isDatePast(date)
    const isWeekend = date.getDay() === 0 // Domingo
    
    days.push({
      date: formatDate(date),
      name: formatDayName(date),
      dayNumber: date.getDate(),
      month: formatMonth(date),
      isToday,
      isPast,
      isWeekend
    })
  }
  
  return days
})

const canGoPrevious = computed(() => {
  const current = new Date(currentWeekStart.value)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return current >= today
})

const canGoNext = computed(() => {
  const current = new Date(currentWeekStart.value)
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  return current <= maxDate
})

// Métodos
function getStartOfWeek(date: Date): string {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Lunes como primer día
  d.setDate(diff)
  return formatDate(d)
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function formatDayName(date: Date): string {
  return date.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase()
}

function formatMonth(date: Date): string {
  return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()
}

function formatWeekRange(startDate: string): string {
  const start = new Date(startDate)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  
  const startStr = start.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  })
  
  const endStr = end.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  })
  
  return `${startStr} - ${endStr}`
}

function isDateToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

function isDatePast(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

function getDayHeaderClass(day: any): string {
  if (day.isPast || day.isWeekend) return ''
  if (day.isToday) return 'bg-blue-50'
  return ''
}

function getAvailabilityIndicator(date: string): string {
  const slots = getAvailableSlots(date)
  if (slots.length === 0) return 'bg-gray-400'
  
  const availableSlots = slots.filter(slot => slot.disponible)
  const totalSlots = slots.length
  const availablePercentage = (availableSlots.length / totalSlots) * 100
  
  if (availablePercentage >= 70) return 'bg-green-500'
  if (availablePercentage >= 40) return 'bg-yellow-500'
  if (availablePercentage > 0) return 'bg-red-500'
  return 'bg-gray-400'
}

function previousWeek() {
  if (!canGoPrevious.value) return
  
  const current = new Date(currentWeekStart.value)
  current.setDate(current.getDate() - 7)
  currentWeekStart.value = formatDate(current)
}

function nextWeek() {
  if (!canGoNext.value) return
  
  const current = new Date(currentWeekStart.value)
  current.setDate(current.getDate() + 7)
  currentWeekStart.value = formatDate(current)
}

function getAvailableSlots(date: string) {
  const dayData = weeklyAvailability.value.find(day => day.date === date)
  console.log(`📅 Slots for ${date}:`, dayData?.slots || 'No slots found')
  return dayData?.slots || []
}

function getSlotClasses(ocupacion: string): string {
  switch (ocupacion) {
    case 'baja':
      return 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300'
    case 'media':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-300'
    case 'alta':
      return 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-300'
    default:
      return 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
  }
}

function selectSlot(date: string, time: string) {
  emit('slot-selected', date, time)
}

async function loadWeeklyAvailability() {
  console.log('🔍 Cargando disponibilidad...', {
    veterinarianId: props.veterinarianId,
    weekStart: currentWeekStart.value
  })
  
  isLoadingSlots.value = true
  
  try {
    const vetId = props.veterinarianId || 1
    weeklyAvailability.value = await appointmentService.getWeeklyAvailability(
      vetId, 
      currentWeekStart.value
    )
    
    console.log('✅ Disponibilidad cargada:', weeklyAvailability.value)
  } catch (error) {
    console.error('❌ Error loading weekly availability:', error)
    weeklyAvailability.value = []
  } finally {
    isLoadingSlots.value = false
  }
}

// Watchers
watch(() => props.veterinarianId, () => {
  loadWeeklyAvailability()
})

watch(currentWeekStart, () => {
  loadWeeklyAvailability()
})

// Inicialización
onMounted(() => {
  loadWeeklyAvailability()
})
</script>