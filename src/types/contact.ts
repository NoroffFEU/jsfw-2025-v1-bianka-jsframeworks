export interface ContactFormValues {
  fullName: string
  subject: string
  email: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>
