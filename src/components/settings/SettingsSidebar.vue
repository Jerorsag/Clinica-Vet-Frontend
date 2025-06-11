<!-- src/components/settings/SettingsSidebar.vue -->
<template>
  <nav class="bg-white rounded-lg shadow">
    <div class="p-4">
      <h2 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
        Paneles de Control
      </h2>
      
      <ul class="space-y-2">
        <!-- Panel Administrativo -->
        <li>
          <button
            @click="selectSection('admin')"
            :class="[
              'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
              currentSection === 'admin'
                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
            ]"
          >
            <BarChart3 class="h-5 w-5 mr-3" />
            <div class="flex-1 text-left">
              <p class="font-medium">Panel Administrativo</p>
              <p class="text-xs text-gray-500">Gestión general del sistema</p>
            </div>
            <div class="w-2 h-2 bg-green-400 rounded-full"></div>
          </button>
        </li>

        <!-- Panel Veterinario -->
        <li>
          <button
            @click="selectSection('veterinarian')"
            :class="[
              'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
              currentSection === 'veterinarian'
                ? 'bg-green-100 text-green-700 border-l-4 border-green-700'
                : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
            ]"
          >
            <Stethoscope class="h-5 w-5 mr-3" />
            <div class="flex-1 text-left">
              <p class="font-medium">Panel Veterinario</p>
              <p class="text-xs text-gray-500">Herramientas profesionales</p>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              3
            </span>
          </button>
        </li>
      </ul>

      <!-- Separador -->
      <div class="my-6 border-t border-gray-200"></div>

      <!-- Información del usuario -->
      <div class="bg-gray-50 rounded-lg p-3">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User class="h-4 w-4 text-white" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ getRoleName(userRole) }}</p>
            <p class="text-xs text-gray-500">Acceso completo</p>
          </div>
        </div>
      </div>

      <!-- Estadísticas rápidas -->
      <div class="mt-4 grid grid-cols-2 gap-2">
        <div class="bg-blue-50 rounded p-2 text-center">
          <p class="text-lg font-bold text-blue-600">24</p>
          <p class="text-xs text-blue-600">Usuarios</p>
        </div>
        <div class="bg-green-50 rounded p-2 text-center">
          <p class="text-lg font-bold text-green-600">8</p>
          <p class="text-xs text-green-600">Citas Hoy</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { 
  User, 
  BarChart3, 
  Stethoscope
} from 'lucide-vue-next'

// Props
interface Props {
  currentSection: string
  userRole: 'cliente' | 'veterinario' | 'administrador'
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  sectionChanged: [section: string]
}>()

// Métodos
const selectSection = (sectionId: string) => {
  emit('sectionChanged', sectionId)
}

const getRoleName = (role: string) => {
  const roleNames = {
    'cliente': 'Cliente',
    'veterinario': 'Veterinario',
    'administrador': 'Administrador'
  }
  return roleNames[role] || 'Usuario'
}
</script>