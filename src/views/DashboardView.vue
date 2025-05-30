<!-- src/views/DashboardView.vue -->
<template>
  <main-layout>
    <!-- Encabezado de bienvenida -->
    <div class="px-4 sm:px-0 mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">Bienvenido, {{ user.nombre }}</h1>
      <p class="mt-1 text-sm text-gray-600">Gestiona la información de tus mascotas y próximas citas.</p>
    </div>

    <!-- Cita actual (si existe) -->
    <div v-if="hasActiveAppointment" class="px-4 sm:px-0 mb-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Tu próxima cita</h2>
      <appointment-card :appointment="activeAppointment" @reschedule="openRescheduleModal" @cancel="openCancelModal" />
    </div>
    <div v-else class="px-4 sm:px-0 mb-8">
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div class="flex">
          <div class="flex-shrink-0">
            <Calendar class="h-5 w-5 text-blue-500" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-800">
              No tienes citas programadas. ¿Quieres agendar una?
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones rápidas -->
    <div class="px-4 sm:px-0">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Acciones rápidas</h2>
      <quick-actions @schedule="openScheduleModal" />
    </div>

    <!-- Mascotas registradas -->
    <div class="px-4 sm:px-0 mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-gray-900">Mis mascotas</h2>
        <router-link to="/profile" class="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          Ver todas
          <ChevronRight class="h-4 w-4 ml-1" />
        </router-link>
      </div>
      <div v-if="pets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="pet in pets.slice(0, 3)" :key="pet.id_paciente" class="bg-white rounded-lg shadow p-4 flex items-center">
          <div class="bg-blue-100 p-3 rounded-full">
            <PawPrint class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">{{ pet.nombre }}</h3>
            <p class="text-sm text-gray-600">{{ getSpeciesName(pet.id_especie) }} - {{ getBreedName(pet.id_raza) }}</p>
          </div>
        </div>
      </div>
      <div v-else class="bg-white rounded-lg shadow p-4 text-center">
        <p class="text-gray-600">Aún no tienes mascotas registradas.</p>
        <router-link to="/profile" class="mt-2 inline-block text-blue-600 hover:text-blue-800">
          Registrar mascota
        </router-link>
      </div>
    </div>

    <!-- Modales (implementar después) -->
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { Calendar, ChevronRight, PawPrint } from 'lucide-vue-next'
import MainLayout from '../layouts/MainLayout.vue'
import AppointmentCard from "../components/dashboard/AppointmentCard.vue"
import QuickActions from "../components/dashboard/QuickActions.vue"
import type { Paciente } from '@/types'

// Estado
const user = ref({
  id_propietario: 1,
  nombre: 'Usuario de Prueba',
  email: 'usuario@example.com'
})
const pets = ref<Paciente[]>([])
const hasActiveAppointment = ref(false)
const activeAppointment = ref(null)

// Función de notificación proporcionada por el layout
const showNotification = inject('showNotification')

// Simulación de especies y razas
const species = [
  { id: 1, nombre: 'Perro' },
  { id: 2, nombre: 'Gato' },
  { id: 3, nombre: 'Ave' },
  { id: 4, nombre: 'Roedor' },
  { id: 5, nombre: 'Reptil' }
]

const breeds = [
  // Perros
  { id: 1, nombre: 'Labrador', id_especie: 1 },
  { id: 2, nombre: 'Pastor Alemán', id_especie: 1 },
  // Gatos
  { id: 6, nombre: 'Persa', id_especie: 2 },
  { id: 7, nombre: 'Siamés', id_especie: 2 },
  // Otros...
]

// Métodos
const getSpeciesName = (speciesId: number | null) => {
  if (!speciesId) return 'Desconocido'
  const found = species.find(s => s.id === speciesId)
  return found ? found.nombre : 'Desconocido'
}

const getBreedName = (breedId: number | null) => {
  if (!breedId) return 'Desconocido'
  const found = breeds.find(b => b.id === breedId)
  return found ? found.nombre : 'Desconocido'
}

// Métodos de gestión de citas (stubs)
const openScheduleModal = () => {
  console.log('Abrir modal para agendar cita')
  showNotification && showNotification('Funcionalidad en desarrollo: Agendar cita')
}

const openRescheduleModal = () => {
  console.log('Abrir modal para reprogramar cita')
  showNotification && showNotification('Funcionalidad en desarrollo: Reprogramar cita')
}

const openCancelModal = () => {
  console.log('Abrir modal para cancelar cita')
  showNotification && showNotification('Funcionalidad en desarrollo: Cancelar cita', 'error')
}

// Carga de datos simulada
onMounted(async () => {
  // Obtener usuario del localStorage (podría venir del layout, pero lo mantenemos por ahora)
  const userJson = localStorage.getItem('user')
  if (userJson) {
    try {
      user.value = JSON.parse(userJson)
    } catch (err) {
      console.error('Error parsing user data:', err)
    }
  }

  // Simulamos cargar las mascotas del usuario
  setTimeout(() => {
    pets.value = [
      {
        id_paciente: 1,
        nombre: 'Max',
        id_propietario: user.value.id_propietario,
        id_especie: 1,
        id_raza: 1,
        fecha_nacimiento: '2019-05-15',
        sexo: 'M',
        descripcion: 'Labrador color chocolate'
      },
      {
        id_paciente: 2,
        nombre: 'Luna',
        id_propietario: user.value.id_propietario,
        id_especie: 2,
        id_raza: 6,
        fecha_nacimiento: '2020-03-10',
        sexo: 'H',
        descripcion: 'Gata persa blanca'
      }
    ]

    // Simulamos una cita activa
    hasActiveAppointment.value = true
    activeAppointment.value = {
      id: 1,
      fecha: '2025-06-01T14:30:00',
      motivo: 'Vacunación',
      mascota: {
        id: 1,
        nombre: 'Max'
      },
      veterinario: {
        id: 1,
        nombre: 'Dr. García'
      }
    }
  }, 500)
})
</script>