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

const supportOptions: Array<{ title: string; detail: string }> = [
  { title: 'Email', detail: 'support@noroffshop.com' },
  { title: 'Phone', detail: '+47 45 00 11 22' },
  { title: 'Hours', detail: 'Mon – Fri, 08:00 – 17:00 CET' },
]

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
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <section className="rounded-3xl bg-linear-to-r from-slate-900 to-slate-700 p-10 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Need a hand?</p>
        <h1 className="mt-4 text-3xl font-bold">Get in touch with our team</h1>
        <p className="mt-3 max-w-2xl text-base text-slate-200">
          Send us a message and we will respond within one business day. You can also reach us through the
          channels below.
        </p>
      </section>
      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr,1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact details</h2>
          <ul className="mt-6 space-y-4">
            {supportOptions.map((option) => (
              <li key={option.title} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {option.title}
                </p>
                <p className="text-lg font-semibold text-slate-900">{option.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900">Send us a message</h2>
          <p className="mt-2 text-sm text-slate-600">All fields are required so we can assist you quickly.</p>
          <div className="mt-6">
            <ContactForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
