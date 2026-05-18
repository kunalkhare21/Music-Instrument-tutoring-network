import { Link } from "react-router-dom";

function Home() {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); }
    catch { return null; }
  })();

  const instruments = [
    { emoji: "🎸", label: "Guitar" },
    { emoji: "🎹", label: "Piano" },
    { emoji: "🎺", label: "Trumpet" },
    { emoji: "🎻", label: "Violin" },
    { emoji: "🥁", label: "Drums" },
    { emoji: "🪗", label: "Accordion" },
  ];

  const features = [
    {
      icon: "🎯",
      title: "Expert Tutors",
      desc: "Learn from verified professional musicians with years of teaching experience.",
    },
    {
      icon: "📅",
      title: "Flexible Booking",
      desc: "Schedule sessions at your convenience — mornings, evenings, weekends.",
    },
    {
      icon: "⚡",
      title: "Any Skill Level",
      desc: "Whether you're a complete beginner or want to refine your skills, we have a tutor for you.",
    },
    {
      icon: "💬",
      title: "Personalised Learning",
      desc: "Send a message to your tutor before the session so they can tailor it to your goals.",
    },
  ];

  const stats = [
    { value: "50+", label: "Expert Tutors" },
    { value: "500+", label: "Sessions Booked" },
    { value: "10+", label: "Instruments" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home {
          background: #08080c;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .hero {
          max-width: 900px;
          margin: 0 auto;
          padding: 90px 24px 80px;
          text-align: center;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #f97316;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.2);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 28px;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 7vw, 5rem);
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 22px;
        }

        .hero-title .grad {
          background: linear-gradient(90deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 40px;
        }

        .hero-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f97316, #ec4899);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(249,115,22,0.35);
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          box-shadow: 0 6px 32px rgba(249,115,22,0.5);
          transform: translateY(-2px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 12px;
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
          background: rgba(255,255,255,0.04);
        }

        /* ── Instruments ── */
        .instruments {
          padding: 60px 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
        }

        .instruments-label {
          text-align: center;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
          margin-bottom: 32px;
        }

        .instruments-grid {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          max-width: 700px;
          margin: 0 auto;
        }

        .instr-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 0.875rem;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s;
          cursor: default;
        }

        .instr-pill:hover {
          border-color: rgba(249,115,22,0.35);
          color: #fff;
          background: rgba(249,115,22,0.06);
        }

        /* ── Stats ── */
        .stats {
          max-width: 900px;
          margin: 0 auto;
          padding: 72px 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          text-align: center;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          background: linear-gradient(90deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        /* ── Features ── */
        .features {
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 80px 24px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          letter-spacing: -0.03em;
          text-align: center;
          margin-bottom: 10px;
        }

        .section-sub {
          text-align: center;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 52px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 28px 24px;
          transition: border-color 0.2s, transform 0.2s;
        }

        .feature-card:hover {
          border-color: rgba(249,115,22,0.25);
          transform: translateY(-3px);
        }

        .feature-icon {
          font-size: 1.8rem;
          margin-bottom: 14px;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 8px;
        }

        .feature-desc {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
        }

        /* ── CTA ── */
        .cta {
          max-width: 680px;
          margin: 0 auto;
          padding: 90px 24px;
          text-align: center;
        }

        .cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 5vw, 3rem);
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .cta-sub {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 36px;
          line-height: 1.7;
        }

        @media (max-width: 640px) {
          .stats { grid-template-columns: repeat(2, 1fr); }
          .hero { padding: 60px 20px 60px; }
        }
      `}</style>

      <div className="home">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-tag">🎸 Music Tutoring Platform</div>

          <h1 className="hero-title">
            Unleash Your<br />
            <span className="grad">Inner Musician</span>
          </h1>

          <p className="hero-sub">
            Connect with expert music tutors and start your journey today.
            Whether you're a complete beginner or a seasoned player — we have the right tutor for you.
          </p>

          <div className="hero-btns">
            <Link to="/tutors" className="btn-primary">
              Browse Tutors →
            </Link>
            {!user && (
              <Link to="/signup" className="btn-secondary">
                Create Free Account
              </Link>
            )}
            {user?.role !== "tutor" && user && (
              <Link to="/create-tutor" className="btn-secondary">
                Become a Tutor
              </Link>
            )}
          </div>
        </section>

        {/* ── Instruments ── */}
        <section className="instruments">
          <p className="instruments-label">Available instruments</p>
          <div className="instruments-grid">
            {instruments.map(({ emoji, label }) => (
              <div key={label} className="instr-pill">
                <span>{emoji}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="stats">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </section>

        {/* ── Features ── */}
        <section className="features">
          <h2 className="section-title">Why Klef<span style={{
            background: "linear-gradient(90deg,#f97316,#ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>ly?</span></h2>
          <p className="section-sub">Everything you need to start learning music</p>

          <div className="features-grid">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon">{icon}</div>
                <div className="feature-title">{title}</div>
                <p className="feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta">
          <h2 className="cta-title">
            Ready to Start<br />
            <span style={{
              background: "linear-gradient(90deg,#f97316,#ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Playing?</span>
          </h2>
          <p className="cta-sub">
            Find your perfect tutor today and book your first session in minutes.
            No long-term commitment required.
          </p>
          <div className="hero-btns">
            <Link to="/tutors" className="btn-primary">
              Find a Tutor →
            </Link>
            {!user && (
              <Link to="/signup" className="btn-secondary">
                Sign Up Free
              </Link>
            )}
          </div>
        </section>

      </div>
    </>
  );
}

export default Home;