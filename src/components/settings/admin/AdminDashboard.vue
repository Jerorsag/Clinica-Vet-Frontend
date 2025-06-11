<!-- src/components/settings/admin/AdminDashboard.vue -->
<template>
  <div class="space-y-6">
    <!-- Header del panel administrativo -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-gray-900 flex items-center">
            <BarChart3 class="h-8 w-8 text-blue-600 mr-3" />
            Panel Administrativo
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            Gestiona usuarios, reportes y configuraciones del sistema
          </p>
        </div>
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <Clock class="h-4 w-4" />
          Última actualización: {{ lastUpdate }}
        </div>
      </div>
    </div>

    <!-- Métricas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total de Usuarios -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Users class="h-8 w-8 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Usuarios</p>
            <p class="text-2xl font-bold text-gray-900">{{ metrics.totalUsers }}</p>
            <p class="text-sm text-green-600">+{{ metrics.newUsersThisMonth }} este mes</p>
          </div>
        </div>
      </div>

      <!-- Citas Programadas -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Calendar class="h-8 w-8 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Citas Programadas</p>
            <p class="text-2xl font-bold text-gray-900">{{ metrics.scheduledAppointments }}</p>
            <p class="text-sm text-blue-600">{{ metrics.todayAppointments }} hoy</p>
          </div>
        </div>
      </div>

      <!-- Ingresos del Mes -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <DollarSign class="h-8 w-8 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Ingresos del Mes</p>
            <p class="text-2xl font-bold text-gray-900">${{ formatCurrency(metrics.monthlyRevenue) }}</p>
            <p class="text-sm text-green-600">+12% vs mes anterior</p>
          </div>
        </div>
      </div>

      <!-- Mascotas Registradas -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <PawPrint class="h-8 w-8 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Mascotas Registradas</p>
            <p class="text-2xl font-bold text-gray-900">{{ metrics.totalPets }}</p>
            <p class="text-sm text-purple-600">{{ metrics.newPetsThisMonth }} nuevas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones principales -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gestión de Usuarios -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <Users class="h-5 w-5 mr-2" />
            Gestión de Usuarios
          </h3>
        </div>
        <div class="p-6 space-y-4">
          <button 
            @click="navigateTo('user-list')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <UserCheck class="h-5 w-5 text-blue-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Ver Todos los Usuarios</p>
                <p class="text-xs text-gray-600">Gestionar propietarios y veterinarios</p>
              </div>
            </div>
            <ChevronRight class="h-5 w-5 text-gray-400" />
          </button>

          <button 
            @click="navigateTo('pending-registrations')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <UserPlus class="h-5 w-5 text-orange-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Registros Pendientes</p>
                <p class="text-xs text-gray-600">Aprobar nuevos usuarios</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                {{ pendingRegistrations }}
              </span>
              <ChevronRight class="h-5 w-5 text-gray-400" />
            </div>
          </button>
        </div>
      </div>

      <!-- Reportes y Análisis -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <FileText class="h-5 w-5 mr-2" />
            Reportes y Análisis
          </h3>
        </div>
        <div class="p-6 space-y-4">
          <button 
            @click="navigateTo('financial-reports')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <TrendingUp class="h-5 w-5 text-green-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Reportes Financieros</p>
                <p class="text-xs text-gray-600">Ingresos, gastos y rentabilidad</p>
              </div>
            </div>
            <ChevronRight class="h-5 w-5 text-gray-400" />
          </button>

          <button 
            @click="navigateTo('appointment-analytics')"
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <BarChart class="h-5 w-5 text-blue-600 mr-3" />
              <div class="text-left">
                <p class="text-sm font-medium text-gray-900">Análisis de Citas</p>
                <p class="text-xs text-gray-600">Ocupación y patrones de reserva</p>
              </div>
            </div>
            <ChevronRight class="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    <!-- Configuración del Sistema -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <Settings class="h-5 w-5 mr-2" />
          Configuración del Sistema
        </h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            @click="navigateTo('clinic-settings')"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Building class="h-6 w-6 text-blue-600 mr-3" />
            <div class="text-left">
              <p class="text-sm font-medium text-gray-900">Datos de la Clínica</p>
              <p class="text-xs text-gray-600">Información básica</p>
            </div>
          </button>

          <button 
            @click="navigateTo('schedule-config')"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Clock class="h-6 w-6 text-green-600 mr-3" />
            <div class="text-left">
              <p class="text-sm font-medium text-gray-900">Horarios</p>
              <p class="text-xs text-gray-600">Configurar disponibilidad</p>
            </div>
          </button>

          <button 
            @click="navigateTo('service-management')"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Package class="h-6 w-6 text-purple-600 mr-3" />
            <div class="text-left">
              <p class="text-sm font-medium text-gray-900">Servicios</p>
              <p class="text-xs text-gray-600">Gestionar servicios</p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Actividad Reciente -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <Activity class="h-5 w-5 mr-2" />
            Actividad Reciente
          </h3>
          <button 
            @click="navigateTo('full-activity-log')"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Ver todo
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm text-gray-900">{{ activity.description }}</p>
              <p class="text-xs text-gray-500">{{ formatTimeAgo(activity.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  BarChart3, 
  Clock, 
  Users, 
  Calendar, 
  DollarSign, 
  PawPrint,
  UserCheck,
  UserPlus,
  ChevronRight,
  FileText,
  TrendingUp,
  BarChart,
  Settings,
  Building,
  Package,
  Activity
} from 'lucide-vue-next'

// Emits
const emit = defineEmits<{
  navigateTo: [section: string]
}>()

// Estado reactivo
const lastUpdate = ref('')
const pendingRegistrations = ref(3)

// Métricas del dashboard
const metrics = ref({
  totalUsers: 245,
  newUsersThisMonth: 18,
  scheduledAppointments: 89,
  todayAppointments: 12,
  monthlyRevenue: 2750000,
  totalPets: 312,
  newPetsThisMonth: 24
})

// Actividad reciente
const recentActivity = ref([
  {
    id: 1,
    description: 'Nuevo usuario registrado: María González',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // hace 30 minutos
  },
  {
    id: 2,
    description: 'Cita agendada para mañana: Max - Vacunación',
    timestamp: new Date(Date.now() - 1000 * 60 * 60) // hace 1 hora
  },
  {
    id: 3,
    description: 'Nuevo veterinario aprobado: Dr. Rodríguez',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // hace 2 horas
  },
  {
    id: 4,
    description: 'Pago procesado: $85.000 - Consulta general',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // hace 4 horas
  }
])

// Métodos
const navigateTo = (section: string) => {
  emit('navigateTo', section)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO').format(amount)
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} minutos`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `hace ${days} ${days === 1 ? 'día' : 'días'}`
  }
}

const updateLastUpdate = () => {
  const now = new Date()
  lastUpdate.value = now.toLocaleTimeString('es-CO', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Inicialización
onMounted(() => {
  updateLastUpdate()
  
  // Actualizar cada minuto
  setInterval(updateLastUpdate, 60000)
})
</script>