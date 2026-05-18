import { useEffect, useState } from "react";
import API from "../../services/api";

const STATUS_CONFIG = {
  pending:  { label: "Pending",  color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)"  },
  accepted: { label: "Accepted", color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.3)"   },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)"   },
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");

  const getBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const counts = {
    all:      bookings.length,
    pending:  bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .mb-root {
          min-height: 100vh;
          background: #08080c;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          padding: 48px 24px 80px;
        }

        .mb-inner {
          max-width: 780px;
          margin: 0 auto;
        }

        /* Header */
        .mb-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 5vw, 2.6rem);
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }

        .mb-title span {
          background: linear-gradient(90deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mb-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 32px;
        }

        /* Filters */
        .mb-filters {
          display: flex;
          gap: 6px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .mb-filter-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-size: 0.8rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mb-filter-btn:hover { color: #fff; border-color: rgba(255,255,255,0.25); }

        .mb-filter-btn.active {
          background: rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.35);
          color: #f97316;
        }

        .mb-count-pill {
          font-size: 0.7rem;
          background: rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 1px 7px;
          color: rgba(255,255,255,0.4);
        }

        .mb-filter-btn.active .mb-count-pill {
          background: rgba(249,115,22,0.15);
          color: #f97316;
        }

        /* Loading */
        .mb-center {
          text-align: center;
          padding: 80px 0;
          color: rgba(255,255,255,0.2);
          font-size: 0.875rem;
        }

        .mb-spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.08);
          border-top-color: #f97316;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* List */
        .mb-list { display: flex; flex-direction: column; gap: 14px; }

        /* Card */
        .mb-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 22px 24px;
          transition: border-color 0.2s;
          animation: fadeUp 0.3s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mb-card:hover { border-color: rgba(255,255,255,0.12); }

        .mb-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .mb-tutor-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mb-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1rem; color: #fff;
          flex-shrink: 0;
        }

        .mb-tutor-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
        }

        .mb-tutor-instrument {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          margin-top: 3px;
        }

        .mb-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding: 5px 12px;
          border-radius: 100px;
          flex-shrink: 0;
        }

        .mb-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Meta */
        .mb-meta {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .mb-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
        }

        /* Message */
        .mb-message {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.3);
          line-height: 1.55;
          font-style: italic;
          padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          border-left: 2px solid rgba(255,255,255,0.06);
          margin-top: 12px;
        }

        /* Empty */
        .mb-empty {
          text-align: center;
          padding: 80px 24px;
          color: rgba(255,255,255,0.2);
        }

        .mb-empty-icon { font-size: 2.5rem; margin-bottom: 10px; }
        .mb-empty-text { font-size: 0.875rem; }

        @media (max-width: 500px) {
          .mb-root { padding: 28px 16px 60px; }
          .mb-meta { gap: 12px; }
        }
      `}</style>

      <div className="mb-root">
        <div className="mb-inner">

          <h1 className="mb-title">My <span>Bookings</span> 🎵</h1>
          <p className="mb-subtitle">Track all your session requests in one place</p>

          {/* Filters */}
          <div className="mb-filters">
            {["all", "pending", "accepted", "rejected"].map((f) => (
              <button
                key={f}
                className={`mb-filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="mb-count-pill">{counts[f]}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="mb-center">
              <div className="mb-spinner" />
              Loading your bookings…
            </div>
          ) : filtered.length === 0 ? (
            <div className="mb-empty">
              <div className="mb-empty-icon">📭</div>
              <div className="mb-empty-text">
                {filter === "all"
                  ? "You haven't made any bookings yet."
                  : `No ${filter} bookings found.`}
              </div>
            </div>
          ) : (
            <div className="mb-list">
              {filtered.map((booking, i) => {
                const cfg  = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
                const name = booking.tutor?.user?.fullName || "Tutor";

                return (
                  <div
                    className="mb-card"
                    key={booking._id}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="mb-card-top">
                      <div className="mb-tutor-row">
                        <div className="mb-avatar">
                          {name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="mb-tutor-name">{name}</div>
                          <div className="mb-tutor-instrument">
                            🎵 {booking.tutor?.instrument}
                          </div>
                        </div>
                      </div>

                      <span
                        className="mb-status"
                        style={{
                          color: cfg.color,
                          background: cfg.bg,
                          border: `1px solid ${cfg.border}`,
                        }}
                      >
                        <span className="mb-status-dot" />
                        {cfg.label}
                      </span>
                    </div>

                    <div className="mb-meta">
                      <div className="mb-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {booking.date}
                      </div>
                      <div className="mb-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {booking.time}
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mb-message">"{booking.message}"</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default MyBookings;