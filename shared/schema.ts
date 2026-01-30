import { pgTable, text, serial, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  customerNo: text("customer_no"), // Added customer number
  projectType: text("project_type").notNull(), // Residential, Commercial, Industrial
  message: text("message").notNull(),
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  projectType: z.enum(["Residential", "Commercial", "Industrial"]),
  customerNo: z.string().min(1, "Consumer ID is required"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: "You must accept the terms and conditions to submit your quotation request.",
    }),
  }),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
