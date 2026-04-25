import React, { useState, useEffect, useRef } from 'react';

// ── GLOBAL STYLES ──────────────────────────────────────────────
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #16161e;
    --bg2:       #1e1e2a;
    --bg3:       #252535;
    --surface:   #2a2a3d;
    --purple:    #8b5cf6;
    --purple2:   #a78bfa;
    --purple3:   #c4b5fd;
    --violet:    #7c3aed;
    --glow:      rgba(139,92,246,0.35);
    --text:      #e8e8f0;
    --text2:     #a0a0b8;
    --text3:     #6b6b88;
    --border:    rgba(139,92,246,0.18);
    --radius:    14px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    line-height: 1.6;
  }

  h1,h2,h3,h4 { font-family: 'Syne', sans-serif; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 2px; }

  ::selection { background: var(--purple); color: #fff; }

  /* NOISE OVERLAY */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 20px var(--glow); }
    50%      { box-shadow: 0 0 50px var(--glow), 0 0 80px rgba(139,92,246,0.15); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes gradient-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0; }
  }
`;

// ── NAV ────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 2rem',
      background: scrolled ? 'rgba(22,22,30,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '64px',
    }}>
      <span style={{
        fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem',
        background: 'linear-gradient(135deg, var(--purple2), var(--purple3))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        letterSpacing: '1px'
      }}>AYESHA</span>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {links.map(l => (
          <button key={l} onClick={() => setActive(l.toLowerCase())}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans', fontSize: '0.85rem', fontWeight: 500,
              color: active === l.toLowerCase() ? 'var(--purple2)' : 'var(--text2)',
              letterSpacing: '0.5px',
              transition: 'color 0.2s',
              position: 'relative',
              paddingBottom: '2px',
            }}>
            {l}
            {active === l.toLowerCase() && (
              <span style={{
                position: 'absolute', bottom: -4, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, var(--purple), var(--purple3))',
                borderRadius: '2px',
              }} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ── HOME ───────────────────────────────────────────────────────
function Home() {
  const [typed, setTyped] = useState('');
  const titles = ['AI / ML Engineer', 'Python Developer', 'Computer Vision Builder', 'Generative AI Developer'];
  const [tIdx, setTIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[tIdx];
    let timeout;
    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 80);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setTIdx((tIdx + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, tIdx]);

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '80px 2rem 2rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          top: '-100px', right: '-100px',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          bottom: '50px', left: '-50px',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{
        maxWidth: '1100px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 420px', gap: '4rem',
        alignItems: 'center',
      }}>
        {/* Left */}
        <div style={{ animation: 'fadeUp 0.8s ease both' }}>
          <div style={{
            display: 'inline-block', marginBottom: '1.5rem',
            padding: '6px 16px', borderRadius: '100px',
            border: '1px solid var(--border)',
            background: 'rgba(139,92,246,0.08)',
            fontSize: '0.78rem', fontWeight: 500, color: 'var(--purple2)',
            letterSpacing: '1.5px', textTransform: 'uppercase',
          }}>
            AI/ML Fellowship — GDGOC ATK 2026
          </div>

          <h1 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            lineHeight: 1.05, marginBottom: '1rem',
            color: '#fff',
          }}>
            Hi, I'm<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--purple2) 0%, var(--purple3) 50%, #e879f9 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Ayesha</span>
          </h1>

          <div style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300,
            color: 'var(--text2)', marginBottom: '2rem', minHeight: '2rem',
          }}>
            <span style={{ color: 'var(--purple3)' }}>{typed}</span>
            <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--purple)' }}>|</span>
          </div>

          <p style={{
            fontSize: '1rem', lineHeight: 1.8, color: 'var(--text2)',
            maxWidth: '520px', marginBottom: '2.5rem',
          }}>
            Building end-to-end AI systems — from ML model training to full-stack deployment.
            Specialized in Machine Learning, Deep Learning, Generative AI, and Computer Vision.
            12-week AI/ML Fellow at GDGOC ATK.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/Ayesha0000000" target="_blank" rel="noopener noreferrer"
              style={{
                padding: '12px 28px', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--violet), var(--purple))',
                color: '#fff', textDecoration: 'none', fontWeight: 600,
                fontSize: '0.9rem', letterSpacing: '0.3px',
                boxShadow: '0 4px 24px var(--glow)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 32px var(--glow)'; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 24px var(--glow)'; }}>
              View GitHub
            </a>
            <a href="https://www.linkedin.com/in/ayesha-490023374" target="_blank" rel="noopener noreferrer"
              style={{
                padding: '12px 28px', borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'rgba(139,92,246,0.08)',
                color: 'var(--purple2)', textDecoration: 'none', fontWeight: 600,
                fontSize: '0.9rem', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(139,92,246,0.18)'; }}
              onMouseLeave={e => { e.target.style.background = 'rgba(139,92,246,0.08)'; }}>
              LinkedIn
            </a>
            <a href="mailto:gmayesha2004@gmail.com"
              style={{
                padding: '12px 28px', borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'rgba(139,92,246,0.08)',
                color: 'var(--purple2)', textDecoration: 'none', fontWeight: 600,
                fontSize: '0.9rem', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(139,92,246,0.18)'; }}
              onMouseLeave={e => { e.target.style.background = 'rgba(139,92,246,0.08)'; }}>
              Contact Me
            </a>
          </div>
        </div>

        {/* Right — Photo */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeUp 0.8s 0.2s ease both',
        }}>
          <div style={{
            position: 'relative', animation: 'float 5s ease-in-out infinite',
          }}>
            {/* Spinning ring */}
            <div style={{
              position: 'absolute', inset: -16, borderRadius: '50%',
              border: '2px dashed rgba(139,92,246,0.3)',
              animation: 'spin-slow 20s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: -8, borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--purple), transparent, var(--purple2), transparent, var(--purple))',
              animation: 'spin-slow 8s linear infinite reverse',
              padding: '2px',
            }}>
              <div style={{ borderRadius: '50%', background: 'var(--bg)', width: '100%', height: '100%' }} />
            </div>
            <img
              src="/images/ayesha.jpg"
              alt="Ayesha at DevFest"
              style={{
                width: 300, height: 300, borderRadius: '50%',
                objectFit: 'cover', objectPosition: 'center top',
                position: 'relative', zIndex: 1,
                border: '4px solid var(--surface)',
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}
            />
            {/* Badge */}
            <div style={{
              position: 'absolute', bottom: 10, right: -10, zIndex: 2,
              background: 'linear-gradient(135deg, var(--violet), var(--purple))',
              padding: '8px 14px', borderRadius: '100px',
              fontSize: '0.72rem', fontWeight: 700, color: '#fff',
              boxShadow: '0 4px 20px var(--glow)',
              whiteSpace: 'nowrap', letterSpacing: '0.5px',
            }}>
              GDGOC DevFest
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ──────────────────────────────────────────────────────
function About() {
  const stats = [
    { n: '5+', label: 'AI/ML Projects' },
    { n: '99.89%', label: 'Best Model Accuracy' },
    { n: '12', label: 'Week Fellowship' },
    { n: '3', label: 'Cloud Deployments' },
  ];

  return (
    <section style={{ minHeight: '100vh', padding: '120px 2rem 80px', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '4rem', animation: 'fadeUp 0.6s ease both' }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--purple2)', fontWeight: 600 }}>About Me</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '0.5rem', color: '#fff' }}>
            Building AI that<br /><span style={{ color: 'var(--purple2)' }}>actually works</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div style={{ animation: 'fadeUp 0.6s 0.1s ease both' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text2)', marginBottom: '1.5rem' }}>
              I'm Ayesha, an AI/ML Engineer and Software Engineering student from Pakistan. I specialize in building end-to-end AI systems — from raw data to production deployment.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text2)', marginBottom: '1.5rem' }}>
              I completed a 12-week intensive AI/ML Fellowship at GDGOC ATK, where I progressed from Python foundations through Machine Learning, Deep Learning, Computer Vision, and Generative AI — culminating in SAHARA, a full-stack healthcare AI system with 99.89% accuracy.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text2)' }}>
              I've built multimodal AI assistants deployed on Google Cloud Run, computer vision systems using YOLO and DeepFace, RAG pipelines with LlamaIndex, and GANs from scratch. I believe in proof of work — every project is built, deployed, and documented.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <a href="https://ayesha0000000.github.io/Ayesha-portfolio/" target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '10px 22px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--violet), var(--purple))',
                  color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem',
                }}>
                View Portfolio
              </a>
              <a href="https://www.linkedin.com/in/ayesha-490023374" target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '10px 22px', borderRadius: '8px',
                  border: '1px solid var(--border)', background: 'rgba(139,92,246,0.08)',
                  color: 'var(--purple2)', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem',
                }}>
                LinkedIn
              </a>
            </div>
          </div>

          <div style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem',
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding: '1.5rem', borderRadius: 'var(--radius)',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '2rem', fontWeight: 800, fontFamily: 'Syne',
                    background: 'linear-gradient(135deg, var(--purple2), var(--purple3))',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{s.n}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text3)', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            {[
              { year: '2023', text: 'Started B.S. Software Engineering + OpenCV Internship at Skylarks' },
              { year: '2024', text: 'Joined GDGOC as Web Dev & AI/ML Team Member' },
              { year: '2026', text: 'Completed 12-Week AI/ML Fellowship — GDGOC ATK' },
              { year: '2026', text: 'Built SAHARA (Capstone), Aidora-AI & Plant Watering System' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: '48px', padding: '4px 8px', borderRadius: '6px',
                  background: 'rgba(139,92,246,0.12)', border: '1px solid var(--border)',
                  fontSize: '0.72rem', fontWeight: 700, color: 'var(--purple2)',
                  textAlign: 'center',
                }}>{item.year}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.6, paddingTop: '2px' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ─────────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      title: 'AI / Machine Learning',
      color: '#8b5cf6',
      skills: ['Scikit-learn', 'Random Forest', 'XGBoost', 'SVM', 'ANN', 'Logistic Regression', 'Feature Engineering', 'Model Evaluation'],
    },
    {
      title: 'Deep Learning & CV',
      color: '#7c3aed',
      skills: ['TensorFlow', 'Keras', 'PyTorch', 'OpenCV', 'YOLO', 'DeepFace', 'Mediapipe', 'Transfer Learning'],
    },
    {
      title: 'Generative AI',
      color: '#a78bfa',
      skills: ['GANs', 'LLMs', 'RAG', 'LlamaIndex', 'LangChain', 'Transformers', 'Hugging Face', 'Prompt Engineering'],
    },
    {
      title: 'Data & Analysis',
      color: '#8b5cf6',
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'EDA', 'PCA', 't-SNE'],
    },
    {
      title: 'Backend & Cloud',
      color: '#7c3aed',
      skills: ['FastAPI', 'Django', 'REST APIs', 'Docker', 'Google Cloud Run', 'Firebase', 'Vercel', 'Git/GitHub'],
    },
    {
      title: 'Frontend & DB',
      color: '#a78bfa',
      skills: ['React.js', 'HTML5', 'CSS', 'Bootstrap', 'SQLite', 'XAMPP', 'Streamlit', 'JavaScript'],
    },
  ];

  return (
    <section style={{ minHeight: '100vh', padding: '120px 2rem 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', animation: 'fadeUp 0.6s ease both' }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--purple2)', fontWeight: 600 }}>Technical Expertise</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '0.5rem', color: '#fff' }}>
            Skills &amp; <span style={{ color: 'var(--purple2)' }}>Technologies</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {categories.map((cat, ci) => (
            <div key={ci} style={{
              padding: '1.8rem', borderRadius: 'var(--radius)',
              background: 'var(--surface)', border: '1px solid var(--border)',
              animation: `fadeUp 0.6s ${ci * 0.08}s ease both`,
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{
                width: 36, height: 36, borderRadius: '8px', marginBottom: '1rem',
                background: `${cat.color}22`, border: `1px solid ${cat.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 14, height: 14, borderRadius: '3px', background: cat.color }} />
              </div>
              <h3 style={{ fontFamily: 'Syne', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>{cat.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cat.skills.map((sk, si) => (
                  <span key={si} style={{
                    padding: '4px 10px', borderRadius: '100px',
                    fontSize: '0.75rem', fontWeight: 500,
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.18)',
                    color: 'var(--purple3)',
                  }}>{sk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ───────────────────────────────────────────────────
function Projects() {
  const [modal, setModal] = useState(null);

  const getEmbed = (url) => {
    if (!url) return null;
    const m = url.match(/(?:youtu\.be\/|watch\?v=)([^?&]+)/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : null;
  };

  const projects = [
    {
      badge: 'Capstone', badgeColor: '#7c3aed',
      title: 'SAHARA — Smart AI Healthcare Assistant',
      desc: 'Full-stack disease prediction — 41 diseases, 99.89% ANN accuracy, FastAPI + React.',
      tags: ['Python', 'FastAPI', 'React', 'Random Forest', 'ANN', 'TensorFlow'],
      github: 'https://github.com/Ayesha0000000/SAHARA-Smart-AI-Healthcare-Assistance-Rapid-Aid-.git',
      video: 'https://youtu.be/FWPu0-qbt7I',
      isYT: true,
      features: ['41 diseases from 132 symptom inputs (4,920 samples)', 'Random Forest — 100% accuracy', 'ANN — 99.89% accuracy & F1-Score', 'FastAPI /predict/rf & /predict/ann endpoints', 'Full React frontend with real-time inference'],
    },
    {
      badge: 'Peer Project 1', badgeColor: '#8b5cf6',
      title: 'Plant Watering System',
      desc: 'Sensor-based plant health classifier. XGBoost 99.58% | RF 100% | Streamlit.',
      tags: ['Python', 'XGBoost', 'Random Forest', 'Streamlit', 'Scikit-learn'],
      github: 'https://github.com/magic-meer/Plant-Watering-System.git',
      video: null, isYT: false,
      features: ['3-class: Healthy / Needs Water / Overwatered', 'XGBoost 99.58% | RF 100%', 'Stratified 5-Fold Cross-Validation', 'Streamlit real-time decision app'],
    },
    {
      badge: 'Peer Project 2', badgeColor: '#8b5cf6',
      title: 'Aidora-AI — Multimodal Health Assistant',
      desc: 'Camera + voice AI with Google Gemini. Deployed Google Cloud Run + Vercel.',
      tags: ['Python', 'FastAPI', 'Google Gemini AI', 'React', 'Cloud Run'],
      github: 'https://github.com/Ayesha0000000/Aidora-AI.git',
      video: 'https://www.youtube.com/watch?v=CniiS-kSj9c',
      isYT: true,
      features: ['Camera + voice multimodal input', 'Google Gemini AI backend', 'FastAPI on Google Cloud Run', 'React frontend on Vercel'],
    },
    {
      badge: null,
      title: 'Real-Time Emotion Detection',
      desc: 'YOLO face detection + DeepFace deep learning for emotion recognition.',
      tags: ['Python', 'OpenCV', 'YOLO', 'DeepFace', 'TensorFlow'],
      github: 'https://github.com/Ayesha0000000/-Real-Time-Emotion-Detection.git',
      video: '/videos/emotion-detection-demo.mp4',
      isYT: false,
      features: ['Real-time recognition from live camera', 'YOLO-based face detection', 'DeepFace multi-emotion classification'],
    },
    {
      badge: null,
      title: 'Hand Gesture Drawing System',
      desc: 'Touchless drawing via Mediapipe hand tracking and gesture recognition.',
      tags: ['Python', 'OpenCV', 'Mediapipe', 'TensorFlow'],
      github: 'https://github.com/Ayesha0000000/hand-gesture-drawing.git',
      video: '/videos/Hand-gesture drwaing.mp4',
      isYT: false,
      features: ['Real-time hand tracking via Mediapipe', 'Gesture-based touchless drawing', 'Multiple gesture controls'],
    },
  ];

  return (
    <section style={{ minHeight: '100vh', padding: '120px 2rem 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', animation: 'fadeUp 0.6s ease both' }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--purple2)', fontWeight: 600 }}>Work</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '0.5rem', color: '#fff' }}>
            Featured <span style={{ color: 'var(--purple2)' }}>Projects</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <div key={i} style={{
              borderRadius: 'var(--radius)', background: 'var(--surface)',
              border: '1px solid var(--border)', overflow: 'hidden',
              animation: `fadeUp 0.6s ${i * 0.08}s ease both`,
              display: 'flex', flexDirection: 'column',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.45)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>

              {/* Top color bar */}
              <div style={{
                height: '4px',
                background: p.badge
                  ? `linear-gradient(90deg, ${p.badgeColor}, var(--purple3))`
                  : 'linear-gradient(90deg, var(--bg3), var(--surface))',
              }} />

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {p.badge && (
                  <span style={{
                    display: 'inline-block', marginBottom: '0.75rem',
                    padding: '3px 12px', borderRadius: '100px',
                    background: `${p.badgeColor}22`, border: `1px solid ${p.badgeColor}44`,
                    fontSize: '0.7rem', fontWeight: 700, color: 'var(--purple3)',
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                  }}>{p.badge}</span>
                )}

                <h3 style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff', lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>{p.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.2rem' }}>
                  {p.tags.slice(0, 4).map((t, ti) => (
                    <span key={ti} style={{
                      padding: '3px 9px', borderRadius: '100px',
                      fontSize: '0.7rem', fontWeight: 600,
                      background: 'rgba(139,92,246,0.1)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      color: 'var(--purple3)',
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '7px 14px', borderRadius: '8px',
                      background: 'rgba(139,92,246,0.15)', border: '1px solid var(--border)',
                      color: 'var(--purple2)', textDecoration: 'none',
                      fontSize: '0.78rem', fontWeight: 600,
                    }}>GitHub</a>
                  {p.video && (
                    <button onClick={() => setModal(p)}
                      style={{
                        padding: '7px 14px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, var(--violet), var(--purple))',
                        border: 'none', cursor: 'pointer',
                        color: '#fff', fontSize: '0.78rem', fontWeight: 600,
                      }}>Watch Demo</button>
                  )}
                  <a href="https://www.linkedin.com/in/ayesha-490023374" target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '7px 14px', borderRadius: '8px',
                      background: 'rgba(10,102,194,0.15)', border: '1px solid rgba(10,102,194,0.3)',
                      color: '#60a5fa', textDecoration: 'none',
                      fontSize: '0.78rem', fontWeight: 600,
                    }}>LinkedIn</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {modal && (
        <div onClick={() => setModal(null)} style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#000', borderRadius: '16px', overflow: 'hidden',
            width: '90%', maxWidth: '820px', position: 'relative',
            boxShadow: '0 0 80px rgba(139,92,246,0.3)',
          }}>
            <button onClick={() => setModal(null)} style={{
              position: 'absolute', top: 12, right: 12, zIndex: 10,
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: 36, height: 36, cursor: 'pointer', color: '#fff',
              fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>x</button>
            {modal.isYT ? (
              <iframe width="100%" height="460" src={getEmbed(modal.video)}
                title={modal.title} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen style={{ display: 'block' }} />
            ) : (
              <video controls autoPlay style={{ width: '100%', maxHeight: '500px', display: 'block' }}>
                <source src={modal.video} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ── CONTACT ────────────────────────────────────────────────────
function Contact() {
  const links = [
    { label: 'Email', value: 'gmayesha2004@gmail.com', href: 'mailto:gmayesha2004@gmail.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/ayesha-490023374', href: 'https://www.linkedin.com/in/ayesha-490023374' },
    { label: 'GitHub', value: 'github.com/Ayesha0000000', href: 'https://github.com/Ayesha0000000' },
    { label: 'Portfolio', value: 'ayesha0000000.github.io/Ayesha-portfolio/', href: 'https://ayesha0000000.github.io/Ayesha-portfolio/' },
  ];

  return (
    <section style={{ minHeight: '100vh', padding: '120px 2rem 80px', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <span style={{ fontSize: '0.78rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--purple2)', fontWeight: 600 }}>Get In Touch</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0.5rem 0 1rem', color: '#fff' }}>
          Let's <span style={{ color: 'var(--purple2)' }}>Connect</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: '3rem' }}>
          Open to AI/ML internships, research roles, and remote opportunities. Always happy to connect with fellow builders.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.2rem 1.5rem', borderRadius: 'var(--radius)',
                background: 'var(--surface)', border: '1px solid var(--border)',
                textDecoration: 'none', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--purple2)', textTransform: 'uppercase', letterSpacing: '1px' }}>{l.label}</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text2)' }}>{l.value}</span>
            </a>
          ))}
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>
          Based in Pakistan — Available for remote work worldwide
        </p>
      </div>
    </section>
  );
}

// ── APP ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');

  const pages = { home: <Home />, about: <About />, skills: <Skills />, projects: <Projects />, contact: <Contact /> };

  return (
    <>
      <style>{globalCSS}</style>
      <Nav active={page} setActive={setPage} />
      <main style={{ opacity: 1, transition: 'opacity 0.3s' }}>
        {pages[page]}
      </main>
      <footer style={{
        textAlign: 'center', padding: '2rem',
        borderTop: '1px solid var(--border)',
        fontSize: '0.8rem', color: 'var(--text3)',
      }}>
        Ayesha — AI/ML Engineer &amp; Python Developer — Pakistan
      </footer>
    </>
  );
}
