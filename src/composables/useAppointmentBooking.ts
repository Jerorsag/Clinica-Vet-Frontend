// src/composables/useAppointmentBooking.ts
import { ref, computed } from 'vue'
import { appointmentService } from '../services/appointmentService'

// Interfaces
export interface ServicioVeterinario {
  id: number
  nombre: string
  descripcion: string
  duracion: number // en minutos
  precio: number
  categoria: 'consulta' | 'vacuna' | 'cirugia' | 'estetica' | 'dental' | 'emergencia'
  veterinarios_habilitados: number[]
  icon: string
}

export interface Veterinario {
  id: number
  nombre: string
  apellido: string
  especialidades: string[]
  rating: number
  foto: string
  servicios_disponibles: number[]
}

export interface Paciente {
  id_paciente: number
  nombre: string
  id_propietario: number
  id_especie: number
  id_raza: number
  fecha_nacimiento: string
  sexo: 'M' | 'H'
  descripcion?: string
}

export interface BloqueHorario {
  inicio: string
  fin: string
  disponible: boolean
  ocupacion: 'baja' | 'media' | 'alta'
}

export interface CitaAgendada {
  servicio_id: number
  mascota_id: number
  veterinario_id: number
  fecha: string
  hora_inicio: string
  hora_fin: string
  notas?: string
}

