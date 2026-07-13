import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as wallet from "../lib/wallet.js";
import { getBalances, getPayments } from "../lib/stellar.js";

const AppContext = createContext(null);

const RECIPIENTS_KEY = "kirimstellar.recipients";

// Seeded with a funded testnet account so a real transfer works out of the box.
const DEFAULT_RECIPIENTS = [
  {
    id: "r1",
    name: "Ibu Sri Wahyuni",
    wallet: "GCMMUF2BORBERTSQFN4XE5UMILIGXEYSHT5C3BTHUZQCNCLCN5JC37PH",
    walletLabel: "Freighter",
  },
];

function loadRecipients() {
  try {
    const raw = localStorage.getItem(RECIPIENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return DEFAULT_RECIPIENTS;
}

export function AppProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [walletError, setWalletError] = useState(null);

  const [balances, setBalances] = useState({ funded: false, native: "0", sendAsset: "0" });
  const [transactions, setTransactions] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [recipients, setRecipients] = useState(loadRecipients);

  // Pre-auth marketing/auth flow view.
  const [authView, setAuthView] = useState("landing"); // landing | login | register

  // Navigation stack + transient flow data.
  const [nav, setNav] = useState(["home"]);
  const [draft, setDraft] = useState(null); // { amount, recipient }
  const [result, setResult] = useState(null); // { hash, ledger, amount, recipient }
  const [selectedTx, setSelectedTx] = useState(null); // tx opened from history/home

  const [onboarded, setOnboarded] = useState(() => {
    try {
      return localStorage.getItem("kirimstellar.onboarded") === "1";
    } catch {
      return false;
    }
  });
  const completeOnboarding = useCallback(() => {
    try {
      localStorage.setItem("kirimstellar.onboarded", "1");
    } catch {
      /* ignore */
    }
    setOnboarded(true);
  }, []);

  const route = nav[nav.length - 1];
  const push = useCallback((r) => setNav((s) => [...s, r]), []);
  const back = useCallback(() => setNav((s) => (s.length > 1 ? s.slice(0, -1) : s)), []);
  const goTab = useCallback((r) => setNav([r]), []);

  const refresh = useCallback(async (addr) => {
    const target = addr || address;
    if (!target) return;
    setLoadingData(true);
    try {
      const [b, tx] = await Promise.all([getBalances(target), getPayments(target).catch(() => [])]);
      setBalances(b);
      setTransactions(tx);
    } finally {
      setLoadingData(false);
    }
  }, [address]);

  const connect = useCallback(async () => {
    setConnecting(true);
    setWalletError(null);
    try {
      const installed = await wallet.isFreighterInstalled();
      if (!installed) {
        throw new Error("Freighter belum terpasang. Install ekstensinya dulu di freighter.app");
      }
      const addr = await wallet.connect();
      const net = await wallet.getNetwork().catch(() => null);
      setAddress(addr);
      setNetwork(net);
      setNav(["home"]);
      await refresh(addr);
    } catch (e) {
      setWalletError(e.message || String(e));
      throw e;
    } finally {
      setConnecting(false);
    }
  }, [refresh]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setNetwork(null);
    setBalances({ funded: false, native: "0", sendAsset: "0" });
    setTransactions([]);
    setNav(["home"]);
    setDraft(null);
    setResult(null);
  }, []);

  // Attempt silent reconnect if access was granted previously.
  useEffect(() => {
    (async () => {
      const addr = await wallet.getConnectedAddress();
      if (addr) {
        setAddress(addr);
        const net = await wallet.getNetwork().catch(() => null);
        setNetwork(net);
        refresh(addr);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveRecipient = useCallback((rec) => {
    setRecipients((list) => {
      const exists = list.find((r) => r.id === rec.id);
      const next = exists
        ? list.map((r) => (r.id === rec.id ? rec : r))
        : [...list, { ...rec, id: rec.id || `r${Date.now()}` }];
      try {
        localStorage.setItem(RECIPIENTS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = {
    address,
    network,
    connecting,
    walletError,
    connect,
    disconnect,
    authView,
    setAuthView,
    balances,
    transactions,
    loadingData,
    refresh,
    recipients,
    saveRecipient,
    route,
    nav,
    push,
    back,
    goTab,
    draft,
    setDraft,
    result,
    setResult,
    selectedTx,
    setSelectedTx,
    onboarded,
    completeOnboarding,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
