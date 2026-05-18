// import { useEffect, useState } from "react"

// import API from "../../services/api"

// function TutorDashboard() {

//     const [bookings, setBookings] = useState([])

//     const getTutorBookings = async () => {

//         try {

//             const token = localStorage.getItem("token")

//             const response = await API.get(
//                 "/bookings/tutor-bookings",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             )
//             console.log(response.data.data)
//             setBookings(response.data.data)

//         } catch (error) {

//             console.log(error)

//         }

//     }

//     useEffect(() => {

//         getTutorBookings()

//     }, [])

//     const updateStatus = async (
//         bookingId,
//         status
//     ) => {

//         try {

//             const token = localStorage.getItem("token")

//             await API.patch(
//                 `/bookings/${bookingId}/status`,
//                 { status },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             )

//             getTutorBookings()

//         } catch (error) {

//             console.log(error)

//         }

//     }

//     return (

//         <div className="min-h-screen bg-gray-100 p-10">

//             <h1 className="text-5xl font-bold mb-10">
//                 Tutor Dashboard 🎸
//             </h1>

//             <div className="grid gap-6">

//                 {
//                     bookings.map((booking) => (

//                         <div
//                             key={booking._id}
//                             className="bg-white rounded-2xl shadow-lg p-6"
//                         >

//                             <div className="flex justify-between items-center mb-4">

//                                 <h2 className="text-3xl font-bold">

//                                     {
//                                         booking.student
//                                             ?.fullName
//                                     }

//                                 </h2>

//                                 <span className="bg-black text-white px-4 py-2 rounded-full">

//                                     {booking.status}

//                                 </span>

//                             </div>

//                             <p className="text-xl mb-2">

//                                 Date:
//                                 {" "}
//                                 {booking.date}

//                             </p>

//                             <p className="text-xl mb-2">

//                                 Time:
//                                 {" "}
//                                 {booking.time}

//                             </p>

//                             <p className="text-gray-600 mb-6">

//                                 {booking.message}

//                             </p>

//                             <div className="flex gap-4">

//                                 <button
//                                     onClick={() =>
//                                         updateStatus(
//                                             booking._id,
//                                             "accepted"
//                                         )
//                                     }
//                                     className="bg-green-600 text-white px-6 py-3 rounded-xl"
//                                 >
//                                     Accept
//                                 </button>

//                                 <button
//                                     onClick={() =>
//                                         updateStatus(
//                                             booking._id,
//                                             "rejected"
//                                         )
//                                     }
//                                     className="bg-red-600 text-white px-6 py-3 rounded-xl"
//                                 >
//                                     Reject
//                                 </button>

//                             </div>

//                         </div>

//                     ))
//                 }

//             </div>

//         </div>

//     )
// }

// export default TutorDashboard


import { useEffect, useState } from "react";
import API from "../../services/api";

// Status config
const STATUS_CONFIG = {
  pending:  { label: "Pending",  color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)"  },
  accepted: { label: "Accepted", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)"   },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)"   },
};

