export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  client: string;
  location: string;
  completionDate: string;
  category: string;
  services: string[];
  materials: string[];
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  category: string;
  origin: string;
  finishes: string[];
  applications: string[];
  priceRange?: string;
}

export interface Client {
  id: string;
  name: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
