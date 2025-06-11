<!-- src/components/settings/veterinarian/VetDashboard.vue -->
<template>
  <div class="space-y-6">
    <!-- Header del panel veterinario -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-gray-900 flex items-center">
            <Stethoscope class="h-8 w-8 text-green-600 mr-3" />
            Panel Veterinario
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            Gestiona tus consultas, pacientes y agenda profesional
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right text-sm text-gray-500">
            <p>{{ currentDate }}</p>
            <p>{{ currentTime }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <User class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Resumen del día -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Consultas de hoy -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Calendar class="h-8 w-8 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Consultas Hoy</p>
            <p class="text-2xl font-bold text-gray-900">{{ todayStats.appointments }}</p>
            <p class="text-sm text-blue-600">{{ todayStats.completed }} completadas</p>
          </div>
        </div>
      </div>

      <!-- Próxima cita -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Clock class="h-8 w-8 text-orange-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Próxima Cita</p>
            <p class="text-xl font-bold text-gray-900">{{ nextAppointment.time }}</p>
            <p class="text-sm text-orange-600">{{ nextAppointment.pet }}</p>
          </div>
        </div>
      </div>

      <!-- Pacientes atendidos -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <PawPrint class="h-8 w-8 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pacientes Este Mes</p>
            <p class="text-2xl font-bold text-gray-900">{{ monthlyStats.patients }}</p>
            <p class="text-sm text-purple-600">+{{ monthlyStats.newPatients }} nuevos</p>
          </div>
        </div>
      </div>

      <!-- Rating promedio -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Star class="h-8 w-8 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Calificación</p>
            <p class="text-2xl font-bold text-gray-900">{{ rating.average }}</p>
            <div class="flex items-center">
              <div class="flex items-center">
                <Star v-for="star in 5" :key="star" 
                  :class="star <= Math.floor(rating.average) ? 'text-yellow-400' : 'text-gray-300'" 
                  class="h-3 w-3 fill-current"
                />
              </div>
              <span class="text-xs text-gray-500 ml-1">({{ rating.reviews }} reseñas)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Agenda del día y acciones rápidas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Agenda del día -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900 flex items-center">
              <CalendarDays class="h-5 w-5 mr-2" />
              Agenda de Hoy
            </h3>
            <button 
              @click="navigateTo('full-schedule')"
              class="text-sm text-blue-600 hover:text-blue-800"
            >
              Ver agenda completa
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="appointment in todayAppointments" :key="appointment.id" 
                 class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                 @click="navigateTo(`appointment-${appointment.id}`)">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PawPrint class="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div class="ml-4 flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">{{ appointment.petName }}</p>
                  <span :class="getStatusClass(appointment.status)" 
                        class="text-xs font-medium px-2 py-1 rounded-full">
                    {{ appointment.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600">{{ appointment.ownerName }}</p>
                <p class="text-xs text-gray-500">{{ appointment.time }} - {{ appointment.service }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <Zap class="h-5 w-5 mr-2" />
            Acciones Rápidas
          </h3>
        </div>
        <div class="p-6 space-y-4">
          <button 
            @click="navigateTo('create-prescription')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <FileText class="h-5 w-5 text-green-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Crear Fórmula Médica</p>
                <p class="text-xs text-gray-600">Generar nueva prescripción</p>
              </div>
            </div>
            <ChevronRight class="h-5 w-5 text-gray-400" />
          </button>

          <button 
            @click="navigateTo('patient-search')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <Search class="h-5 w-5 text-blue-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Buscar Paciente</p>
                <p class="text-xs text-gray-600">Acceder a historial clínico</p>
              </div>
            </div>
            <ChevronRight class="h-5 w-5 text-gray-400" />
          </button>

          <button 
            @click="navigateTo('emergency-contact')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <Phone class="h-5 w-5 text-red-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Contacto de Emergencia</p>
                <p class="text-xs text-gray-600">Números importantes</p>
              </div>
            </div>
            <ChevronRight class="h-5 w-5 text-gray-400" />
          </button>

          <button 
            @click="navigateTo('my-statistics')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <BarChart class="h-5 w-5 text-purple-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Mis Estadísticas</p>
                <p class="text-xs text-gray-600">Rendimiento y métricas</p>
              </div>
            </div>
            <ChevronRight class="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    <!-- Recordatorios y notas -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <Bell class="h-5 w-5 mr-2" />
            Recordatorios y Notas
          </h3>
          <button 
            @click="navigateTo('add-reminder')"
            class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <Plus class="h-4 w-4 mr-1" />
            Agregar
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="reminder in reminders" :key="reminder.id" 
               class="flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex-shrink-0">
              <AlertCircle class="h-5 w-5 text-yellow-600 mt-0.5" />
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-yellow-800">{{ reminder.title }}</p>
              <p class="text-sm text-yellow-700">{{ reminder.description }}</p>
              <p class="text-xs text-yellow-600 mt-1">{{ formatDate(reminder.date) }}</p>
            </div>
            <button @click="removeReminder(reminder.id)" class="flex-shrink-0 text-yellow-600 hover:text-yellow-800">
              <X class="h-4 w-4" />
            </button>
          </div>
          
          <!-- Estado vacío -->
          <div v-if="reminders.length === 0" class="text-center py-8">
            <Bell class="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p class="text-sm text-gray-600">No tienes recordatorios pendientes</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pacientes recientes -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <Heart class="h-5 w-5 mr-2" />
            Pacientes Recientes
          </h3>
          <button 
            @click="navigateTo('all-patients')"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Ver todos
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="patient in recentPatients" :key="patient.id" 
               class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
               @click="navigateTo(`patient-${patient.id}`)">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <PawPrint class="h-5 w-5 text-purple-600" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ patient.name }}</p>
                <p class="text-xs text-gray-600">{{ patient.species }} - {{ patient.owner }}</p>
                <p class="text-xs text-gray-500">Última visita: {{ formatDate(patient.lastVisit) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  Stethoscope, 
  User, 
  Calendar, 
  Clock, 
  PawPrint, 
  Star,
  CalendarDays,
  Zap,
  FileText,
  Search,
  Phone,
  BarChart,
  ChevronRight,
  Bell,
  Plus,
  AlertCircle,
  X,
  Heart
} from 'lucide-vue-next'

// Emits
const emit = defineEmits<{
  navigateTo: [section: string]
}>()

// Estado reactivo
const currentDate = ref('')
const currentTime = ref('')
let timeInterval: number | null = null

// Estadísticas
const todayStats = ref({
  appointments: 8,
  completed: 5
})

const monthlyStats = ref({
  patients: 156,
  newPatients: 23
})

const rating = ref({
  average: 4.8,
  reviews: 127
})

const nextAppointment = ref({
  time: '14:30',
  pet: 'Luna - Gato'
})

// Citas de hoy
const todayAppointments = ref([
  {
    id: 1,
    time: '09:00',
    petName: 'Max',
    ownerName: 'Carlos Pérez',
    service: 'Consulta general',
    status: 'Completada'
  },
  {
    id: 2,
    time: '10:30',
    petName: 'Bella',
    ownerName: 'Ana García',
    service: 'Vacunación',
    status: 'Completada'
  },
  {
    id: 3,
    time: '14:30',
    petName: 'Luna',
    ownerName: 'María Rodríguez',
    service: 'Control general',
    status: 'Programada'
  },
  {
    id: 4,
    time: '16:00',
    petName: 'Rocky',
    ownerName: 'José Martínez',
    service: 'Cirugía menor',
    status: 'Programada'
  }
])

// Recordatorios
const reminders = ref([
  {
    id: 1,
    title: 'Seguimiento post-operatorio',
    description: 'Revisar evolución de Max después de la cirugía',
    date: new Date('2025-06-11')
  },
  {
    id: 2,
    title: 'Recordar vacunación',
    description: 'Bella necesita refuerzo de vacuna antirrábica',
    date: new Date('2025-06-15')
  },
  {
    id: 3,
    title: 'Consulta de control',
    description: 'Agendar cita de seguimiento para Luna en 2 semanas',
    date: new Date('2025-06-25')
  }
])

// Pacientes recientes
const recentPatients = ref([
  {
    id: 1,
    name: 'Max',
    species: 'Perro',
    owner: 'Carlos Pérez',
    lastVisit: new Date('2025-06-09')
  },
  {
    id: 2,
    name: 'Bella',
    species: 'Gato',
    owner: 'Ana García',
    lastVisit: new Date('2025-06-08')
  },
  {
    id: 3,
    name: 'Charlie',
    species: 'Perro',
    owner: 'Luis Fernández',
    lastVisit: new Date('2025-06-07')
  },
  {
    id: 4,
    name: 'Mimi',
    species: 'Gato',
    owner: 'Carmen Silva',
    lastVisit: new Date('2025-06-06')
  },
  {
    id: 5,
    name: 'Rex',
    species: 'Perro',
    owner: 'Pedro Morales',
    lastVisit: new Date('2025-06-05')
  },
  {
    id: 6,
    name: 'Nala',
    species: 'Gato',
    owner: 'Sofía Herrera',
    lastVisit: new Date('2025-06-04')
  }
])

// Métodos
const navigateTo = (section: string) => {
  emit('navigateTo', section)
}

const getStatusClass = (status: string) => {
  const statusClasses = {
    'Completada': 'bg-green-100 text-green-800',
    'Programada': 'bg-blue-100 text-blue-800',
    'En progreso': 'bg-yellow-100 text-yellow-800',
    'Cancelada': 'bg-red-100 text-red-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatDateTime = () => {
  const now = new Date()
  
  currentDate.value = now.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  })
  
  currentTime.value = now.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const removeReminder = (reminderId: number) => {
  const index = reminders.value.findIndex(reminder => reminder.id === reminderId)
  if (index > -1) {
    reminders.value.splice(index, 1)
  }
}

// Inicialización
onMounted(() => {
  formatDateTime()
  
  // Actualizar fecha y hora cada minuto
  timeInterval = setInterval(formatDateTime, 60000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>