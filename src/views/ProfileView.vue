<!-- src/views/ProfileView.vue -->
<template>
  <main-layout>
    <!-- Encabezado -->
    <div class="px-4 sm:px-0 mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">Mi Perfil</h1>
      <p class="mt-1 text-sm text-gray-600">Gestiona tu información personal y tus mascotas registradas</p>
    </div>

    <!-- Pestañas -->
    <div class="px-4 sm:px-0">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button @click="activeTab = 'pets'" :class="[
            activeTab === 'pets'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
          ]">
            <PawPrint class="inline-block h-5 w-5 mr-2" />
            Mis Mascotas
          </button>
          <button @click="activeTab = 'personal'" :class="[
            activeTab === 'personal'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
          ]">
            <User class="inline-block h-5 w-5 mr-2" />
            Información Personal
          </button>
          <button @click="activeTab = 'security'" :class="[
            activeTab === 'security'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
          ]">
            <Lock class="inline-block h-5 w-5 mr-2" />
            Seguridad
          </button>
        </nav>
      </div>
    </div>

    <!-- Contenido de las pestañas -->
    <div class="mt-6 px-4 sm:px-0">
      <!-- Pestaña de Mascotas -->
      <div v-if="activeTab === 'pets'">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-900">Mascotas Registradas</h2>
          <button @click="showPetForm = true; editingPet = null"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <Plus class="h-4 w-4 mr-1" />
            Nueva Mascota
          </button>
        </div>

        <!-- Lista de mascotas -->
        <div v-if="!showPetForm">
          <pets-list :pets="pets" :species="species" :breeds="breeds" @edit="editPet" @delete="confirmDeletePet" />
        </div>

        <!-- Formulario de mascota (para crear/editar) -->
        <div v-else>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingPet ? 'Editar Mascota' : 'Agregar Nueva Mascota' }}
            </h3>
            <button @click="showPetForm = false" class="text-gray-500 hover:text-gray-700">
              <X class="h-5 w-5" />
            </button>
          </div>
          <pet-form :pet="editingPet" :species="species" :breeds="breeds" @save="savePet" @cancel="showPetForm = false"
            :is-saving="isSaving" />
        </div>
      </div>

      <!-- Pestaña de Información Personal -->
      <div v-if="activeTab === 'personal'">
        <personal-info-form :user="user" @save="savePersonalInfo" :is-saving="isSaving" />
      </div>

      <!-- Pestaña de Seguridad -->
      <security-tab v-if="activeTab === 'security'" :is-saving="isChangingPassword" @update="changePassword" />
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
      aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangle class="h-6 w-6 text-red-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Eliminar Mascota
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    ¿Estás seguro de que deseas eliminar a <strong>{{ petToDelete?.nombre }}</strong>? Esta acción no se
                    puede deshacer.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="deletePet" type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="isSaving">
              <span v-if="isSaving" class="mr-2">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </span>
              {{ isSaving ? 'Eliminando...' : 'Eliminar' }}
            </button>
            <button @click="showDeleteModal = false" type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, inject } from 'vue'
import {
  User, PawPrint, Lock, Key,
  Plus, X, AlertCircle, AlertTriangle
} from 'lucide-vue-next'
import MainLayout from '../layouts/MainLayout.vue'
import PersonalInfoForm from "../components/profile/PersonalInfoForm.vue"
import PetsList from "../components/profile/PetsList.vue"
import PetForm from "../components/profile/PetForm.vue"
import SecurityTab from "../components/profile/SecurityTab.vue"
import type { Propietario, Paciente } from '@/types'

// Estado
const activeTab = ref('pets')
const isSaving = ref(false)
const isChangingPassword = ref(false)
const showPetForm = ref(false)
const editingPet = ref<Paciente | null>(null)
const showDeleteModal = ref(false)
const petToDelete = ref<Paciente | null>(null)
const passwordError = ref('')

// Función de notificación proporcionada por el layout
const showNotification = inject('showNotification')

// Datos del usuario y mascotas
const user = ref<Propietario>({
  id_propietario: 1,
  nombre: 'Usuario de Prueba',
  cedula: '',
  direccion: '',
  telefono: '',
  email: 'usuario@example.com'
})

const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const pets = ref<Paciente[]>([])

// Especies y razas (simuladas)
const species = [
  { id: 1, nombre: 'Perro' },
  { id: 2, nombre: 'Gato' }
]

