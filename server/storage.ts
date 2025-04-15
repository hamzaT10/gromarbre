import { users, type User, type InsertUser, contactForms, type ContactForm, type InsertContactForm } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  saveContactForm(contactForm: InsertContactForm): Promise<ContactForm>;
  getContactForms(): Promise<ContactForm[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactForms: Map<number, ContactForm>;
  currentId: number;
  contactFormId: number;

  constructor() {
    this.users = new Map();
    this.contactForms = new Map();
    this.currentId = 1;
    this.contactFormId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form methods implementation
  async saveContactForm(contactFormData: InsertContactForm): Promise<ContactForm> {
    const id = this.contactFormId++;
    const now = new Date();
    
    const contactForm: ContactForm = {
      id,
      name: contactFormData.name,
      email: contactFormData.email,
      phone: contactFormData.phone,
      subject: contactFormData.subject || "", // Handle optional field
      message: contactFormData.message,
      createdAt: now
    };
    
    this.contactForms.set(id, contactForm);
    return contactForm;
  }
  
  async getContactForms(): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