export function useAppointmentBooking() {
  // ============================================
  // ESTADO DE LA UI (Frontend puro)
  // ============================================
  const isLoading = ref(false)
  const currentStep = ref(1)
  const error = ref<string | null>(null)
  
  // Estado de selección del usuario
  const selectedService = ref<ServicioVeterinario | null>(null)
  const selectedPet = ref<Paciente | null>(null)
  const selectedVeterinarian = ref<Veterinario | null>(null)
  const selectedDate = ref<string>('')
  const selectedTime = ref<string>('')
  const appointmentNotes = ref<string>('')

  // ============================================
  // DATOS REACTIVOS (Preparados para APIs)
  // ============================================
  const services = ref<ServicioVeterinario[]>([])
  const veterinarians = ref<Veterinario[]>([])
  const userPets = ref<Paciente[]>([])
  const weeklyAvailability = ref<any[]>([])

  // ============================================
  // COMPUTED PROPERTIES (Lógica de frontend)
  // ============================================
  const availableVeterinarians = computed(() => {
    if (!selectedService.value) return []
    
    return veterinarians.value.filter(vet => 
      vet.servicios_disponibles.includes(selectedService.value!.id)
    )
  })

  const canProceedToConfirmation = computed(() => {
    return selectedService.value && 
           selectedPet.value && 
           selectedVeterinarian.value && 
           selectedDate.value && 
           selectedTime.value
  })

  const getAppointmentSummary = computed(() => {
    if (!canProceedToConfirmation.value) return null
    
    const [hours, minutes] = selectedTime.value.split(':')
    const startTime = `${hours}:${minutes}`
    const endHour = parseInt(hours) + Math.floor(selectedService.value!.duracion / 60)
    const endMinute = parseInt(minutes) + (selectedService.value!.duracion % 60)
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`
    
    return {
      service: selectedService.value!,
      pet: selectedPet.value!,
      veterinarian: selectedVeterinarian.value!,
      date: selectedDate.value,
      startTime,
      endTime,
      notes: appointmentNotes.value
    }
  })

  // ============================================
  // MÉTODOS DE UI (Frontend)
  // ============================================
  const resetBooking = () => {
    selectedService.value = null
    selectedPet.value = null
    selectedVeterinarian.value = null
    selectedDate.value = ''
    selectedTime.value = ''
    appointmentNotes.value = ''
    currentStep.value = 1
    error.value = null
  }

  const selectService = (service: ServicioVeterinario) => {
    selectedService.value = service
    // Resetear veterinario si no está disponible para el nuevo servicio
    if (selectedVeterinarian.value && 
        !selectedVeterinarian.value.servicios_disponibles.includes(service.id)) {
      selectedVeterinarian.value = null
    }
  }

  const selectPet = (pet: Paciente) => {
    selectedPet.value = pet
  }

  const selectVeterinarian = (vet: Veterinario | null) => {
    selectedVeterinarian.value = vet
  }

  const selectDateTime = (date: string, time: string) => {
    selectedDate.value = date
    selectedTime.value = time
  }

  // ============================================
  // MÉTODOS DE INTEGRACIÓN CON BACKEND
  // ============================================
  const loadServices = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      services.value = await appointmentService.getServices()
    } catch (err) {
      error.value = 'Error al cargar servicios'
      console.error('Error loading services:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadUserPets = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      userPets.value = await appointmentService.getUserPets()
    } catch (err) {
      error.value = 'Error al cargar mascotas'
      console.error('Error loading pets:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadVeterinarians = async (serviceId?: number) => {
    isLoading.value = true
    error.value = null
    
    try {
      veterinarians.value = await appointmentService.getVeterinarians(serviceId)
    } catch (err) {
      error.value = 'Error al cargar veterinarios'
      console.error('Error loading veterinarians:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadWeeklyAvailability = async (veterinarianId: number, weekStart: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      weeklyAvailability.value = await appointmentService.getWeeklyAvailability(veterinarianId, weekStart)
    } catch (err) {
      error.value = 'Error al cargar disponibilidad'
      console.error('Error loading availability:', err)
    } finally {
      isLoading.value = false
    }
  }

  const submitAppointment = async (): Promise<boolean> => {
    if (!canProceedToConfirmation.value) return false
    
    isLoading.value = true
    error.value = null
    
    try {
      const appointmentData: CitaAgendada = {
        servicio_id: selectedService.value!.id,
        mascota_id: selectedPet.value!.id_paciente,
        veterinario_id: selectedVeterinarian.value!.id,
        fecha: selectedDate.value,
        hora_inicio: selectedTime.value,
        hora_fin: getAppointmentSummary.value!.endTime,
        notas: appointmentNotes.value || undefined
      }
      
      const result = await appointmentService.createAppointment(appointmentData)
      return result.success
    } catch (err) {
      error.value = 'Error al agendar la cita'
      console.error('Error submitting appointment:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const verifySlotAvailability = async (veterinarianId: number, date: string, time: string): Promise<boolean> => {
    try {
      const result = await appointmentService.verifySlotAvailability(veterinarianId, date, time)
      return result.available
    } catch (err) {
      console.error('Error verifying slot availability:', err)
      return false
    }
  }

  const submitAppointmentWithData = async (appointmentData: any): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const citaData: CitaAgendada = {
        servicio_id: appointmentData.service.id,
        mascota_id: appointmentData.pet.id_paciente,
        veterinario_id: appointmentData.veterinarian.id,
        fecha: appointmentData.date,
        hora_inicio: appointmentData.startTime,
        hora_fin: appointmentData.endTime,
        notas: appointmentData.notes || undefined
      }
      
      console.log('📤 Enviando datos al servicio:', citaData)
      const result = await appointmentService.createAppointment(citaData)
      return result.success
    } catch (err) {
      error.value = 'Error al agendar la cita'
      console.error('Error submitting appointment:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const initializeBooking = async () => {
    await Promise.all([
      loadServices(),
      loadUserPets(),
      loadVeterinarians()
    ])
  }

  return {
    // Estado de UI
    isLoading,
    currentStep,
    error,
    
    // Datos de selección
    selectedService,
    selectedPet,
    selectedVeterinarian,
    selectedDate,
    selectedTime,
    appointmentNotes,
    
    // Datos disponibles
    services,
    veterinarians,
    userPets,
    weeklyAvailability,
    availableVeterinarians,
    
    // Computed
    canProceedToConfirmation,
    getAppointmentSummary,
    
    // Métodos de UI
    resetBooking,
    selectService,
    selectPet,
    selectVeterinarian,
    selectDateTime,
    
    // Métodos de datos
    loadServices,
    loadUserPets,
    loadVeterinarians,
    loadWeeklyAvailability,
    submitAppointment,
    verifySlotAvailability,
    initializeBooking,
    submitAppointmentWithData
  }
}