const breeds = [
  // Perros
  { id: 1, nombre: 'Labrador', id_especie: 1 },
  { id: 2, nombre: 'Pastor Alemán', id_especie: 1 },
  { id: 3, nombre: 'Bulldog', id_especie: 1 },
  { id: 4, nombre: 'Chihuahua', id_especie: 1 },
  { id: 5, nombre: 'Husky', id_especie: 1 },
  // Gatos
  { id: 6, nombre: 'Persa', id_especie: 2 },
  { id: 7, nombre: 'Siamés', id_especie: 2 },
  { id: 8, nombre: 'Maine Coon', id_especie: 2 },
  { id: 9, nombre: 'Bengala', id_especie: 2 }
]

// Métodos para la gestión de información personal
const savePersonalInfo = async (updatedUser: Propietario) => {
  try {
    isSaving.value = true
    // Simular guardado en API
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Actualizar usuario en estado y localStorage
    Object.assign(user.value, updatedUser)
    localStorage.setItem('user', JSON.stringify(user.value))

    showNotification && showNotification('Información personal actualizada correctamente')
  } catch (error) {
    console.error('Error al guardar la información personal:', error)
    showNotification && showNotification('Error al guardar la información. Inténtalo de nuevo.', 'error')
  } finally {
    isSaving.value = false
  }
}

// Gestión de mascotas
const editPet = (pet: Paciente) => {
  editingPet.value = { ...pet }
  showPetForm.value = true
}

const confirmDeletePet = (pet: Paciente) => {
  petToDelete.value = pet
  showDeleteModal.value = true
}

const deletePet = async () => {
  if (!petToDelete.value) return

  try {
    isSaving.value = true
    // Simular eliminación en API
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Eliminar de la lista local
    const index = pets.value.findIndex(p => p.id_paciente === petToDelete.value?.id_paciente)
    if (index !== -1) {
      pets.value.splice(index, 1)
    }

    showNotification && showNotification(`${petToDelete.value.nombre} ha sido eliminado correctamente`)
  } catch (error) {
    console.error('Error al eliminar la mascota:', error)
    showNotification && showNotification('Error al eliminar la mascota. Inténtalo de nuevo.', 'error')
  } finally {
    isSaving.value = false
    showDeleteModal.value = false
    petToDelete.value = null
  }
}

const savePet = async (pet: Paciente) => {
  try {
    isSaving.value = true
    // Simular guardado en API
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (pet.id_paciente) {
      // Actualizar mascota existente
      const index = pets.value.findIndex(p => p.id_paciente === pet.id_paciente)
      if (index !== -1) {
        pets.value[index] = { ...pet }
      }
      showNotification && showNotification(`${pet.nombre} ha sido actualizado correctamente`)
    } else {
      // Crear nueva mascota
      const newPet = {
        ...pet,
        id_paciente: Date.now(), // ID temporal
        id_propietario: user.value.id_propietario
      }
      pets.value.push(newPet)
      showNotification && showNotification(`${pet.nombre} ha sido registrado correctamente`)
    }

    // Cerrar formulario
    showPetForm.value = false
    editingPet.value = null
  } catch (error) {
    console.error('Error al guardar la mascota:', error)
    showNotification && showNotification('Error al guardar la mascota. Inténtalo de nuevo.', 'error')
  } finally {
    isSaving.value = false
  }
}

// Cambio de contraseña
const changePassword = async () => {
  // Validar que las contraseñas coincidan
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    passwordError.value = 'Las contraseñas no coinciden'
    return
  }

  // Validar longitud mínima
  if (passwordData.newPassword.length < 8) {
    passwordError.value = 'La contraseña debe tener al menos 8 caracteres'
    return
  }

  try {
    isChangingPassword.value = true
    passwordError.value = ''

    // Simular proceso de cambio de contraseña
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Limpiar formulario
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''

    showNotification && showNotification('Tu contraseña ha sido actualizada correctamente')
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error)
    passwordError.value = 'Error al cambiar la contraseña. Verifica tu contraseña actual e inténtalo de nuevo.'
  } finally {
    isChangingPassword.value = false
  }
}

// Cargar datos al montar
onMounted(async () => {
  // Obtener usuario del localStorage
  const userJson = localStorage.getItem('user')
  if (userJson) {
    try {
      const userData = JSON.parse(userJson)
      user.value = {
        ...userData,
        // Asegurar que estén todos los campos necesarios
        direccion: userData.direccion || '',
        telefono: userData.telefono || '',
        cedula: userData.cedula || ''
      }
    } catch (err) {
      console.error('Error parsing user data:', err)
    }
  }

  // Simular carga de mascotas
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
  }, 500)
})
</script>