
import { useEffect, useRef, useState } from "react";
import "./App.css";

const bootLines = [
  "CONNECTING TO THE HUMAN INTERNET...",
  "RETRIEVING QUESTIONABLE IDEAS...",
  "WAKING UP OLD SERVERS...",
  "CALCULATING HOW THIS BECAME A BUSINESS...",
  "CHECKING FOR HUMAN ERROR...",
  "COMPILING BAD DECISIONS...",
  "SUCCESS. PROBABLY.",
];

const chaosMessages = [
  "I SAID DON'T CLICK IT",
  "SERIOUSLY. STOP.",
  "THE LAB HAS NOTED YOUR BEHAVIOR.",
  "THIS IS BECOMING A TERRIBLE IDEA.",
];

function App() {
  const [bootIndex, setBootIndex] = useState(0);
  const [booted, setBooted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [problem, setProblem] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    if (bootIndex >= bootLines.length - 1) {
      const t = setTimeout(() => setBooted(true), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootIndex((v) => v + 1), 1050);
    return () => clearTimeout(t);
  }, [bootIndex]);

  const sound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.21);
    } catch {}
  };

  const chaos = () => {
    sound();
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setShowReveal(true);
      return;
    }
    document.body.classList.toggle("shake", next >= 2);
  };

  const diagnose = () => {
    if (!problem.trim()) {
      setDiagnosis("ERROR: No problem detected. You may be the problem.");
      return;
    }
    const answers = [
      "DIAGNOSIS: Repetitive work detected. Humans should probably not be doing this.",
      "ANALYSIS: Your process has achieved impressive levels of unnecessary complexity.",
      "LAB RESULT: There is almost certainly an automation hiding in here.",
      "PROBABILITY: 97.3% chance this can be faster, cheaper, or less annoying.",
    ];
    setDiagnosis(answers[Math.floor(Math.random() * answers.length)]);
  };

  if (!booted) {
    return (
      <div className="boot-screen">
        <div className="boot-box">
          <div className="spinner" />
          <div className="boot-brand">GLIDEQUANTUMLABS</div>
          <h1>{bootLines[bootIndex]}</h1>
          <p>PROCESS ID: GQL-{String(2014 + bootIndex).padStart(4, "0")}</p>
          <div className="progress"><span style={{ width: `${((bootIndex + 1) / bootLines.length) * 100}%` }} /></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`crazy-app ${showReveal ? "revealed" : ""}`}>
      <div className="scanlines" />
      <div className="noise" />

      <nav>
        <div className="brand"><b>GQ</b> GLIDEQUANTUMLABS</div>
        <div className="live"><i /> SYSTEM ONLINE</div>
      </nav>

      <main>
        <section className="hero">
          <div className="eyebrow">⚠ UNUSUAL ACTIVITY DETECTED</div>
          <h1>
            WE BUILT
            <br />
            SOMETHING
            <br />
            <em>UNNECESSARY.</em>
          </h1>
          <p className="hero-copy">
            It started as an experiment.
            <br />
            Then someone gave it internet access.
            <br />
            We are not taking questions at this time.
          </p>

          <div className="warning">
            <span>SECURITY WARNING</span>
            <strong>DO NOT PRESS THE BUTTON.</strong>
          </div>

          <button className="panic" onClick={chaos}>
            {clicks === 0 ? "DO NOT PRESS" : chaosMessages[Math.min(clicks - 1, chaosMessages.length - 1)]}
          </button>

          {clicks > 0 && (
            <div className="click-counter">
              CURIOSITY LEVEL: {clicks} / 5
              <span>{Array.from({length: 5}, (_, i) => <i key={i} className={i < clicks ? "on" : ""} />)}</span>
            </div>
          )}

          {showReveal && (
            <div className="reveal-box">
              <div className="reveal-glitch">FINE.</div>
              <h2>YOU FOUND THE LAB.</h2>
              <p>
                The chaos is intentional. The technology is real.
                We build AI systems, automation and software that remove
                boring work from businesses.
              </p>
              <a href="#diagnostic" className="reveal-cta">GIVE US A REAL PROBLEM →</a>
            </div>
          )}
        </section>

        <section className="truth">
          <div className="truth-number">01 / THE ACTUAL BUSINESS</div>
          <div className="truth-grid">
            <div>
              <h2>THE JOKE<br /><span>ISN'T THE TECH.</span></h2>
            </div>
            <p>
              Behind the nonsense is a serious lab. We design AI workflows,
              automate repetitive operations, build internal tools and connect
              systems that were never designed to talk to each other.
            </p>
          </div>

          <div className="cards">
            <article><small>01</small><h3>AI SYSTEMS</h3><p>Useful intelligence. Less demo theatre.</p></article>
            <article><small>02</small><h3>AUTOMATION</h3><p>If humans repeat it, we investigate it.</p></article>
            <article><small>03</small><h3>SOFTWARE</h3><p>Tools built around the actual problem.</p></article>
          </div>
        </section>

        <section className="diagnostic" id="diagnostic">
          <div className="terminal">
            <header><span>● ● ●</span><b>GQL_DIAGNOSTIC_ENGINE</b><small>v0.∞</small></header>
            <div className="terminal-content">
              <p><span>SYSTEM:</span> GIVE US YOUR WORST BUSINESS PROBLEM.</p>
              <p className="muted">No buzzwords. Tell us the ugly version.</p>
              <textarea value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Example: My team copies data between five systems every morning..." />
              <button onClick={diagnose}>RUN DIAGNOSTICS →</button>
              {diagnosis && <div className="diagnosis">&gt; {diagnosis}</div>}
            </div>
          </div>
        </section>

        <section className="final">
          <div className="eyebrow">THE LAB IS OPEN</div>
          <h2>BORING PROBLEM.<br /><span>UNBORING SOLUTION.</span></h2>
          <p>AI. Automation. Software. Experiments.<br />Occasionally all four at once.</p>
          <a href="mailto:nikethan@glidequantumlabs.com?subject=I%20Have%20A%20Problem" className="contact">START SOMETHING WEIRD →</a>
          <small>nikethan@glidequantumlabs.com</small>
        </section>
      </main>

      <footer>
        <span>© GLIDEQUANTUMLABS</span>
        <span>BUILDING THINGS BEFORE WE FIGURE OUT WHY.</span>
      </footer>
    </div>
  );
}

export default App;
