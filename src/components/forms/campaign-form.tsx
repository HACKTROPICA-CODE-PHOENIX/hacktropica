"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema, CampaignFormData } from "@/validator/schemas/zodSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";

export function CampaignForm({ onSuccess }: { onSuccess?: () => void }) {
  const { address } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema as any),
    defaultValues: {
      ngoWalletAddress: address || "",
      raisedSol: 0,
      status: "active",
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    setLoading(true);
    setError(null);

    // Make sure the wallet address is up-to-date
    if (address) {
        data.ngoWalletAddress = address;
    }

    try {
      const response = await fetch("/api/campaign/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(result.errors ? JSON.stringify(result.errors) : "Campaign creation failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      
      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-200">Campaign Title</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="e.g. Save The Ocean Initiative"
          className="bg-dark-surface/50 border-dark-border text-white"
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-200">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Detailed description of your campaign..."
          className="bg-dark-surface/50 border-dark-border text-white min-h-[100px]"
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetSol" className="text-gray-200">Target Amount (SOL)</Label>
        <Input
          id="targetSol"
          type="number"
          step="0.01"
          {...register("targetSol", { valueAsNumber: true })}
          placeholder="e.g. 100"
          className="bg-dark-surface/50 border-dark-border text-white"
        />
        {errors.targetSol && <p className="text-red-500 text-xs">{errors.targetSol.message}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full bg-brand-500 text-black hover:bg-brand-600 font-bold"
      >
        {loading ? "Creating..." : "Create Campaign"}
      </Button>
    </form>
  );
}
