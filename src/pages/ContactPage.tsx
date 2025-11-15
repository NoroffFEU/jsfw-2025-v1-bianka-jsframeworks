import { useState } from 'react'
import ContactForm from '../components/contact/ContactForm'
import type { ContactFormErrors, ContactFormValues } from '../types/contact'
import useToast from '../hooks/useToast'

const initialValues: ContactFormValues = {
  fullName: '',
  subject: '',
  email: '',
  message: '',
}

function validateContact(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full Name must be at least 3 characters.'
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const { showToast } = useToast()

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateContact(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      showToast('Please fix the highlighted fields.')
      return
    }

    setErrors({})
    showToast('Message sent successfully!')
    setValues(initialValues)
  }

  return (
    <div>
      <h1>Contact</h1>
      <ContactForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  )
}

export default ContactPage
