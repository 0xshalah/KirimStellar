import { useState } from "react";
import { SendHorizontal, BadgePercent, ShieldCheck, ArrowRight } from "lucide-react";
import { useApp } from "../state/store.jsx";

const SLIDES = [
  { Icon: SendHorizontal, title: "Kirim ke rumah, dalam detik", text: "Uang sampai ke keluarga sebelum kamu sempat tutup aplikasi. Bukan dua hari lagi." },
  { Icon: BadgePercent, title: "Biaya nyaris nol", text: "Bayar di bawah 0,1%, bukan 5-7%. Hampir semua uangmu sampai ke keluarga." },
  { Icon: ShieldCheck, title: "Kamu pegang kuncinya", text: "Non-custodial: kamu tanda tangan sendiri lewat Freighter. KirimStellar tidak pernah menyentuh danamu." },
];

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const Icon = slide.Icon;
  const last = i === SLIDES.length - 1;

  return (
    <div className="app-body" style={{ overflow: "hidden" }}>
      <div className="onb">
        <div className="onb-visual"><div className="onb-art"><Icon size={56} /></div></div>
        <div className="onb-body">
          <h2>{slide.title}</h2>
          <p>{slide.text}</p>
          <div className="dots-row">
            {SLIDES.map((_, idx) => <span key={idx} className={idx === i ? "active" : ""} />)}
          </div>
          <div className="onb-actions">
            <button className="onb-skip" onClick={completeOnboarding}>Lewati</button>
            <button className="btn btn-primary btn-auto" onClick={() => (last ? completeOnboarding() : setI(i + 1))}>
              {last ? "Mulai" : "Lanjut"} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
