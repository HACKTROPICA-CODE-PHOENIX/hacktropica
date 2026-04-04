import { Connection, clusterApiUrl } from "@solana/web3.js";

const endpoint = clusterApiUrl("devnet");
export const solanaConnection = new Connection(endpoint, "confirmed");
export { endpoint };
