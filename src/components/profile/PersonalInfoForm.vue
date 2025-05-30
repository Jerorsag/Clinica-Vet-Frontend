<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Información Personal</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Mantén actualizados tus datos de contacto</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-6 gap-6">
          <!-- Nombre Completo -->
          <div class="col-span-6 sm:col-span-4">
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="nombre"
                v-model="formData.nombre"
                type="text"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <!-- Cédula -->
          <div class="col-span-6 sm:col-span-3">
            <label for="cedula" class="block text-sm font-medium text-gray-700">Cédula</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="cedula"
                v-model="formData.cedula"
                type="text"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <!-- Teléfono -->
          <div class="col-span-6 sm:col-span-3">
            <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="telefono"
                v-model="formData.telefono"
                type="tel"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <!-- Dirección -->
          <div class="col-span-6">
            <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="direccion"
                v-model="formData.direccion"
                type="text"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="col-span-6 sm:col-span-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Tu correo electrónico se usará para notificaciones y recuperación de cuenta.
            </p>
          </div>
        </div>

        <div class="pt-4">
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSaving"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span v-if="isSaving" class="mr-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, CreditCard, Phone, MapPin, Mail } from 'lucide-vue-next'
import type { Propietario } from '@/types'

// Props
const props = defineProps({
  user: {
    type: Object as () => Propietario,
    required: true
  },
  isSaving: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['save'])

// Formulario
const formData = ref<Propietario>({
  id_propietario: 0,
  nombre: '',
  cedula: '',
  direccion: '',
  telefono: '',
  email: ''
})

// Método para enviar el formulario
const submitForm = () => {
  emit('save', { ...formData.value })
}

// Inicializar datos del formulario
onMounted(() => {
  formData.value = { ...props.user }
})
</script>