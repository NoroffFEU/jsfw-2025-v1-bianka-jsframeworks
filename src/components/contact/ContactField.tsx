interface ContactFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'textarea'
  value: string
  error?: string
  onChange: (value: string) => void
}

function ContactField({ id, label, type = 'text', value, error, onChange }: ContactFieldProps) {
  const commonProps = {
    id,
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={5} />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  )
}

export default ContactField
