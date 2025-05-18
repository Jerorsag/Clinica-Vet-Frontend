# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# Clínica Veterinaria - Frontend

Este proyecto implementa el frontend de una aplicación web para gestión de clínicas veterinarias, desarrollada con Vue 3, TypeScript y Tailwind CSS. La aplicación permite el registro de propietarios, gestión de mascotas, y manejo de autenticación, siguiendo los principios de diseño de UI/UX modernos y accesibles.

## 🎯 Características Principales

- **Sistema de Autenticación Completo**:
  - Inicio de sesión
  - Registro de usuarios
  - Recuperación de contraseña

- **Gestión de Mascotas**:
  - Registro detallado de mascotas
  - Selección de especies y razas
  - Carga de imágenes para las mascotas

- **Interfaz Moderna y Responsive**:
  - Diseño adaptable a dispositivos móviles y de escritorio
  - Experiencia de usuario intuitiva
  - Tema visual coherente para clínicas veterinarias

## 🚀 Tecnologías Utilizadas

- **Vue 3**: Framework progresivo para construir interfaces de usuario
- **TypeScript**: Añade tipado estático a JavaScript, mejorando la robustez del código
- **Tailwind CSS**: Framework de CSS utilitario para diseño rápido y consistente
- **Vue Router**: Manejo de rutas y navegación
- **MSW (Mock Service Worker)**: Simulación de API para desarrollo y pruebas

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v14.0.0 o superior)
- npm o yarn

### Pasos para Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/clinica-vet-frontend.git
   cd clinica-vet-frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   # o con yarn
   yarn install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   # o con yarn
   yarn dev
   ```

4. **Acceder a la aplicación**:
   La aplicación estará disponible en `http://localhost:5173`

## 📂 Estructura del Proyecto

```
src/
├── assets/        # Recursos estáticos (CSS, imágenes)
├── components/    # Componentes reutilizables
├── mocks/         # Mocks para simulación de API
│   ├── browser.ts
│   └── handlers.ts
├── router/        # Configuración de rutas
│   └── index.ts
├── types/         # Definiciones de tipos TypeScript
│   └── index.ts
├── views/         # Vistas principales de la aplicación
│   ├── LoginView.vue                # Inicio de sesión
│   ├── RegisterView.vue             # Registro de propietario
│   ├── ForgotPasswordView.vue       # Recuperación de contraseña
│   ├── RegisterPetPromptView.vue    # Pregunta de registro de mascota
│   ├── RegisterPetFormView.vue      # Formulario de registro de mascota
│   └── SuccessView.vue              # Vista de operación exitosa
├── App.vue        # Componente raíz
└── main.ts        # Punto de entrada de la aplicación
```

## ⚙️ Flujo de la Aplicación

La aplicación implementa el siguiente flujo de usuario:

1. **Inicio de Sesión / Registro**:
   - El usuario accede a través de la pantalla de login
   - Si no tiene cuenta, puede registrarse como propietario

2. **Recuperación de Contraseña**:
   - Disponible desde la pantalla de login
   - Solicita email para enviar instrucciones de recuperación

3. **Registro de Mascota**:
   - Después del registro exitoso, se pregunta si desea registrar una mascota
   - Si elige "Sí", se muestra el formulario completo de registro de mascota
   - Si elige "No", se muestra una pantalla de éxito indicando que puede hacerlo más tarde

4. **Confirmación de Operaciones**:
   - Todas las operaciones muestran una pantalla de éxito con mensajes personalizados

## 🔄 API Simulada

El proyecto utiliza Mock Service Worker (MSW) para simular una API backend durante el desarrollo. Los endpoints simulados incluyen:

- `POST /api/auth/login`: Autenticación de usuarios
- `POST /api/auth/register`: Registro de nuevos propietarios
- `POST /api/pets`: Registro de mascotas

Para modificar el comportamiento de estos endpoints, editar los archivos en `src/mocks/`.

## 👥 Modelos de Datos

El sistema trabaja con los siguientes modelos principales:

### Propietario
```typescript
interface Propietario {
  id_propietario: number;
  nombre: string;
  cedula: string;
  direccion: string;
  telefono: string;
  email: string;
  password?: string; // Solo para registro/login
}
```

### Paciente (Mascota)
```typescript
interface Paciente {
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
```

### Especie y Raza
```typescript
interface Especie {
  id: number;
  nombre: string;
}

interface Raza {
  id: number;
  nombre: string;
  id_especie: number;
}
```

## 🎨 Diseño UI/UX

El diseño sigue estos principios:

- **Paleta de Colores**: Tonos de verde esmeralda que transmiten salud, cuidado y bienestar animal
- **Componentes Consistentes**: Tarjetas, botones, formularios y mensajes con estilos unificados
- **Iconografía Temática**: Uso de iconos relacionados con mascotas y atención veterinaria
- **Feedback Visual**: Indicadores claros de carga, éxito y error para cada operación

## 🔧 Personalización

### Modificar Tema de Colores

El tema principal utiliza colores de Tailwind CSS. Para modificar la paleta:

1. Editar los colores en el archivo `src/assets/tailwind.config.js`
2. Ajustar las clases CSS en los componentes según sea necesario

### Añadir Nuevas Especies/Razas

Para agregar especies y razas al catálogo:

1. Editar los arreglos en `src/views/RegisterPetFormView.vue`:
   ```typescript
   const especies = ref<Especie[]>([
     // Añadir nuevas especies aquí
   ])
   
   const razas = ref<Raza[]>([
     // Añadir nuevas razas aquí
   ])
   ```

## 🔜 Próximos Pasos

Características planeadas para futuras versiones:

- [ ] Implementación de dashboard para propietarios
- [ ] Gestión de citas médicas
- [ ] Historial médico de mascotas
- [ ] Sistema de recordatorios para vacunas y tratamientos
- [ ] Integración con backend real

## 🤝 Contribuir al Proyecto

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m 'Añade nueva funcionalidad'`
4. Envía tus cambios: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📝 Convenciones de Código

Este proyecto sigue estas convenciones:

- **Nombres de Componentes**: PascalCase (LoginView.vue)
- **Nombres de Funciones/Variables**: camelCase (handleLogin)
- **Tipado**: Uso estricto de TypeScript para todas las variables y funciones
- **Estilo de CSS**: Clases de Tailwind para estilos consistentes

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 📞 Contacto

Si tienes preguntas o sugerencias, por favor contacta a:
- Nombre: Jeronimo Rodriguez
- Email: jeronimoroseag@gmail.com
