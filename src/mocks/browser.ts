// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Usar una aserción de tipo para evitar el error
export const worker = setupWorker(...(handlers as any))