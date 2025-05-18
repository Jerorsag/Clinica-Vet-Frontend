// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Configuración de MSW solo en desarrollo
async function setupMockWorker() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js' // Asegurar que la ruta es correcta
      }
    })
    console.log('Mock Service Worker iniciado')
  }
}

// Iniciar la aplicación después de configurar MSW
setupMockWorker().then(() => {
  createApp(App)
    .use(router)
    .mount('#app')
})