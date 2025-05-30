<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <button 
      @click="$emit('schedule')"
      class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
    >
      <div class="px-4 py-5 sm:p-6 flex flex-col items-center">
        <div class="bg-blue-100 rounded-full p-3">
          <CalendarPlus class="h-6 w-6 text-blue-600" />
        </div>
        <h3 class="mt-3 text-lg font-medium text-gray-900">Agendar Cita</h3>
        <p class="mt-1 text-sm text-gray-500 text-center">
          Programa una nueva cita médica
        </p>
      </div>
    </button>
    
    <button 
      class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
      @click="$router.push('/historial')"
    >
      <div class="px-4 py-5 sm:p-6 flex flex-col items-center">
        <div class="bg-blue-100 rounded-full p-3">
          <ClipboardList class="h-6 w-6 text-blue-600" />
        </div>
        <h3 class="mt-3 text-lg font-medium text-gray-900">Historial Médico</h3>
        <p class="mt-1 text-sm text-gray-500 text-center">
          Ver historial de tus mascotas
        </p>
      </div>
    </button>
    
    <button 
      class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
      @click="$router.push('/profile')"
    >
      <div class="px-4 py-5 sm:p-6 flex flex-col items-center">
        <div class="bg-blue-100 rounded-full p-3">
          <UserPlus class="h-6 w-6 text-blue-600" />
        </div>
        <h3 class="mt-3 text-lg font-medium text-gray-900">Registrar Mascota</h3>
        <p class="mt-1 text-sm text-gray-500 text-center">
          Añade una nueva mascota
        </p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { CalendarPlus, ClipboardList, UserPlus } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

defineEmits(['schedule'])
</script>