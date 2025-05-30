<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Barra de navegación superior -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <!-- Logo -->
              <img src="../assets/vet-icon.jpg" alt="Veterinary Icon" class="w-12 h-12 object-contain hidden md:block" />
              <span class="ml-2 text-xl font-bold text-blue-900">VetHumboldt</span>
            </div>
            <!-- Menú principal -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link 
                to="/dashboard" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[$route.path === '/dashboard' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              >
                Dashboard
              </router-link>
              <router-link 
                to="/profile" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[$route.path === '/profile' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              >
                Mi Perfil
              </router-link>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Historial
              </a>
            </div>
          </div>
          
          <!-- Menú móvil (hamburguesa) -->
          <div class="sm:hidden flex items-center">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span class="sr-only">Abrir menú principal</span>
              <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
              <X v-else class="h-6 w-6" />
            </button>
          </div>
          
          <!-- Perfil y notificaciones -->
          <div class="hidden sm:flex items-center">
            <button class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Bell class="h-6 w-6" />
            </button>
            <div class="ml-3 relative">
              <div>
                <button @click="isProfileMenuOpen = !isProfileMenuOpen" type="button" class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Abrir menú de usuario</span>
                  <UserCircle class="h-8 w-8 text-blue-600" />
                </button>
              </div>
              <!-- Menú dropdown de perfil -->
              <div v-if="isProfileMenuOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Configuración</router-link>
                <button @click="logout" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Menú móvil -->
    <div v-if="mobileMenuOpen" class="sm:hidden bg-white">
      <div class="pt-2 pb-3 space-y-1">
        <router-link 
          to="/dashboard" 
          class="block pl-3 pr-4 py-2 text-base font-medium"
          :class="[$route.path === '/dashboard' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700' : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800']"
          @click="mobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        <router-link 
          to="/profile" 
          class="block pl-3 pr-4 py-2 text-base font-medium"
          :class="[$route.path === '/profile' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700' : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800']"
          @click="mobileMenuOpen = false"
        >
          Mi Perfil
        </router-link>
        <a href="#" class="border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 text-base font-medium">
          Historial
        </a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <UserCircle class="h-10 w-10 text-blue-600" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ user.nombre || 'Usuario' }}</div>
            <div class="text-sm font-medium text-gray-500">{{ user.email || 'usuario@ejemplo.com' }}</div>
          </div>
          <button class="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Bell class="h-6 w-6" />
          </button>
        </div>
        <div class="mt-3 space-y-1">
          <router-link to="/settings" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" @click="mobileMenuOpen = false">Configuración</router-link>
          <button @click="logout" class="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Cerrar Sesión</button>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <main class="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Aquí irá el contenido de cada vista -->
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-8">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Logo y descripción -->
          <div>
            <div class="flex items-center">
              <img src="../assets/vet-icon.jpg" alt="Veterinary Icon" class="w-12 h-12 object-contain hidden md:block" />
              <span class="ml-2 text-xl font-bold text-blue-900">VetHumboldt</span>
            </div>
            <p class="mt-3 text-sm text-gray-500">
              Cuidando la salud y el bienestar de tus mascotas con los mejores profesionales y servicios veterinarios.
            </p>
            <div class="mt-4 flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-blue-500">
                <span class="sr-only">Facebook</span>
                <Facebook class="h-6 w-6" />
              </a>
              <a href="#" class="text-gray-400 hover:text-blue-500">
                <span class="sr-only">Instagram</span>
                <Instagram class="h-6 w-6" />
              </a>
              <a href="#" class="text-gray-400 hover:text-blue-500">
                <span class="sr-only">Twitter</span>
                <Twitter class="h-6 w-6" />
              </a>
            </div>
          </div>

          <!-- Enlaces rápidos -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Enlaces Rápidos
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <router-link to="/servicios" class="text-base text-gray-500 hover:text-blue-700">
                  Servicios
                </router-link>
              </li>
              <li>
                <router-link to="/especialidades" class="text-base text-gray-500 hover:text-blue-700">
                  Especialidades
                </router-link>
              </li>
              <li>
                <router-link to="/veterinarios" class="text-base text-gray-500 hover:text-blue-700">
                  Nuestros Veterinarios
                </router-link>
              </li>
              <li>
                <router-link to="/precios" class="text-base text-gray-500 hover:text-blue-700">
                  Precios
                </router-link>
              </li>
              <li>
                <router-link to="/blog" class="text-base text-gray-500 hover:text-blue-700">
                  Blog
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contacto -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contacto
            </h3>
            <div class="mt-4 space-y-3">
              <p class="flex items-center text-base text-gray-500">
                <MapPin class="h-5 w-5 mr-2 text-blue-500" />
                Calle 6 Norte #14-26
              </p>
              <p class="flex items-center text-base text-gray-500">
                <Phone class="h-5 w-5 mr-2 text-blue-500" />
                +57 311 2324283
              </p>
              <p class="flex items-center text-base text-gray-500">
                <Mail class="h-5 w-5 mr-2 text-blue-500" />
                vetclinic@gmail.com
              </p>
              <p class="flex items-center text-base text-gray-500">
                <Clock class="h-5 w-5 mr-2 text-blue-500" />
                Lun-Vie: 8am-12am / 2pm-6pm | Dom: 8am-12am
              </p>
            </div>
          </div>
        </div>

        <!-- Barra de derechos y política de privacidad -->
        <div class="mt-8 pt-6 border-t border-gray-200 md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <router-link to="/terminos" class="text-sm text-gray-500 hover:text-blue-700">
              Términos y Condiciones
            </router-link>
            <router-link to="/privacidad" class="text-sm text-gray-500 hover:text-blue-700">
              Política de Privacidad
            </router-link>
          </div>
          <p class="mt-8 text-sm text-gray-500 md:mt-0 md:order-1">
            &copy; 2025 VetClinic. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>

    <!-- Toast de notificación -->
    <div 
      v-if="notification.show" 
      class="fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition-opacity duration-300"
      :class="[notification.show ? 'opacity-100' : 'opacity-0']"
    >
      <div class="p-4 flex items-center">
        <div class="flex-shrink-0">
          <CheckCircle v-if="notification.type === 'success'" class="h-6 w-6 text-green-500" />
          <AlertCircle v-else class="h-6 w-6 text-red-500" />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">
            {{ notification.message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="notification.show = false"
            class="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span class="sr-only">Cerrar</span>
            <X class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Bell, UserCircle, Menu, X, 
  CheckCircle, AlertCircle,
  MapPin, Phone, Mail, Clock,
  Facebook, Instagram, Twitter
} from 'lucide-vue-next'
import type { Propietario } from '@/types'

// Router
const router = useRouter()

// Estado
const isProfileMenuOpen = ref(false)
const mobileMenuOpen = ref(false)
const user = ref<Propietario>({
  id_propietario: 0,
  nombre: '',
  cedula: '',
  direccion: '',
  telefono: '',
  email: ''
})

// Notificaciones
const notification = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error',
  timeout: 0
})

// Método para mostrar notificaciones
const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  // Limpiar timeout anterior si existe
  if (notification.timeout) {
    window.clearTimeout(notification.timeout)
  }
  
  // Configurar nueva notificación
  notification.message = message
  notification.type = type
  notification.show = true
  
  // Auto-ocultar después de 5 segundos
  notification.timeout = window.setTimeout(() => {
    notification.show = false
  }, 5000)
}

// Proveer la función de notificación para componentes hijos
provide('showNotification', showNotification)

// Método para cerrar sesión
const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

// Cargar datos del usuario al montar el componente
onMounted(() => {
  const userJson = localStorage.getItem('user')
  if (userJson) {
    try {
      user.value = JSON.parse(userJson)
    } catch (err) {
      console.error('Error parsing user data:', err)
    }
  } else {
    // Redireccionar a login si no hay usuario
    router.push('/login')
  }
})
</script>