// src/types/index.ts
export interface Propietario {
  id_propietario: number;
  nombre: string;
  cedula: string;
  direccion: string;
  telefono: string;
  email: string;
  password?: string; // Solo para registro/login
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends Propietario {
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface Especie {
  id: number;
  nombre: string;
}

export interface Raza {
  id: number;
  nombre: string;
  id_especie: number;
}

export interface Paciente {
  id_paciente?: number;
  nombre: string;
  id_propietario: number;
  id_especie: number | null;
  id_raza: number | null;
  fecha_nacimiento: string;
  sexo: string;
  descripcion?: string;
  fecha_registro?: string;
}