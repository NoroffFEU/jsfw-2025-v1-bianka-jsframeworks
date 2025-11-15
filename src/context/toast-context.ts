import { createContext } from 'react'

export interface ToastContextValue {
  message: string | null
  showToast: (message: string, duration?: number) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)
