import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import { customers } from "@/db/schema";
import {z} from 'zod';

export const insertCustomerSchema = createInsertSchema(customers, {
    firstName: () => z.string().min(1, "First name is required"),
    lastName: () => z.string().min(1, "Last name is required"),
    address1: () => z.string().min(1, "Address is required"),
    city: () => z.string().min(1, "City is required"),
    state: () => z.string().min(1, "State is required"),
    email: () => z.string().email("Invalid email address").min(1, "Email is required"),
    zip: () => z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code use 5 digits or 5 digits followed by hyphen and 4 digits"),
    phone: () => z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format use xxx-xxx-xxxx"),
})

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;