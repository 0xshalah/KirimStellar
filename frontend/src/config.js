import { Networks } from "@stellar/stellar-sdk";

const env = import.meta.env;

const NETWORK = (env.VITE_STELLAR_NETWORK || "TESTNET").toUpperCase();

export const CONFIG = {
  network: NETWORK,
  networkPassphrase: NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET,
  horizonUrl: env.VITE_HORIZON_URL || "https://horizon-testnet.stellar.org",
  // Asset used for on-chain "Kirim". Empty issuer => native XLM.
  sendAsset: {
    code: env.VITE_SEND_ASSET_CODE || "XLM",
    issuer: env.VITE_SEND_ASSET_ISSUER || "",
    isNative: !env.VITE_SEND_ASSET_ISSUER,
  },
  idrRate: Number(env.VITE_IDR_RATE || 2500),
  escrowContractId: env.VITE_ESCROW_CONTRACT_ID || "",
  friendbotUrl: "https://friendbot.stellar.org",
};

export const EXPLORER_BASE =
  NETWORK === "PUBLIC"
    ? "https://stellar.expert/explorer/public"
    : "https://stellar.expert/explorer/testnet";

export const explorerTx = (hash) => `${EXPLORER_BASE}/tx/${hash}`;
export const explorerAccount = (id) => `${EXPLORER_BASE}/account/${id}`;
