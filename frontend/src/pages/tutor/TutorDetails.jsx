// import { useEffect, useState } from "react"

// import { useParams } from "react-router-dom"

// import API from "../../services/api"

// function TutorDetails() {

//     const { id } = useParams()

//     const [tutor, setTutor] = useState(null)

//     const [formData, setFormData] = useState({
//         date: "",
//         time: "",
//         message: ""
//     })

//     const getTutor = async () => {

//         try {

//             const response = await API.get(
//                 `/tutors/${id}`
//             )

//             setTutor(response.data.data)

//         } catch (error) {

//             console.log(error)

//         }

//     }

//     useEffect(() => {

//         getTutor()

//     }, [])

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })

//     }

//     const handleBooking = async (e) => {

//         e.preventDefault()

//         try {

//             const token = localStorage.getItem("token")

//             const response = await API.post(
//                 "/bookings",
//                 {
//                     tutor: tutor._id,
//                     ...formData
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             )

//             alert(response.data.message)

//         } catch (error) {

//             alert(
//                 error?.response?.data?.message ||
//                 "Booking failed"
//             )

//         }

//     }

//     if (!tutor) {

//         return (
//             <div className="p-10 text-3xl">
//                 Loading...
//             </div>
//         )

//     }

//     return (

//         <div className="min-h-screen bg-gray-100 p-10">

//             <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10">

//                 <div className="flex flex-col md:flex-row gap-10">

//                     <div className="flex-1">

//                         <div className="w-40 h-40 bg-gray-300 rounded-full mb-6">
//                         </div>

//                         <h1 className="text-5xl font-bold mb-4">
//                             {tutor.user.fullName}
//                         </h1>

//                         <p className="text-2xl text-gray-600 mb-4">
//                             {tutor.instrument} Tutor
//                         </p>

//                         <p className="text-lg mb-6">
//                             {tutor.bio}
//                         </p>

//                         <div className="space-y-3 text-lg">

//                             <p>
//                                 Experience:
//                                 {" "}
//                                 {tutor.experience} Years
//                             </p>

//                             <p>
//                                 Hourly Rate:
//                                 {" "}
//                                 ₹{tutor.hourlyRate}
//                             </p>

//                             <p>
//                                 Availability:
//                                 {" "}
//                                 {tutor.availability}
//                             </p>

//                         </div>

//                     </div>

//                     <div className="flex-1">

//                         <h2 className="text-3xl font-bold mb-6">
//                             Book Session 🎵
//                         </h2>

//                         <form
//                             onSubmit={handleBooking}
//                             className="space-y-4"
//                         >

//                             <input
//                                 type="date"
//                                 name="date"
//                                 className="w-full border p-3 rounded"
//                                 onChange={handleChange}
//                             />

//                             <input
//                                 type="text"
//                                 name="time"
//                                 placeholder="Time"
//                                 className="w-full border p-3 rounded"
//                                 onChange={handleChange}
//                             />

//                             <textarea
//                                 name="message"
//                                 placeholder="Message"
//                                 className="w-full border p-3 rounded h-32"
//                                 onChange={handleChange}
//                             />

//                             <button
//                                 className="w-full bg-black text-white py-4 rounded-xl text-xl"
//                             >
//                                 Book Now
//                             </button>

//                         </form>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     )
// }

// export default TutorDetails



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

