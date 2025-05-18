declare module 'vue-router' {
  import type { DefineComponent } from 'vue'
  
  export interface RouteRecordRaw {
    path: string
    redirect?: string | { name?: string; path?: string; query?: Record<string, string>; hash?: string }
    name?: string
    component?: any
    components?: Record<string, any>
    children?: RouteRecordRaw[]
    meta?: Record<string, any>
    beforeEnter?: any
    props?: boolean | Record<string, any> | ((to: any) => Record<string, any>)
    caseSensitive?: boolean
    alias?: string | string[]
  }
  
  export function createRouter(options: any): any
  export function createWebHistory(base?: string): any
  export function useRouter(): any
  export function useRoute(): any
}