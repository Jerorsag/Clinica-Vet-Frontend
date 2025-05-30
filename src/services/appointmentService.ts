// src/services/appointmentService.ts
import type { 
  ServicioVeterinario, 
  Veterinario, 
  Paciente, 
  CitaAgendada,
  BloqueHorario 
} from '../composables/useAppointmentBooking'

// ============================================
// SERVICIO DE DATOS - PREPARADO PARA APIS
// ============================================

class AppointmentService {
  private baseUrl = '/api' // Cambiar por URL real del backend
  
  // ============================================
  // MÉTODOS QUE SE CONECTARÁN AL BACKEND
  // ============================================
  
  async getServices(): Promise<ServicioVeterinario[]> {
    try {
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch(`${this.baseUrl}/services`)
      // return await response.json()
      
      // Por ahora retornamos datos mock
      return this.getMockServices()
    } catch (error) {
      console.error('Error fetching services:', error)
      throw new Error('Failed to load services')
    }
  }
  
  async getVeterinarians(serviceId?: number): Promise<Veterinario[]> {
    try {
      // TODO: Reemplazar con llamada real a API
      // const url = serviceId 
      //   ? `${this.baseUrl}/veterinarians?service_id=${serviceId}`
      //   : `${this.baseUrl}/veterinarians`
      // const response = await fetch(url)
      // return await response.json()
      
      // Por ahora retornamos datos mock
      return this.getMockVeterinarians(serviceId)
    } catch (error) {
      console.error('Error fetching veterinarians:', error)
      throw new Error('Failed to load veterinarians')
    }
  }
  
  async getUserPets(): Promise<Paciente[]> {
    try {
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch(`${this.baseUrl}/user/pets`)
      // return await response.json()
      
      // Por ahora retornamos datos mock
      return this.getMockUserPets()
    } catch (error) {
      console.error('Error fetching user pets:', error)
      throw new Error('Failed to load pets')
    }
  }
  
