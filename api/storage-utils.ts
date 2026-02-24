/**
 * Storage utility for Vercel serverless functions
 */

import { inquiries, type Inquiry, type InsertInquiry } from "../shared/schema.js";
import { db } from "./db-utils.js";
import { eq } from "drizzle-orm";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    // Ensure `email` is a string (drizzle's insert expects non-optional fields)
    const values = {
      ...insertInquiry,
      email: insertInquiry.email ?? "",
    } as const;

    const [inquiry] = await db.insert(inquiries).values(values).returning();
    return inquiry;
  }
}

export const storage = new DatabaseStorage();
