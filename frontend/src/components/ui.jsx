import { ArrowLeft, SendHorizontal, Home, Clock, Users, User, Plus } from "lucide-react";
import { useApp } from "../state/store.jsx";
import { initials } from "../lib/format.js";

export function Brand() {
  return (
    <div className="brand">
      <span className="mark">
        <SendHorizontal size={17} />
      </span>
      KirimStellar
    </div>
  );
}

export function AppBar({ title, greet, showBack, showAvatar, showNet, name }) {
  const { back, network, push } = useApp();
  return (
    <div className="appbar">
      {showBack && (
        <div className="back" onClick={back} role="button" aria-label="Back">
          <ArrowLeft size={18} />
        </div>
      )}
      <div>
        {greet && <div className="greet">{greet}</div>}
        {title && <div className="ttl">{title}</div>}
      </div>
      {showNet && <span className="net-badge">{network?.network || "TESTNET"}</span>}
      {showAvatar && (
        <div className="avatar" onClick={() => push("account")} role="button">
          {initials(name || "You")}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { key: "home", label: "Home", icon: Home },
  { key: "history", label: "History", icon: Clock },
  { key: "__fab", label: "", icon: Plus },
  { key: "recipients", label: "Recipients", icon: Users },
  { key: "account", label: "Account", icon: User },
];

export function BottomNav() {
  const { route, goTab, push } = useApp();
  return (
    <div className="bottomnav">
      {TABS.map((t) => {
        const Icon = t.icon;
        if (t.key === "__fab") {
          return (
            <button key="fab" className="fab" onClick={() => push("send")} aria-label="Send">
              <Plus size={22} />
            </button>
          );
        }
        return (
          <button
            key={t.key}
            className={route === t.key ? "active" : ""}
            onClick={() => goTab(t.key)}
          >
            <Icon size={20} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function Toast({ children, error, onDone }) {
  return (
    <div className={`toast${error ? " err" : ""}`} onClick={onDone}>
      {children}
    </div>
  );
}
