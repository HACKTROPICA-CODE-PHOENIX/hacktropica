import "dotenv/config"
import { MongoClient } from "mongodb";

const DUMMY_NGOS = [
  {
    walletAddress: "D9j6Z2Y7aBvX9cWQk4T5yN1pM3rL8zJ0vH5gF4dE6aB1",
    profile: {
      name: "Ocean Tech Cleanup",
      mission: "Removing microplastics using autonomous drones.",
      description: "Deploying solar-powered aquatic drones in the Pacific to filter and compress microplastics for safe disposal.",
      fundPlan: "Buying 5 new drone units at 10 SOL each, and funding battery replacements."
    },
    verificationStatus: {
      aiVerified: true,
      trustScore: 88,
      reasoning: "Technically sound hardware plan, though cost per unit is slightly above market average. Overall mission is clear."
    },
    createdAt: new Date("2023-10-05T14:30:00Z")
  },
  {
    walletAddress: "F3k8H1gT9vB2cN5mX7zL4pW6qR0sJ3yK5fD8bN2cA4m7",
    profile: {
      name: "Hope Foundation",
      mission: "Making the world a better place for everyone.",
      description: "We are raising funds to do good things in the world and help people who need it most.",
      fundPlan: "We will use the money to buy things people need and give it to them."
    },
    verificationStatus: {
      aiVerified: false,
      trustScore: 32,
      reasoning: "Extremely vague mission statement and lack of specific financial planning. High risk of mismanagement."
    },
    createdAt: new Date("2023-10-10T09:15:00Z")
  },
  {
    walletAddress: "X7pL9qR2vM5nT8kW1zJ4cB6yN0mF3gD5hK8bJ1cA9vX2",
    profile: {
      name: "Global Food Initiative",
      mission: "Eradicating hunger in disaster-struck regions.",
      description: "We partner with local farmers to source and distribute high-nutrition meal packs to communities affected by natural disasters.",
      fundPlan: "80% goes to bulk food purchase, 15% to ground logistics, 5% to operational overhead."
    },
    verificationStatus: {
      aiVerified: true,
      trustScore: 95,
      reasoning: "Clear logistical breakdown and highly specific fund allocation plan. Historical data matches stated goals."
    },
    createdAt: new Date("2023-10-01T10:00:00Z")
  },
  {
    walletAddress: "B2cN5mX7zL4pW6qR0sJ3yK5fD8bN2cA4m7F3k8H1gT9v",
    profile: {
      name: "Code for Kids",
      mission: "Providing laptops and coding education to underprivileged youth.",
      description: "We set up solar-powered computer labs in rural schools and hire local developers to teach basic web development.",
      fundPlan: "Purchasing 20 refurbished laptops (50 SOL) and paying 2 instructors for a 6-month curriculum (30 SOL)."
    },
    verificationStatus: {
      aiVerified: true,
      trustScore: 91,
      reasoning: "Excellent financial breakdown and measurable impact metrics. Resource allocation is logical."
    },
    createdAt: new Date("2023-10-12T08:00:00Z")
  },
  {
    walletAddress: "M5nT8kW1zJ4cB6yN0mF3gD5hK8bJ1cA9vX2X7pL9qR2v",
    profile: {
      name: "NextGen Crypto Wealth Alliance",
      mission: "Empowering the community through high-yield passive income.",
      description: "Donate to our treasury and we will use trading bots to multiply the funds and give back 10x to the community next year.",
      fundPlan: "Deploying capital into algorithmic flash-loan arbitrage pools for maximum guaranteed returns."
    },
    verificationStatus: {
      aiVerified: false,
      trustScore: 12,
      reasoning: "Severe red flags. Uses language typical of Ponzi schemes and high-yield investment scams. No charitable utility."
    },
    createdAt: new Date("2023-10-15T11:20:00Z")
  },
  {
    walletAddress: "W1zJ4cB6yN0mF3gD5hK8bJ1cA9vX2M5nT8kX7pL9qR2v",
    profile: {
      name: "Urban Wildlife Rescue",
      mission: "Rehabilitating injured city wildlife.",
      description: "Operating a 24/7 clinic for injured birds and small mammals found in metropolitan areas.",
      fundPlan: "Funds needed for rent, veterinary supplies, and specialized food formulas."
    },
    verificationStatus: {
      aiVerified: true,
      trustScore: 78,
      reasoning: "Legitimate cause, but fund allocation lacks specific numbers or vendor quotes. Generally low risk but requires better bookkeeping."
    },
    createdAt: new Date("2023-10-18T14:45:00Z")
  }
];

