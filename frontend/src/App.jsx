import { useApp } from "./state/store.jsx";
import DemoBar from "./components/DemoBar.jsx";
import Landing from "./screens/public/Landing.jsx";
import Login from "./screens/public/Login.jsx";
import Register from "./screens/public/Register.jsx";
import Onboarding from "./screens/Onboarding.jsx";
import Home from "./screens/Home.jsx";
import Send from "./screens/Send.jsx";
import Review from "./screens/Review.jsx";
import Sending from "./screens/Sending.jsx";
import Success from "./screens/Success.jsx";
import Track from "./screens/Track.jsx";
import Claim from "./screens/Claim.jsx";
import History from "./screens/History.jsx";
import TxDetail from "./screens/TxDetail.jsx";
import Recipients from "./screens/Recipients.jsx";
import Account from "./screens/Account.jsx";
import Topup from "./screens/Topup.jsx";

const SCREENS = {
  home: Home,
  history: History,
  recipients: Recipients,
  account: Account,
  send: Send,
  review: Review,
  sending: Sending,
  success: Success,
  track: Track,
  claim: Claim,
  detail: TxDetail,
  topup: Topup,
};

const PUBLIC = {
  landing: Landing,
  login: Login,
  register: Register,
};

export default function App() {
  const { address, route, authView, onboarded } = useApp();

  // Unauthenticated: full demo — show ALL screens via DemoBar, not just public.
  if (!address) {
    const View = SCREENS[authView] || PUBLIC[authView] || Landing;
    return (
      <>
        <View />
        <DemoBar />
      </>
    );
  }

  // First run after connecting: onboarding (inside app frame).
  const Screen = !onboarded ? Onboarding : SCREENS[route] || Home;

  return (
    <>
      <div className="app-shell">
        <div className="app"><Screen /></div>
      </div>
      <DemoBar />
    </>
  );
}
