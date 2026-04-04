"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ngoRegistrationSchema, NgoRegistrationFormData } from "@/validator/schemas/zodSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NgoForm() {
  const { connected, address } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NgoRegistrationFormData>({
    resolver: zodResolver(ngoRegistrationSchema as any),
    defaultValues: {
      walletAddress: address || "",
    },
  });

  const onSubmit = async (data: NgoRegistrationFormData) => {
    if (!connected) {
      setError("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setError(null);

    // Make sure the wallet address is up-to-date
    if (address) {
      data.walletAddress = address;
    }

    try {
      const response = await fetch("/api/ngo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.errors ? JSON.stringify(result.errors) : "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <Card className="w-full max-w-2xl bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Create NGO</CardTitle>
          <CardDescription className="text-gray-400">
            Please connect your wallet to create an NGO.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl bg-white/5 border-white/10 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white">Create NGO Profile</CardTitle>
        <CardDescription className="text-gray-400">
          Register your NGO on Donor FI to start raising funds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-200">NGO Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g. Save The Ocean"
              className="bg-dark-surface/50 border-dark-border text-white"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission" className="text-gray-200">Mission Statement</Label>
            <Input
              id="mission"
              {...register("mission")}
              placeholder="Brief mission statement..."
              className="bg-dark-surface/50 border-dark-border text-white"
            />
            {errors.mission && <p className="text-red-500 text-xs">{errors.mission.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-200">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Detailed description of your NGO..."
              className="bg-dark-surface/50 border-dark-border text-white min-h-[100px]"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fundPlan" className="text-gray-200">Fund Plan</Label>
            <Textarea
              id="fundPlan"
              {...register("fundPlan")}
              placeholder="How will the funds be used?"
              className="bg-dark-surface/50 border-dark-border text-white min-h-[100px]"
            />
            {errors.fundPlan && <p className="text-red-500 text-xs">{errors.fundPlan.message}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-500 text-black hover:bg-brand-600 font-bold"
          >
            {loading ? "Registering..." : "Create NGO"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