function TutorDashboard() {
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [updating, setUpdating]   = useState(null); // bookingId being updated
  const [filter, setFilter]       = useState("all");

  const getTutorBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/bookings/tutor-bookings", {
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
    getTutorBookings();
  }, []);

  const updateStatus = async (bookingId, status) => {
    setUpdating(bookingId);
    try {
      const token = localStorage.getItem("token");
      await API.patch(
        `/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getTutorBookings();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const counts = {
    all:      bookings.length,
    pending:  bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .td-root {
          min-height: 100vh;
          background: #08080c;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          padding: 40px 24px 80px;
        }

        .td-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        /* Header */
        .td-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .td-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 2.75rem);
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
        }

        .td-title span {
          background: linear-gradient(90deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .td-subtitle {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          margin: 6px 0 0;
        }

        /* Stats row */
        .td-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .td-stat {
          flex: 1;
          min-width: 120px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 16px 20px;
        }

        .td-stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1;
        }

        .td-stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 4px;
        }

        /* Filter tabs */
        .td-filters {
          display: flex;
          gap: 6px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .td-filter-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .td-filter-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.25);
        }

        .td-filter-btn.active {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.4);
          color: #f97316;
        }

        .td-filter-count {
          font-size: 0.7rem;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 1px 7px;
          color: rgba(255,255,255,0.5);
        }

        .td-filter-btn.active .td-filter-count {
          background: rgba(249,115,22,0.2);
          color: #f97316;
        }

        /* Empty state */
        .td-empty {
          text-align: center;
          padding: 80px 24px;
          color: rgba(255,255,255,0.25);
        }

        .td-empty-icon {
          font-size: 3rem;
          margin-bottom: 12px;
        }

        .td-empty-text {
          font-size: 0.9rem;
        }

        /* Loading */
        .td-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px;
          gap: 10px;
          color: rgba(255,255,255,0.3);
          font-size: 0.9rem;
        }

        .td-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: #f97316;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Grid */
        .td-grid {
          display: grid;
          gap: 16px;
        }

        /* Card */
        .td-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 24px;
          transition: border-color 0.2s, background 0.2s;
          animation: fadeUp 0.3s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .td-card:hover {
          border-color: rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.045);
        }

        .td-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .td-student-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .td-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #fff;
          flex-shrink: 0;
        }

        .td-student-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.01em;
        }

        .td-student-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }

        .td-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding: 5px 12px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .td-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Meta row */
        .td-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .td-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
        }

        .td-meta-item svg {
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* Message */
        .td-message {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.55;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          border-left: 2px solid rgba(255,255,255,0.08);
          margin-bottom: 18px;
          font-style: italic;
        }

        /* Actions */
        .td-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .td-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          border-radius: 10px;
          border: none;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.01em;
        }

        .td-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none !important;
        }

        .td-btn-accept {
          background: rgba(34,197,94,0.12);
          color: #22c55e;
          border: 1px solid rgba(34,197,94,0.3);
        }

        .td-btn-accept:hover:not(:disabled) {
          background: rgba(34,197,94,0.22);
          border-color: rgba(34,197,94,0.6);
          transform: translateY(-1px);
        }

        .td-btn-reject {
          background: rgba(239,68,68,0.08);
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.25);
        }

        .td-btn-reject:hover:not(:disabled) {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.55);
          transform: translateY(-1px);
        }

        .td-btn-spinner {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @media (max-width: 600px) {
          .td-root { padding: 24px 16px 60px; }
          .td-header { flex-direction: column; align-items: flex-start; }
          .td-stats { gap: 8px; }
          .td-stat { padding: 12px 16px; }
        }
      `}</style>

      <div className="td-root">
        <div className="td-inner">

          {/* Header */}
          <div className="td-header">
            <div>
              <h1 className="td-title">
                Tutor <span>Dashboard</span> 🎸
              </h1>
              <p className="td-subtitle">Manage your student booking requests</p>
            </div>
          </div>

          {/* Stats */}
          <div className="td-stats">
            {[
              { key: "all",      label: "Total",    color: "#fff"     },
              { key: "pending",  label: "Pending",  color: "#f59e0b"  },
              { key: "accepted", label: "Accepted", color: "#22c55e"  },
              { key: "rejected", label: "Rejected", color: "#ef4444"  },
            ].map(({ key, label, color }) => (
              <div className="td-stat" key={key}>
                <div className="td-stat-value" style={{ color }}>{counts[key]}</div>
                <div className="td-stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="td-filters">
            {["all", "pending", "accepted", "rejected"].map((f) => (
              <button
                key={f}
                className={`td-filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="td-filter-count">{counts[f]}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="td-loading">
              <div className="td-spinner" />
              Loading bookings…
            </div>
          ) : filtered.length === 0 ? (
            <div className="td-empty">
              <div className="td-empty-icon">📭</div>
              <div className="td-empty-text">
                No {filter !== "all" ? filter : ""} bookings found
              </div>
            </div>
          ) : (
            <div className="td-grid">
              {filtered.map((booking, i) => {
                const cfg  = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
                const name = booking.student?.fullName || "Student";
                const isUpdating = updating === booking._id;

                return (
                  <div
                    className="td-card"
                    key={booking._id}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {/* Top row */}
                    <div className="td-card-top">
                      <div className="td-student-row">
                        <div className="td-avatar">
                          {name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="td-student-name">{name}</div>
                          <div className="td-student-label">Student</div>
                        </div>
                      </div>

                      <span
                        className="td-status-badge"
                        style={{
                          color: cfg.color,
                          background: cfg.bg,
                          border: `1px solid ${cfg.border}`,
                        }}
                      >
                        <span className="td-status-dot" />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="td-meta">
                      <div className="td-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {booking.date}
                      </div>
                      <div className="td-meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {booking.time}
                      </div>
                    </div>

                    {/* Message */}
                    {booking.message && (
                      <div className="td-message">"{booking.message}"</div>
                    )}

                    {/* Actions — hide if already settled */}
                    {booking.status === "pending" && (
                      <div className="td-actions">
                        <button
                          className="td-btn td-btn-accept"
                          disabled={isUpdating}
                          onClick={() => updateStatus(booking._id, "accepted")}
                        >
                          {isUpdating ? <span className="td-btn-spinner" /> : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                          Accept
                        </button>

                        <button
                          className="td-btn td-btn-reject"
                          disabled={isUpdating}
                          onClick={() => updateStatus(booking._id, "rejected")}
                        >
                          {isUpdating ? <span className="td-btn-spinner" /> : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          )}
                          Reject
                        </button>
                      </div>
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

export default TutorDashboard;