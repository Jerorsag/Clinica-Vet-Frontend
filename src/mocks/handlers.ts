// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import type { Propietario, ApiResponse, Paciente } from '../types'

// Base de datos simulada
let owners: Propietario[] = [
  {
    id_propietario: 1,
    nombre: 'Usuario Demo',
    cedula: '1234567890',
    direccion: 'Calle Principal 123',
    telefono: '3001234567',
    email: 'demo@example.com'
  }
]

// Mascotas simuladas
let pets: Paciente[] = []

// Simulación de autenticación simple
let loggedInUser: Propietario | null = null

export const handlers = [
  // Login
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string }
    
    // Validación simple
    const user = owners.find(owner => owner.email === email)
    
    if (!user) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: 'Credenciales inválidas'
        } as ApiResponse<null>),
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // En un entorno real haríamos hash y comparación de contraseñas
    // Para la simulación, aceptamos cualquier contraseña
    loggedInUser = user
    
    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: user
      } as ApiResponse<Propietario>),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }),
  
  // Registro
  http.post('/api/auth/register', async ({ request }) => {
    const userData = await request.json() as Propietario
    
    // Verificar si el email ya existe
    if (owners.some(owner => owner.email === userData.email)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: 'El email ya está registrado'
        } as ApiResponse<null>),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Crear nuevo usuario
    const newUser: Propietario = {
      ...userData,
      id_propietario: owners.length + 1
    }
    
    // Guardar en nuestra "base de datos"
    owners.push(newUser)
    loggedInUser = newUser
    
    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: newUser
      } as ApiResponse<Propietario>),
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }),

  // Registrar mascota
  http.post('/api/pets', async ({ request }) => {
    const petData = await request.json() as Paciente
    
    // Simular el registro de la mascota
    const newPet: Paciente = {
      id_paciente: pets.length + 1,
      nombre: petData.nombre,
      id_propietario: petData.id_propietario,
      id_especie: petData.id_especie,
      id_raza: petData.id_raza,
      fecha_nacimiento: petData.fecha_nacimiento,
      sexo: petData.sexo,
      descripcion: petData.descripcion,
      fecha_registro: new Date().toISOString()
    }
    
    // Guardar en nuestra "base de datos" simulada
    pets.push(newPet)
    
    // Simular éxito
    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: newPet,
        message: '¡Mascota registrada con éxito!'
      }),
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  })
]