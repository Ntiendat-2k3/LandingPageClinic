export interface Doctor {
  name: string
  specialty: string
  experience: string
  credentials: string
}

export interface Service {
  title: string
  desc: string
  benefit: string
}

export interface Goal {
  title: string
  desc: string
  icon: any
}

export interface ProcessStep {
  step: string
  title: string
  desc: string
}

export interface PricingItem {
  service: string
  price: string
}

export interface Equipment {
  name: string
  desc: string
  icon: any
}

export interface Testimonial {
  name: string
  review: string
  rating: number
}

export interface FAQ {
  q: string
  a: string
}

export interface ContactInfo {
  address: string
  phone: string
  hours: string
  emergency: string
}
