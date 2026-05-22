// Tweaks panel for Chaos RPG grimoire
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#8b5cf6",
  "density": "cozy",
  "ornaments": true,
  "motion": true
}/*EDITMODE-END*/;

const ACCENTS = {
  "#8b5cf6": { name: "amethyst",  soft: "#a78bfa", glow: "rgba(139,92,246,0.28)", deep: "#4c1d95" },
  "#c026d3": { name: "orquídea",  soft: "#e879f9", glow: "rgba(192,38,211,0.28)", deep: "#701a75" },
  "#3b82f6": { name: "safira",    soft: "#60a5fa", glow: "rgba(59,130,246,0.28)", deep: "#1e3a8a" },
  "#dc2626": { name: "sangue",    soft: "#f87171", glow: "rgba(220,38,38,0.28)",  deep: "#7f1d1d" },
};

function applyAccent(hex) {
  const m = ACCENTS[hex] || ACCENTS["#8b5cf6"];
  const root = document.documentElement.style;
  root.setProperty('--accent', hex);
  root.setProperty('--accent-soft', m.soft);
  root.setProperty('--accent-glow', m.glow);
  root.setProperty('--orchid', m.soft);
  root.setProperty('--amethyst', hex);
  root.setProperty('--violet-deep', m.deep);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyAccent(t.accent); }, [t.accent]);
  React.useEffect(() => { document.body.dataset.density = t.density; }, [t.density]);
  React.useEffect(() => { document.body.dataset.ornaments = t.ornaments ? 'on' : 'off'; }, [t.ornaments]);
  React.useEffect(() => { document.body.dataset.motion = t.motion ? 'full' : 'reduced'; }, [t.motion]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Aura" />
      <TweakColor
        label="Cor de acento"
        value={t.accent}
        options={Object.keys(ACCENTS)}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakSection label="Pergaminho" />
      <TweakRadio
        label="Densidade"
        value={t.density}
        options={['cozy', 'compact']}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakToggle
        label="Ornamentos"
        value={t.ornaments}
        onChange={(v) => setTweak('ornaments', v)}
      />
      <TweakToggle
        label="Movimento"
        value={t.motion}
        onChange={(v) => setTweak('motion', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