  async getWeeklyAvailability(veterinarianId: number, weekStart: string): Promise<any[]> {
    try {
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch(
      //   `${this.baseUrl}/availability?veterinarian_id=${veterinarianId}&date=${weekStart}`
      // )
      // return await response.json()
      
      // Por ahora retornamos datos mock
      return this.getMockWeeklyAvailability(veterinarianId, weekStart)
    } catch (error) {
      console.error('Error fetching availability:', error)
      throw new Error('Failed to load availability')
    }
  }
  
  async createAppointment(appointmentData: CitaAgendada): Promise<{ success: boolean; appointment_id?: number }> {
    try {
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch(`${this.baseUrl}/appointments`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.getAuthToken()}`
      //   },
      //   body: JSON.stringify(appointmentData)
      // })
      // return await response.json()
      
      // Por ahora simulamos el proceso
      return this.mockCreateAppointment(appointmentData)
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw new Error('Failed to create appointment')
    }
  }
  
  async verifySlotAvailability(
    veterinarianId: number, 
    date: string, 
    time: string
  ): Promise<{ available: boolean }> {
    try {
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch(`${this.baseUrl}/availability/check`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ veterinarian_id: veterinarianId, date, time })
      // })
      // return await response.json()
      
      // Por ahora simulamos la verificación
      return this.mockVerifySlotAvailability(veterinarianId, date, time)
    } catch (error) {
      console.error('Error verifying slot availability:', error)
      throw new Error('Failed to verify slot availability')
    }
  }
  
  // ============================================
  // MÉTODOS AUXILIARES
  // ============================================
  
  private getAuthToken(): string {
    // TODO: Implementar lógica real de autenticación
    return localStorage.getItem('auth_token') || ''
  }
  
  // ============================================
  // DATOS MOCK - FÁCILES DE ELIMINAR CUANDO TENGAMOS BACKEND
  // ============================================
  
  private getMockServices(): ServicioVeterinario[] {
    return [
      {
        id: 1,
        nombre: 'Consulta General',
        descripcion: 'Revisión médica completa',
        duracion: 30,
        precio: 80000,
        categoria: 'consulta',
        veterinarios_habilitados: [1, 2, 3],
        icon: '🩺'
      },
      {
        id: 2,
        nombre: 'Vacunación',
        descripcion: 'Aplicación de vacunas',
        duracion: 15,
        precio: 45000,
        categoria: 'vacuna',
        veterinarios_habilitados: [1, 2, 3, 4],
        icon: '💉'
      },
      {
        id: 3,
        nombre: 'Baño y Peluquería',
        descripcion: 'Aseo completo',
        duracion: 60,
        precio: 35000,
        categoria: 'estetica',
        veterinarios_habilitados: [4, 5],
        icon: '🛁'
      },
      {
        id: 4,
        nombre: 'Cirugía Menor',
        descripcion: 'Procedimientos quirúrgicos menores',
        duracion: 90,
        precio: 250000,
        categoria: 'cirugia',
        veterinarios_habilitados: [1, 2],
        icon: '🔪'
      },
      {
        id: 5,
        nombre: 'Limpieza Dental',
        descripcion: 'Profilaxis dental',
        duracion: 45,
        precio: 120000,
        categoria: 'dental',
        veterinarios_habilitados: [1, 3],
        icon: '🦷'
      }
    ]
  }
  
  private getMockVeterinarians(serviceId?: number): Veterinario[] {
    const allVets = [
      {
        id: 1,
        nombre: 'Dr. Carlos',
        apellido: 'García Martínez',
        especialidades: ['Medicina General', 'Cirugía'],
        rating: 4.9,
        foto: '/api/placeholder/60/60',
        servicios_disponibles: [1, 2, 4, 5]
      },
      {
        id: 2,
        nombre: 'Dra. Ana',
        apellido: 'López Rivera',
        especialidades: ['Medicina General', 'Cirugía'],
        rating: 4.8,
        foto: '/api/placeholder/60/60',
        servicios_disponibles: [1, 2, 4]
      },
      {
        id: 3,
        nombre: 'Dr. Miguel',
        apellido: 'Rodríguez Soto',
        especialidades: ['Medicina General', 'Odontología'],
        rating: 4.7,
        foto: '/api/placeholder/60/60',
        servicios_disponibles: [1, 2, 5]
      },
      {
        id: 4,
        nombre: 'Dra. Laura',
        apellido: 'Jiménez Vega',
        especialidades: ['Estética', 'Medicina General'],
        rating: 4.6,
        foto: '/api/placeholder/60/60',
        servicios_disponibles: [2, 3]
      },
      {
        id: 5,
        nombre: 'Carlos',
        apellido: 'Estilista Profesional',
        especialidades: ['Estética', 'Peluquería'],
        rating: 4.5,
        foto: '/api/placeholder/60/60',
        servicios_disponibles: [3]
      }
    ]
    
    // Filtrar por servicio si se especifica
    if (serviceId) {
      return allVets.filter(vet => vet.servicios_disponibles.includes(serviceId))
    }
    
    return allVets
  }
  
  private getMockUserPets(): Paciente[] {
    return [
      {
        id_paciente: 1,
        nombre: 'Max',
        id_propietario: 1,
        id_especie: 1,
        id_raza: 1,
        fecha_nacimiento: '2019-05-15',
        sexo: 'M',
        descripcion: 'Labrador color chocolate'
      },
      {
        id_paciente: 2,
        nombre: 'Luna',
        id_propietario: 1,
        id_especie: 2,
        id_raza: 6,
        fecha_nacimiento: '2020-03-10',
        sexo: 'H',
        descripcion: 'Gata persa blanca'
      }
    ]
  }
  
  private getMockWeeklyAvailability(veterinarianId: number, weekStart: string): any[] {
    // Generar las fechas de la semana basadas en weekStart
    const weekDays = []
    const startDate = new Date(weekStart)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      weekDays.push(date.toISOString().split('T')[0])
    }
    
    return weekDays.map((date, index) => {
      const dayOfWeek = new Date(date).getDay()
      
      // No hay servicio domingos
      if (dayOfWeek === 0) {
        return { date, slots: [] }
      }
      
      // Sábados horario reducido
      if (dayOfWeek === 6) {
        return {
          date,
          slots: [
            { inicio: '08:00', fin: '08:30', disponible: true, ocupacion: 'baja' as const },
            { inicio: '09:00', fin: '09:30', disponible: true, ocupacion: 'media' as const },
            { inicio: '10:00', fin: '10:30', disponible: false, ocupacion: 'alta' as const }
          ]
        }
      }
      
      // Días laborales normales (Lunes a Viernes)
      const slots: BloqueHorario[] = []
      for (let hour = 8; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          const endHour = minute === 30 ? hour + 1 : hour
          const endMinute = minute === 30 ? 0 : 30
          const endTimeString = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`
          
          // Simular disponibilidad determinística por veterinario y hora
          const seed = veterinarianId * 1000 + hour * 100 + minute + index
          const random = Math.sin(seed) * 0.5 + 0.5
          const disponible = random > 0.3
          const ocupacion = random > 0.7 ? 'baja' : random > 0.4 ? 'media' : 'alta'
          
          slots.push({
            inicio: timeString,
            fin: endTimeString,
            disponible,
            ocupacion
          })
        }
      }
      
      return { date, slots }
    })
  }
  
  private async mockCreateAppointment(appointmentData: CitaAgendada): Promise<{ success: boolean; appointment_id?: number }> {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simular éxito (95% de probabilidad)
    const success = Math.random() > 0.05
    
    if (success) {
      const appointmentId = Math.floor(Math.random() * 10000) + 1000
      console.log('Mock appointment created:', { ...appointmentData, id: appointmentId })
      return { success: true, appointment_id: appointmentId }
    } else {
      throw new Error('Simulated API error')
    }
  }
  
  private async mockVerifySlotAvailability(
    veterinarianId: number, 
    date: string, 
    time: string
  ): Promise<{ available: boolean }> {
    // Simular verificación
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simular que ocasionalmente un slot ya no está disponible
    const available = Math.random() > 0.1 // 90% disponible
    
    return { available }
  }
}

// Exportar una instancia del servicio
export const appointmentService = new AppointmentService()

// ============================================
// INSTRUCCIONES PARA MIGRACIÓN AL BACKEND:
// ============================================

/*
CUANDO TENGAS EL BACKEND REAL:

1. Cambiar la baseUrl por la URL real de tu API
2. Descomentar las llamadas fetch() reales
3. Comentar o eliminar todos los métodos getMock*()
4. Implementar getAuthToken() con tu sistema de auth real
5. Ajustar las interfaces si el backend tiene estructura diferente

ENDPOINTS QUE EL BACKEND DEBE PROVEER:
- GET /api/services
- GET /api/veterinarians?service_id=X
- GET /api/user/pets
- GET /api/availability?veterinarian_id=X&date=Y
- POST /api/appointments
- POST /api/availability/check

HEADERS REQUERIDOS:
- Content-Type: application/json
- Authorization: Bearer {token} (para rutas protegidas)
*/