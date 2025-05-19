<!-- src/components/profile/SecurityTab.vue -->
<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Cambiar Contraseña</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Actualiza tu contraseña para mantener segura tu cuenta</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label for="current_password" class="block text-sm font-medium text-gray-700">
            Contraseña Actual
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="current_password"
              v-model="formData.currentPassword"
              type="password"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label for="new_password" class="block text-sm font-medium text-gray-700">
            Nueva Contraseña
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="new_password"
              v-model="formData.newPassword"
              type="password"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">La contraseña debe tener al menos 8 caracteres.</p>
        </div>

        <div>
          <label for="confirm_password" class="block text-sm font-medium text-gray-700">
            Confirmar Nueva Contraseña
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirm_password"
              v-model="formData.confirmPassword"
              type="password"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
            />
          </div>
        </div>

        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <AlertCircle class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSaving"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <span v-if="isSaving" class="mr-2">
              <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isSaving ? 'Actualizando...' : 'Cambiar Contraseña' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Lock, Key, AlertCircle } from 'lucide-vue-next'

// Props
const props = defineProps<{
  isSaving: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'update', data: { currentPassword: string; newPassword: string; confirmPassword: string }): void
}>()

// Estado local
const error = ref('')
const formData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Métodos
const submitForm = () => {
  // Validar que las contraseñas coincidan
  if (formData.newPassword !== formData.confirmPassword) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  
  // Validar longitud mínima
  if (formData.newPassword.length < 8) {
    error.value = 'La contraseña debe tener al menos 8 caracteres'
    return
  }
  
  // Limpiar error y emitir evento
  error.value = ''
  emit('update', { ...formData })
}
</script>