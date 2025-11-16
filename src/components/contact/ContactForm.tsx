import type { ContactFormErrors, ContactFormValues } from '../../types/contact'
import ContactField from './ContactField'

interface ContactFormProps {
  values: ContactFormValues
  errors: ContactFormErrors
  onChange: (field: keyof ContactFormValues, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function ContactForm({ values, errors, onChange, onSubmit }: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6">
        <ContactField
          id="fullName"
          label="Full Name"
          value={values.fullName}
          error={errors.fullName}
          onChange={(value) => onChange('fullName', value)}
        />
        <ContactField
          id="subject"
          label="Subject"
          value={values.subject}
          error={errors.subject}
          onChange={(value) => onChange('subject', value)}
        />
        <ContactField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => onChange('email', value)}
        />
        <ContactField
          id="message"
          label="Message"
          type="textarea"
          value={values.message}
          error={errors.message}
          onChange={(value) => onChange('message', value)}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      >
        Send message
      </button>
    </form>
  )
}

export default ContactForm