function TutorDetails() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [booking, setBooking] = useState(false);
  const [toast, setToast] = useState(null); // { type: "success"|"error", msg }
  const [formData, setFormData] = useState({ date: "", time: "", message: "" });

  const getTutor = async () => {
    try {
      const response = await API.get(`/tutors/${id}`);
      setTutor(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTutor();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  // const handleBooking = async (e) => {
  //   e.preventDefault();
  //   setBooking(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await API.post(
  //       "/bookings",
  //       { tutor: tutor._id, ...formData },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     showToast("success", response.data.message || "Booking confirmed!");
  //     setFormData({ date: "", time: "", message: "" });
  //   } catch (error) {
  //     showToast("error", error?.response?.data?.message || "Booking failed");
  //   } finally {
  //     setBooking(false);
  //   }
  // };

  const handleBooking = async (e) => {

    e.preventDefault()

    try {

        const token = localStorage.getItem("token")

        // STEP 1 → Create Razorpay Order

        const orderResponse = await API.post(
            "/payments/create-order",
            {
                amount: tutor.hourlyRate
            }
        )

        const order = orderResponse.data.order

        // STEP 2 → Open Razorpay

        const options = {

            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: order.amount,

            currency: order.currency,

            name: "Klefly",

            description: "Tutor Booking Payment",

            order_id: order.id,

            handler: async function () {

                // STEP 3 → Create Booking AFTER payment

                const response = await API.post(
                    "/bookings",
                    {
                        tutor: tutor._id,
                        ...formData
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                showToast(
                    "success",
                    response.data.message
                )

            },

            theme: {
                color: "#f97316"
            }

        }

        const razorpay = new window.Razorpay(options)

        razorpay.open()

    } catch (error) {

        showToast(
            "error",
            error?.response?.data?.message ||
            "Payment failed"
        )
    }
};

  // ── Loading ──
  if (!tutor) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');
          .td-loading-screen {
            min-height: 100vh; background: #08080c;
            display: flex; align-items: center; justify-content: center;
            gap: 12px; color: rgba(255,255,255,0.3);
            font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          }
          .td-spinner {
            width: 20px; height: 20px;
            border: 2px solid rgba(255,255,255,0.1);
            border-top-color: #f97316; border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <div className="td-loading-screen">
          <div className="td-spinner" />
          Loading tutor profile…
        </div>
      </>
    );
  }

  const initial = (tutor.user?.fullName || "T")[0].toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .tdt-root {
          min-height: 100vh;
          background: #08080c;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          padding: 48px 24px 80px;
        }

        .tdt-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Toast */
        .tdt-toast {
          position: fixed;
          top: 80px; right: 24px;
          z-index: 999;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: toastIn 0.3s ease;
          max-width: 320px;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .tdt-toast.success {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.35);
          color: #22c55e;
        }
        .tdt-toast.error {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.35);
          color: #ef4444;
        }

        /* Layout */
        .tdt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 700px) {
          .tdt-grid { grid-template-columns: 1fr; }
          .tdt-root { padding: 28px 16px 60px; }
        }

        /* Profile card */
        .tdt-profile {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: 32px;
        }

        .tdt-avatar {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 2rem; color: #fff;
          margin-bottom: 20px;
          box-shadow: 0 4px 24px rgba(249,115,22,0.3);
        }

        .tdt-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0 0 6px;
        }

        .tdt-instrument {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #f97316;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 100px;
          padding: 4px 12px;
          margin-bottom: 18px;
        }

        .tdt-bio {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .tdt-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 20px;
        }

        .tdt-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .tdt-stat-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 14px 16px;
        }

        .tdt-stat-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
        }

        .tdt-stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #fff;
        }

        .tdt-stat-item.highlight .tdt-stat-value {
          background: linear-gradient(90deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Booking card */
        .tdt-booking {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: 32px;
          position: sticky;
          top: 80px;
        }

        .tdt-book-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
          margin: 0 0 6px;
        }

        .tdt-book-subtitle {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          margin-bottom: 24px;
        }

        .tdt-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .tdt-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
        }

        .tdt-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 14px;
          color: #fff;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .tdt-input:focus {
          border-color: rgba(249,115,22,0.5);
          background: rgba(249,115,22,0.04);
        }

        .tdt-input::placeholder { color: rgba(255,255,255,0.2); }

        /* Date input calendar icon fix */
        .tdt-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          cursor: pointer;
        }

        .tdt-textarea {
          resize: none;
          height: 100px;
        }

        .tdt-submit {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #f97316, #ec4899);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.01em;
          cursor: pointer;
          margin-top: 6px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(249,115,22,0.3);
        }

        .tdt-submit:hover:not(:disabled) {
          box-shadow: 0 6px 28px rgba(249,115,22,0.45);
          transform: translateY(-1px);
        }

        .tdt-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .tdt-btn-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className={`tdt-toast ${toast.type}`}>
          {toast.type === "success" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          )}
          {toast.msg}
        </div>
      )}

      <div className="tdt-root">
        <div className="tdt-inner">
          <div className="tdt-grid">

            {/* ── Left: Profile ── */}
            <div className="tdt-profile">
              <div className="tdt-avatar">{initial}</div>

              <h1 className="tdt-name">{tutor.user?.fullName}</h1>

              <div className="tdt-instrument">
                🎵 {tutor.instrument} Tutor
              </div>

              <p className="tdt-bio">{tutor.bio}</p>

              <div className="tdt-divider" />

              <div className="tdt-stats">
                <div className="tdt-stat-item">
                  <div className="tdt-stat-label">Experience</div>
                  <div className="tdt-stat-value">{tutor.experience} yrs</div>
                </div>
                <div className="tdt-stat-item highlight">
                  <div className="tdt-stat-label">Hourly Rate</div>
                  <div className="tdt-stat-value">₹{tutor.hourlyRate}</div>
                </div>
                <div className="tdt-stat-item" style={{ gridColumn: "1 / -1" }}>
                  <div className="tdt-stat-label">Availability</div>
                  <div className="tdt-stat-value" style={{ fontSize: "0.9rem" }}>{tutor.availability}</div>
                </div>
              </div>
            </div>

            {/* ── Right: Booking form ── */}
            <div className="tdt-booking">
              <h2 className="tdt-book-title">Book a Session 🎵</h2>
              <p className="tdt-book-subtitle">Fill in the details and confirm your slot</p>

              <form onSubmit={handleBooking}>
                <div className="tdt-field">
                  <label className="tdt-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="tdt-input"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tdt-field">
                  <label className="tdt-label">Preferred Time</label>
                  <input
                    type="text"
                    name="time"
                    placeholder="e.g. 5:00 PM"
                    className="tdt-input"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tdt-field">
                  <label className="tdt-label">Message (optional)</label>
                  <textarea
                    name="message"
                    placeholder="Tell the tutor what you'd like to learn…"
                    className="tdt-input tdt-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button className="tdt-submit" disabled={booking}>
                  {booking ? <span className="tdt-btn-spinner" /> : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16z"/>
                    </svg>
                  )}
                  {booking ? "Booking…" : "Book Now"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default TutorDetails;