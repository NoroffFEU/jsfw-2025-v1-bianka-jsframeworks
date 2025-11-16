import { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContext } from './toast-context'

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const showToast = useCallback((text: string, duration = 3000) => {
    setMessage(text)

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setMessage(null)
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ message, showToast }}>
      {children}
      {message && (
        <div
          role="status"
          className="fixed right-4 top-20 z-50 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 shadow-xl"
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export default ToastProvider
