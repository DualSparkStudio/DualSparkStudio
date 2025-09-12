import { type Contact, type InsertContact, type InsertProject, type InsertUser, type Project, type Service, type User } from "@shared/schema";
import { projects as projectsData, services as servicesData } from "../client/src/lib/data";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | null>;
  deleteProject(id: number): Promise<boolean>;
  getServices(): Promise<Service[]>;
  createContact(contact: InsertContact & { createdAt: string }): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private projects: Map<number, Project>;
  private contactId: number;
  private projectId: number;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.projects = new Map();
    this.currentId = 1;
    this.contactId = 1;
    this.projectId = 1;
    
    // Initialize with existing projects data
    projectsData.forEach(project => {
      this.projects.set(project.id, project);
      if (project.id >= this.projectId) {
        this.projectId = project.id + 1;
      }
    });
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
    return Array.from(this.projects.values());
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const project: Project = { ...projectData, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | null> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      return null;
    }
    
    const updatedProject: Project = { ...existingProject, ...projectData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
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
