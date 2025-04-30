import { users, type User, type InsertUser, type Project, type Service, type Contact, type InsertContact } from "@shared/schema";
import { projects as projectsData, services as servicesData } from "../client/src/lib/data";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  getServices(): Promise<Service[]>;
  createContact(contact: InsertContact & { createdAt: string }): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private contactId: number;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.currentId = 1;
    this.contactId = 1;
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

  async getProjects(): Promise<Project[]> {
    // Return the projects from the client data file
    return projectsData;
  }

  async getServices(): Promise<Service[]> {
    // Return the services from the client data file
    return servicesData;
  }

  async createContact(contactData: InsertContact & { createdAt: string }): Promise<Contact> {
    const id = this.contactId++;
    const contact: Contact = { ...contactData, id };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
