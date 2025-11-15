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
    <form onSubmit={onSubmit} noValidate>
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
      <button type="submit">Send message</button>
    </form>
  )
}

export default ContactForm
