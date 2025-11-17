import React from 'react'

interface ContactFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'textarea'
  value: string
  error?: string
  onChange: (value: string) => void
}

function ContactField({ id, label, type = 'text', value, error, onChange }: ContactFieldProps) {
  const describedBy = error ? `${id}-error` : undefined
  const commonProps = {
    id,
    value,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    className:
      'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200',
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={5} />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && (
        <p id={describedBy} role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default ContactField
