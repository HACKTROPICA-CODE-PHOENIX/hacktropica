import { z } from "zod";

export const ngoRegistrationSchema = z.object({
  walletAddress: z.string().min(32, "Invalid Solana address"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  mission: z.string().min(10, "Mission statement is too short"),
  description: z.string().min(50, "Please provide more details"),
  fundPlan: z.string().min(20, "Please explain how funds will be used"),
});


export type NgoRegistrationFormData = z.infer<typeof ngoRegistrationSchema>;