const DUMMY_CAMPAIGNS = [
  {
    ngoWalletAddress: "8Kz6Wz23Y7iH3B7T7Yt7uP7g2t7uW4uT7Yt7uP7g2t7",
    title: "Flood Relief Meals - Region Alpha",
    description: "Providing 10,000 hot meals to displaced families in the flooded northern sectors.",
    targetSol: 150,
    raisedSol: 125.5,
    status: "completed",
    createdAt: new Date("2026-04-04T13:12:32.148Z")
  },
  {
    ngoWalletAddress: "8Kz6Wz23Y7iH3B7T7Yt7uP7g2t7uW4uT7Yt7uP7g2t7",
    title: "Emergency Blankets & Shelter Tents",
    description: "Procuring 500 heavy-duty thermal blankets and 50 rapid-deploy tents for families who lost their homes.",
    targetSol: 80,
    raisedSol: 12.0,
    status: "active",
    createdAt: new Date("2026-04-03T09:45:10.000Z")
  },
  {
    ngoWalletAddress: "F3k8H1gT9vB2cN5mX7zL4pW6qR0sJ3yK5fD8bN2cA4m7",
    title: "Laptops for Rural Classrooms",
    description: "Providing 50 refurbished laptops and 1 year of Starlink satellite internet to an off-grid high school.",
    targetSol: 120,
    raisedSol: 120,
    status: "active",
    createdAt: new Date("2026-03-25T14:30:00.000Z")
  },
  {
    ngoWalletAddress: "D9j6Z2Y7aBvX9cWQk4T5yN1pM3rL8zJ0vH5gF4dE6aB1",
    title: "Clean Water Wells: Village Project",
    description: "Drilling two sustainable boreholes equipped with solar-powered pumps to serve a community of 800+ residents without local water access.",
    targetSol: 300,
    raisedSol: 245.8,
    status: "completed",
    createdAt: new Date("2026-03-28T08:15:22.000Z")
  },
  {
    ngoWalletAddress: "X7pL9qR2vM5nT8kW1zJ4cB6yN0mF3gD5hK8bJ1cA9vX2",
    title: "Ocean Microplastic Cleanup Drone Phase 2",
    description: "Funding the manufacturing and deployment of a second-generation autonomous drone that filters and compresses microplastics from the ocean surface.",
    targetSol: 500,
    raisedSol: 5.5,
    status: "active",
    createdAt: new Date("2026-04-04T07:00:00.000Z")
  },
  {
    ngoWalletAddress: "M5nT8kW1zJ4cB6yN0mF3gD5hK8bJ1cA9vX2X7pL9q",
    title: "Stray Animal Rescue & Rehab Clinic",
    description: "Covering veterinary costs, specialized food formulas, and shelter rent for our urban wildlife and stray animal rescue operations.",
    targetSol: 45,
    raisedSol: 22.1,
    status: "active",
    createdAt: new Date("2026-04-01T11:20:45.000Z")
  }
];

async function seed() {
  const uri = process.env.DATABASE_URL!;
  if (!uri) {
    throw new Error("Missing DATABASE_URL in .env");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("hacktropica");

    const deleted = await db.collection("campaigns").deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} campaigns`);
    
    const result = await db.collection("campaigns").insertMany(DUMMY_CAMPAIGNS);
    console.log(`🌱 Seeded ${result.insertedCount} campaigns`);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();