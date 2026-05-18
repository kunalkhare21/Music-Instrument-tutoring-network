// import { Link } from "react-router-dom"

// function TutorCard({ tutor }) {

//     return (

//         <div className="bg-white rounded-2xl shadow-lg p-6">

//             <div className="flex justify-center mb-4">

//                 <div className="w-24 h-24 rounded-full bg-gray-300">
//                 </div>

//             </div>

//             <h2 className="text-2xl font-bold text-center mb-2">
//                 {tutor.user.fullName}
//             </h2>

//             <p className="text-center text-gray-600 mb-3">
//                 {tutor.instrument} Tutor
//             </p>

//             <p className="text-gray-700 mb-4">
//                 {tutor.bio}
//             </p>

//             <div className="flex justify-between mb-4">

//                 <span>
//                     {tutor.experience} Years
//                 </span>

//                 <span>
//                     ₹{tutor.hourlyRate}/hr
//                 </span>

//             </div>

//             <Link
//                 to={`/tutors/${tutor._id}`}
//             >

//                 <button
//                     className="w-full bg-black text-white py-3 rounded-xl"
//                 >
//                     View Details
//                 </button>

//             </Link>

//         </div>

//     )
// }

// export default TutorCard



import { Link } from "react-router-dom";

function TutorCard({ tutor }) {
  const initial = (tutor.user?.fullName || "T")[0].toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

        .tc-card {
          font-family: 'DM Sans', sans-serif;
          background: #0c0c0ce5;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          animation: fadeUp 0.35s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tc-card:hover {
          border-color: rgba(249,115,22,0.3);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }

        .tc-avatar-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 18px;
        }

        .tc-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.7rem;
          color: #f5f0f0;
          box-shadow: 0 4px 20px rgba(249,115,22,0.3);
        }

        .tc-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.02em;
          color: #fff;
          text-align: center;
          margin: 0 0 6px;
        }

        .tc-instrument {
          display: flex;
          justify-content: center;
          margin-bottom: 14px;
        }

        .tc-instrument-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #f97316;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.25);
          border-radius: 100px;
          padding: 4px 12px;
        }

        .tc-bio {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          text-align: center;
          margin-bottom: 18px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .tc-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 16px;
        }

        .tc-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .tc-meta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .tc-meta-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.3);
        }

        .tc-meta-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #f5f4f4;
        }

        .tc-meta-value.accent {
          background: linear-gradient(90deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tc-btn {
          display: block;
          width: 100%;
          padding: 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(248, 245, 245, 0.8);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }

        .tc-btn:hover {
          background: linear-gradient(135deg, #f97316, #ec4899);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 18px rgba(249,115,22,0.35);
        }
      `}</style>

      <div className="tc-card">
        {/* Avatar */}
        <div className="tc-avatar-wrap">
          <div className="tc-avatar">{initial}</div>
        </div>

        {/* Name */}
        <h2 className="tc-name">{tutor.user?.fullName}</h2>

        {/* Instrument badge */}
        <div className="tc-instrument">
          <span className="tc-instrument-badge">🎵 {tutor.instrument}</span>
        </div>

        {/* Bio */}
        <p className="tc-bio">{tutor.bio}</p>

        <div className="tc-divider" />

        {/* Stats */}
        <div className="tc-meta">
          <div className="tc-meta-item">
            <span className="tc-meta-label">Experience</span>
            <span className="tc-meta-value">{tutor.experience} yrs</span>
          </div>
          <div className="tc-meta-item">
            <span className="tc-meta-label">Rate</span>
            <span className="tc-meta-value accent">₹{tutor.hourlyRate}/hr</span>
          </div>
        </div>

        {/* CTA */}
        <Link to={`/tutors/${tutor._id}`} className="tc-btn">
          View Profile →
        </Link>
      </div>
    </>
  );
}

export default TutorCard;