import {
  Horizon,
  TransactionBuilder,
  Operation,
  Asset,
  Memo,
  BASE_FEE,
  StrKey,
} from "@stellar/stellar-sdk";
import { CONFIG } from "../config.js";

export const server = new Horizon.Server(CONFIG.horizonUrl, {
  allowHttp: CONFIG.horizonUrl.startsWith("http://"),
});

export function isValidPublicKey(key) {
  try {
    return StrKey.isValidEd25519PublicKey(key);
  } catch {
    return false;
  }
}

export function sendAssetObject() {
  const { isNative, code, issuer } = CONFIG.sendAsset;
  return isNative ? Asset.native() : new Asset(code, issuer);
}

export function sendAssetCode() {
  return CONFIG.sendAsset.code;
}

// Returns null if the account is not funded on the network.
export async function loadAccount(address) {
  try {
    return await server.loadAccount(address);
  } catch (e) {
    if (e?.response?.status === 404) return null;
    throw e;
  }
}

export async function accountExists(address) {
  return (await loadAccount(address)) !== null;
}

export async function getBalances(address) {
  const account = await loadAccount(address);
  if (!account) return { funded: false, native: "0", sendAsset: "0", raw: [] };

  const { isNative, code, issuer } = CONFIG.sendAsset;
  let native = "0";
  let sendAsset = "0";

  for (const b of account.balances) {
    if (b.asset_type === "native") {
      native = b.balance;
      if (isNative) sendAsset = b.balance;
    } else if (!isNative && b.asset_code === code && b.asset_issuer === issuer) {
      sendAsset = b.balance;
    }
  }
  return { funded: true, native, sendAsset, raw: account.balances };
}

// Fund a testnet account via Friendbot (dev convenience).
export async function fundWithFriendbot(address) {
  const res = await fetch(`${CONFIG.friendbotUrl}?addr=${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error("Friendbot gagal mendanai akun");
  return res.json();
}

// Build an unsigned transaction XDR that transfers the configured send asset.
// Uses createAccount when sending native XLM to an unfunded destination.
export async function buildTransferXdr({ source, destination, amount, memo }) {
  const account = await server.loadAccount(source);
  const asset = sendAssetObject();
  const amountStr = String(amount);

  const builder = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: CONFIG.networkPassphrase,
  });

  if (asset.isNative()) {
    const destFunded = await accountExists(destination);
    if (!destFunded) {
      builder.addOperation(
        Operation.createAccount({ destination, startingBalance: amountStr })
      );
    } else {
      builder.addOperation(
        Operation.payment({ destination, asset, amount: amountStr })
      );
    }
  } else {
    builder.addOperation(
      Operation.payment({ destination, asset, amount: amountStr })
    );
  }

  if (memo) builder.addMemo(Memo.text(memo.slice(0, 28)));

  return builder.setTimeout(180).build().toXDR();
}

// Submit a signed transaction (base64 XDR) to Horizon.
export async function submitSignedXdr(signedXdr) {
  const tx = TransactionBuilder.fromXDR(signedXdr, CONFIG.networkPassphrase);
  const res = await server.submitTransaction(tx);
  return { hash: res.hash, ledger: res.ledger, successful: res.successful };
}

// Fetch a normalized recent payment history for an account.
export async function getPayments(address, limit = 20) {
  const { records } = await server
    .payments()
    .forAccount(address)
    .order("desc")
    .limit(limit)
    .call();

  return records
    .filter((r) => ["payment", "create_account"].includes(r.type))
    .map((r) => {
      const isCreate = r.type === "create_account";
      const from = isCreate ? r.funder : r.from;
      const to = isCreate ? r.account : r.to;
      const outgoing = from === address;
      const code = isCreate
        ? "XLM"
        : r.asset_type === "native"
          ? "XLM"
          : r.asset_code;
      return {
        id: r.id,
        hash: r.transaction_hash,
        outgoing,
        counterparty: outgoing ? to : from,
        amount: isCreate ? r.starting_balance : r.amount,
        assetCode: code,
        createdAt: r.created_at,
      };
    });
}
