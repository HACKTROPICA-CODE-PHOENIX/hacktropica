import { X } from "lucide-react";
import { z } from "zod";

export const ngoRegistrationSchema = z.object({
  walletAddress: z.string().min(32, "Invalid Solana address"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  mission: z.string().min(10, "Mission statement is too short"),
  description: z.string().min(50, "Please provide more details"),
  fundPlan: z.string().min(20, "Please explain how funds will be used"),
});


export type NgoRegistrationFormData = z.infer<typeof ngoRegistrationSchema>;


export const campaignSchema = z.object({
  ngoWalletAddress: z.string().min(32, "Invalid Solana address"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(50, "Please provide more details"),
  targetSol: z.number().min(1, "Target amount must be at least 1 SOL"),
  raisedSol: z.number().min(0, "Raised amount cannot be negative"),
  status: z.enum(["active", "completed"])
})

export type CampaignFormData = z.infer<typeof campaignSchema>;  


export const donationSchema = z.object({
  campaignId: z.string().min(1, "Campaign ID is required"),
  amount: z.number().min(1, "Donation amount must be at least 1 SOL"),  
})

export type DonationFormData = z.infer<typeof donationSchema>;

export const updateSchema = z.object({
  campaignId: z.string().min(1, "Campaign ID is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(50, "Please provide more details"),
  type: z.enum(["logistics", "delivery", "purchase"])
})

export type UpdateFormData = z.infer<typeof updateSchema>;