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
        <div role="status">
          <p>{message}</p>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export default ToastProvider
