<!-- src/views/SettingsView.vue -->
<template>
  <main-layout>
    <!-- Encabezado de configuración -->
    <div class="px-4 sm:px-0 mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">Configuración</h1>
      <p class="mt-1 text-sm text-gray-600">
        Accede a los paneles de administración y herramientas especializadas.
      </p>
    </div>

    <!-- Contenido principal con layout de dos columnas -->
    <div class="px-4 sm:px-0">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar de navegación -->
        <div class="lg:w-64 flex-shrink-0">
          <settings-sidebar 
            :current-section="currentSection"
            :user-role="userRole"
            @section-changed="handleSectionChange"
          />
        </div>

        <!-- Contenido principal -->
        <div class="flex-1 min-w-0">
          <!-- Panel Administrativo -->
          <admin-dashboard 
            v-if="currentSection === 'admin'"
            @navigate-to="handleAdminNavigation"
          />

          <!-- Panel Veterinario -->
          <vet-dashboard 
            v-else-if="currentSection === 'veterinarian'"
            @navigate-to="handleVetNavigation"
          />

          <!-- Vista por defecto cuando no hay sección seleccionada -->
          <div v-else class="bg-white rounded-lg shadow p-8 text-center">
            <Settings class="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-xl font-medium text-gray-900 mb-2">Panel de Configuración</h3>
            <p class="text-gray-600 mb-6">
              Selecciona una opción del menú lateral para comenzar
            </p>
            
            <!-- Botones de acceso directo -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <button 
                @click="currentSection = 'admin'"
                class="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BarChart3 class="h-5 w-5 mr-2" />
                Panel Admin
              </button>
              
              <button 
                @click="currentSection = 'veterinarian'"
                class="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Stethoscope class="h-5 w-5 mr-2" />
                Panel Veterinario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notificación de éxito -->
    <div v-if="showSuccessMessage" class="fixed bottom-4 right-4 z-50">
      <div class="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center">
        <CheckCircle class="h-5 w-5 mr-2" />
        {{ successMessage }}
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Settings, CheckCircle, BarChart3, Stethoscope } from 'lucide-vue-next'
import MainLayout from '../layouts/MainLayout.vue'
import SettingsSidebar from '../components/settings/SettingsSidebar.vue'
import AdminDashboard from '../components/settings/admin/AdminDashboard.vue'
import VetDashboard from '../components/settings/veterinarian/VetDashboard.vue'

// Router
const route = useRoute()
const router = useRouter()

// Función de notificación del layout
const showNotification = inject('showNotification')

// Estado local
const currentSection = ref('')
const showSuccessMessage = ref(false)
const successMessage = ref('')

// Para efectos de demostración, siempre será administrador
// (puedes cambiar esto para probar diferentes roles)
const userRole = ref<'cliente' | 'veterinario' | 'administrador'>('administrador')

// Métodos de manejo de eventos
const handleSectionChange = (section: string) => {
  currentSection.value = section
  // Actualizar URL sin recargar la página
  router.push({ name: 'settings', query: { section } })
}

const handleAdminNavigation = (section: string) => {
  console.log('Navegando a sección admin:', section)
  showSuccessNotification(`Función administrativa: ${section}`)
}

const handleVetNavigation = (section: string) => {
  console.log('Navegando a sección veterinario:', section)
  showSuccessNotification(`Función veterinaria: ${section}`)
}

const showSuccessNotification = (message: string) => {
  successMessage.value = message
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

// Watcher para cambios en la URL
watch(() => route.query.section, (newSection) => {
  if (newSection && typeof newSection === 'string') {
    currentSection.value = newSection
  }
}, { immediate: true })

// Inicialización
onMounted(async () => {
  // Establecer sección inicial desde query params
  const sectionFromQuery = route.query.section
  if (sectionFromQuery && typeof sectionFromQuery === 'string') {
    currentSection.value = sectionFromQuery
  }
  
  // Si no hay sección en la URL, empezar con una vista vacía
  // El usuario puede seleccionar desde el sidebar o los botones
})
</script>