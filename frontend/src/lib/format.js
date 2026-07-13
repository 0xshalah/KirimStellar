import { CONFIG } from "../config.js";

const idrFmt = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

export function formatIdr(amount) {
  return idrFmt.format(Math.round(amount || 0));
}

export function toIdr(assetAmount) {
  return (Number(assetAmount) || 0) * CONFIG.idrRate;
}

export function formatAmount(n, dp = 2) {
  const num = Number(n) || 0;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

// Short middle-ellipsis for addresses / hashes: GDPK…VBVT
export function shortKey(key, head = 4, tail = 4) {
  if (!key) return "";
  if (key.length <= head + tail + 1) return key;
  return `${key.slice(0, head)}…${key.slice(-tail)}`;
}

// Initials for avatars.
export function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Relative-ish time label for a JS Date.
export function timeLabel(date) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - d;
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "Baru saja";
  if (min < 60) return `${min} mnt lalu`;
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) {
    return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function clockLabel(date = new Date()) {
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}
