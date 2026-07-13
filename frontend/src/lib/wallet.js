import freighterApi from "@stellar/freighter-api";
import { CONFIG } from "../config.js";

// Thin wrapper over @stellar/freighter-api v6. Every call returns a shape with
// an optional `error` field; we normalize that into thrown Errors here.

export async function isFreighterInstalled() {
  try {
    const res = await freighterApi.isConnected();
    return !!res?.isConnected;
  } catch {
    return false;
  }
}

// Prompts the user to grant access; returns the public key.
export async function connect() {
  const res = await freighterApi.requestAccess();
  if (res?.error) throw new Error(normalizeErr(res.error));
  if (!res?.address) throw new Error("Freighter tidak mengembalikan alamat");
  return res.address;
}

// Returns the address only if access is already granted, else null.
export async function getConnectedAddress() {
  try {
    const allowed = await freighterApi.isAllowed();
    if (!allowed?.isAllowed) return null;
    const res = await freighterApi.getAddress();
    if (res?.error || !res?.address) return null;
    return res.address;
  } catch {
    return null;
  }
}

export async function getNetwork() {
  const res = await freighterApi.getNetworkDetails();
  if (res?.error) throw new Error(normalizeErr(res.error));
  return {
    network: res.network,
    networkPassphrase: res.networkPassphrase,
  };
}

// Signs a transaction XDR; returns the signed XDR string.
export async function signXdr(xdr, address) {
  const res = await freighterApi.signTransaction(xdr, {
    networkPassphrase: CONFIG.networkPassphrase,
    address,
  });
  if (res?.error) throw new Error(normalizeErr(res.error));
  return res.signedTxXdr;
}

function normalizeErr(err) {
  if (typeof err === "string") return err;
  if (err?.message) return err.message;
  return "Terjadi kesalahan pada Freighter";
}
