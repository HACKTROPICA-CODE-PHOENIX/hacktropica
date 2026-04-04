export interface VerificationStatus {
  aiVerified: boolean;
  trustScore: number;
  reasoning: string;
}

export interface NGO {
  id: string; // Map _id to id for easier frontend use, or keep _id. I'll use id.
  walletAddress: string;
  profile: {
    name: string;
    mission: string;
    description: string;
    fundPlan: string;
  };
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface Campaign {
  id: string;
  ngoId: string;
  title: string;
  description: string;
  targetSol: number;
  raisedSol: number;
  createdAt: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  donorWallet: string;
  amountSol: number;
  transactionSignature: string;
  timestamp: string;
}

export interface ImpactUpdate {
  id: string;
  campaignId: string;
  type: "logistics" | "delivery" | "purchase";
  title: string;
  description: string;
  imageUrl: string;
  postedAt: string;
}

export const DUMMY_NGOS: NGO[] = [
  {
    id: "ngo_001",
    walletAddress: "8xR2...YqL9",
    profile: {
      name: "Global Food Initiative",
      mission: "Eradicating hunger in disaster-struck regions.",
      description:
        "We partner with local farmers to source and distribute high-nutrition meal packs to communities affected by natural disasters.",
      fundPlan:
        "80% goes to bulk food purchase, 15% to ground logistics, 5% to operational overhead.",
    },
    verificationStatus: {
      aiVerified: true,
      trustScore: 94,
      reasoning:
        "Clear logistical breakdown and highly specific fund allocation plan. Historical data matches stated goals.",
    },
    createdAt: "2023-10-01T10:00:00Z",
  },
  {
    id: "ngo_002",
    walletAddress: "3aM7...PzW1",
    profile: {
      name: "Ocean Tech Cleanup",
      mission: "Removing microplastics using autonomous drones.",
      description:
        "Deploying solar-powered aquatic drones in the Pacific to filter and compress microplastics for safe disposal.",
      fundPlan:
        "Buying 5 new drone units at 10 SOL each, and funding battery replacements.",
    },
    verificationStatus: {
      aiVerified: true,
      trustScore: 88,
      reasoning:
        "Technically sound hardware plan, though cost per unit is slightly above market average. Overall mission is clear.",
    },
    createdAt: "2023-10-05T14:30:00Z",
  },
  {
    id: "ngo_003",
    walletAddress: "9vK4...BcN2",
    profile: {
      name: "Hope Foundation",
      mission: "Making the world a better place for everyone.",
      description:
        "We are raising funds to do good things in the world and help people who need it most.",
      fundPlan:
        "We will use the money to buy things people need and give it to them.",
    },
    verificationStatus: {
      aiVerified: false,
      trustScore: 32,
      reasoning:
        "Extremely vague mission statement and lack of specific financial planning. High risk of mismanagement.",
    },
    createdAt: "2023-10-10T09:15:00Z",
  },
];

export const DUMMY_CAMPAIGNS: Campaign[] = [
  {
    id: "camp_001",
    ngoId: "ngo_001", // Links to Global Food Initiative
    title: "Flood Relief Meals - Region Alpha",
    description:
      "Providing 10,000 hot meals to displaced families in the flooded northern sectors.",
    targetSol: 150,
    raisedSol: 125.5,
    createdAt: "2023-10-12T08:00:00Z",
  },
  {
    id: "camp_002",
    ngoId: "ngo_002", // Links to Ocean Tech Cleanup
    title: "Fleet Expansion Phase 1",
    description:
      "Funding the deployment of 5 new cleanup drones before the stormy season.",
    targetSol: 50,
    raisedSol: 10,
    createdAt: "2023-10-15T11:00:00Z",
  },
];

export const DUMMY_DONATIONS: Donation[] = [
  {
    id: "don_001",
    campaignId: "camp_001",
    donorWallet: "5kP9...RtQ4",
    amountSol: 5.0,
    transactionSignature: "4x...signature...hash...9y",
    timestamp: "2023-10-13T12:05:00Z",
  },
  {
    id: "don_002",
    campaignId: "camp_001",
    donorWallet: "7mJ2...LpX8",
    amountSol: 10.5,
    transactionSignature: "2z...signature...hash...8b",
    timestamp: "2023-10-14T09:30:00Z",
  },
  {
    id: "don_003",
    campaignId: "camp_002",
    donorWallet: "1aB3...CdE4",
    amountSol: 10.0,
    transactionSignature: "9f...signature...hash...1q",
    timestamp: "2023-10-16T16:45:00Z",
  },
];

export const DUMMY_UPDATES: ImpactUpdate[] = [
  {
    id: "upd_001",
    campaignId: "camp_001",
    type: "purchase",
    title: "First Batch of Ingredients Secured",
    description:
      "Successfully purchased 2 tons of rice and lentils from local suppliers.",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=600&q=80",
    postedAt: "2023-10-14T10:00:00Z",
  },
  {
    id: "upd_002",
    campaignId: "camp_001",
    type: "delivery",
    title: "Day 1 Distribution Complete",
    description: "Served 2,500 hot meals in Sector 4 relief camps today.",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
    postedAt: "2023-10-15T18:00:00Z",
  },
];
