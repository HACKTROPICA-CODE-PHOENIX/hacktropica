import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.url(),  
  NODE_ENV: z.enum(["development", "production"]),
})

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:", z.flattenError(parsed.error));
    process.exit(1);
}

console.log("✅ Environment variables are valid");


export const env = parsed.data;