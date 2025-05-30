<!-- src/views/AppointmentSuccessView.vue -->
<template>
  <main-layout>
    <div class="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl w-full">
        <!-- Icono de éxito y celebración -->
        <div class="text-center mb-8">
          <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle class="h-16 w-16 text-green-600" />
          </div>
          
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            ¡Cita Agendada Exitosamente!
          </h1>
          
          <p class="text-lg text-gray-600 mb-8">
            Tu cita ha sido confirmada. Te esperamos pronto en nuestra clínica.
          </p>
        </div>

        <!-- Resumen de la cita -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <!-- Header de la tarjeta -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <Calendar class="h-6 w-6 mr-2" />
              Detalles de tu Cita
            </h2>
          </div>
          
          <!-- Contenido de la tarjeta -->
          <div class="p-6">
            <!-- Fecha y hora destacada -->
            <div class="bg-blue-50 rounded-lg p-4 mb-6 text-center">
              <div class="text-2xl font-bold text-blue-900 mb-1">
                {{ formatDisplayDate(appointmentDetails.date) }}
              </div>
              <div class="text-lg text-blue-700 font-semibold">
                {{ appointmentDetails.startTime }} - {{ appointmentDetails.endTime }}
              </div>
            </div>

            <!-- Información en grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Información de la mascota -->
              <div class="flex items-start space-x-3">
                <div class="bg-emerald-100 p-2 rounded-full">
                  <PawPrint class="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Mascota</h3>
                  <p class="text-gray-700">{{ appointmentDetails.pet.nombre }}</p>
                  <p class="text-sm text-gray-500">{{ appointmentDetails.pet.descripcion }}</p>
                </div>
              </div>

              <!-- Información del veterinario -->
              <div class="flex items-start space-x-3">
                <div class="bg-blue-100 p-2 rounded-full">
                  <UserCircle class="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Veterinario</h3>
                  <p class="text-gray-700">
                    {{ appointmentDetails.veterinarian.nombre }} {{ appointmentDetails.veterinarian.apellido }}
                  </p>
                  <p class="text-sm text-gray-500">{{ appointmentDetails.veterinarian.especialidades.join(', ') }}</p>
                </div>
              </div>

              <!-- Información del servicio -->
              <div class="flex items-start space-x-3">
                <div class="bg-green-100 p-2 rounded-full">
                  <span class="text-lg">{{ appointmentDetails.service.icon }}</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Servicio</h3>
                  <p class="text-gray-700">{{ appointmentDetails.service.nombre }}</p>
                  <p class="text-sm text-gray-500">{{ appointmentDetails.service.duracion }} minutos</p>
                </div>
              </div>

              <!-- Costo del servicio -->
              <div class="flex items-start space-x-3">
                <div class="bg-yellow-100 p-2 rounded-full">
                  <DollarSign class="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Costo</h3>
                  <p class="text-gray-700 font-semibold">
                    ${{ appointmentDetails.service.precio.toLocaleString() }}
                  </p>
                  <p class="text-sm text-gray-500">Pago en clínica</p>
                </div>
              </div>
            </div>

            <!-- Notas si las hay -->
            <div v-if="appointmentDetails.notes" class="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <FileText class="h-4 w-4 mr-2" />
                Notas especiales
              </h3>
              <p class="text-gray-700">{{ appointmentDetails.notes }}</p>
            </div>
          </div>
        </div>

        <!-- Información de próximos pasos -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 class="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Info class="h-5 w-5 mr-2" />
            ¿Qué sigue ahora?
          </h3>
          
          <div class="space-y-3 text-blue-800">
            <div class="flex items-start">
              <Mail class="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p class="font-medium">Confirmación por email</p>
                <p class="text-sm text-blue-700">Te enviaremos todos los detalles a tu correo electrónico</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <Bell class="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p class="font-medium">Recordatorio</p>
                <p class="text-sm text-blue-700">Recibirás un recordatorio 24 horas antes de tu cita</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <MapPin class="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p class="font-medium">Ubicación</p>
                <p class="text-sm text-blue-700">Calle 6 Norte #14-26, Armenia, Quindío</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones disponibles -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="addToCalendar"
            class="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Calendar class="h-5 w-5 mr-2" />
            Agregar al Calendario
          </button>
          
          <router-link
            to="/profile"
            class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <PawPrint class="h-5 w-5 mr-2" />
            Ver Mis Mascotas
          </router-link>
          
          <router-link
            to="/dashboard"
            class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Home class="h-5 w-5 mr-2" />
            Volver al Dashboard
          </router-link>
        </div>

        <!-- Mensaje adicional -->
        <div class="text-center mt-8">
          <p class="text-gray-600">
            ¿Necesitas hacer cambios? 
            <router-link to="/dashboard" class="text-blue-600 hover:text-blue-800 font-medium">
              Contacta con nosotros
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  CheckCircle, Calendar, PawPrint, UserCircle, DollarSign,
  FileText, Info, Mail, Bell, MapPin, Home
} from 'lucide-vue-next'
import MainLayout from '../layouts/MainLayout.vue'

// Router
const router = useRouter()

// Estado
const appointmentDetails = ref({
  date: '',
  startTime: '',
  endTime: '',
  pet: { nombre: '', descripcion: '' },
  veterinarian: { nombre: '', apellido: '', especialidades: [] },
  service: { nombre: '', icon: '', duracion: 0, precio: 0 },
  notes: ''
})

// Métodos
const formatDisplayDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).replace(/^\w/, (c) => c.toUpperCase())
}

const addToCalendar = () => {
  // Crear evento para calendario
  const startDate = new Date(`${appointmentDetails.value.date}T${appointmentDetails.value.startTime}:00`)
  const endDate = new Date(`${appointmentDetails.value.date}T${appointmentDetails.value.endTime}:00`)
  
  const calendarEvent = {
    title: `Cita Veterinaria - ${appointmentDetails.value.pet.nombre}`,
    start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    description: `Servicio: ${appointmentDetails.value.service.nombre}\\nVeterinario: ${appointmentDetails.value.veterinarian.nombre} ${appointmentDetails.value.veterinarian.apellido}\\nMascota: ${appointmentDetails.value.pet.nombre}`,
    location: 'VetHumboldt - Calle 6 Norte #14-26, Armenia, Quindío'
  }
  
  // Crear URL para Google Calendar
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${calendarEvent.start}/${calendarEvent.end}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`
  
  // Abrir en nueva ventana
  window.open(googleCalendarUrl, '_blank')
}

// Cargar datos al montar (normalmente vendrían de la navegación)
onMounted(() => {
  // En una implementación real, estos datos vendrían del state management
  // o de los parámetros de la ruta. Por ahora usaremos datos de ejemplo
  
  // Intentar obtener datos del localStorage como fallback
  const storedAppointment = localStorage.getItem('lastAppointment')
  if (storedAppointment) {
    try {
      appointmentDetails.value = JSON.parse(storedAppointment)
    } catch (error) {
      console.error('Error parsing stored appointment:', error)
      // Datos de ejemplo si no hay datos almacenados
      appointmentDetails.value = {
        date: '2025-06-01',
        startTime: '10:00',
        endTime: '10:30',
        pet: { 
          nombre: 'Max', 
          descripcion: 'Labrador color chocolate' 
        },
        veterinarian: { 
          nombre: 'Dr. Carlos', 
          apellido: 'García Martínez',
          especialidades: ['Medicina General', 'Cirugía']
        },
        service: { 
          nombre: 'Consulta General', 
          icon: '🩺',
          duracion: 30, 
          precio: 80000 
        },
        notes: ''
      }
    }
  }
})
</script>