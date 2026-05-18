import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", always: true },
    { to: "/tutors", label: "Tutors", always: true },
    { to: "/my-bookings", label: "My Bookings", authOnly: true },
    { to: "/create-tutor", label: "Become a Tutor", authOnly: true, studentOnly: true },
    { to: "/tutor-dashboard", label: "Dashboard", authOnly: true, tutorOnly: true },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
          background: ${scrolled
            ? "rgba(8, 8, 12, 0.92)"
            : "rgba(8, 8, 12, 1)"};
          backdrop-filter: ${scrolled ? "blur(14px)" : "none"};
          border-bottom: 1px solid ${scrolled
            ? "rgba(255,255,255,0.07)"
            : "transparent"};
          box-shadow: ${scrolled
            ? "0 4px 32px rgba(0,0,0,0.45)"
            : "none"};
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          user-select: none;
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #f97316, #ec4899);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 2px 14px rgba(249,115,22,0.35);
          flex-shrink: 0;
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .brand-name span {
          background: linear-gradient(90deg, #f97316, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Desktop nav */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
          position: relative;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.07);
        }

        .nav-link.active {
          color: #ffffff;
          background: rgba(249, 115, 22, 0.12);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #ec4899);
          border-radius: 2px;
        }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 8px;
        }

        .btn-auth {
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 7px 16px;
          border-radius: 8px;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-login {
          color: rgba(255, 255, 255, 0.75);
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-login:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.05);
        }

        .btn-signup {
          color: #ffffff;
          background: linear-gradient(135deg, #f97316, #ec4899);
          box-shadow: 0 2px 12px rgba(249, 115, 22, 0.3);
        }

        .btn-signup:hover {
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.45);
          transform: translateY(-1px);
        }

        .btn-logout {
          color: rgba(255, 255, 255, 0.75);
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.4);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-logout:hover {
          color: #fff;
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.7);
        }

        /* User badge */
        .user-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px 4px 4px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: white;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
        }

        .user-name {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .hamburger:hover {
          background: rgba(255, 255, 255, 0.07);
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          transition: all 0.25s;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile drawer */
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 12px 16px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(8, 8, 12, 0.97);
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-nav-link {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.9rem;
          font-weight: 500;
          padding: 10px 12px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }

        .mobile-auth-row {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .mobile-auth-row .btn-auth {
          flex: 1;
          text-align: center;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-divider { display: none; }
          .hamburger { display: flex; }
          .brand-name { font-size: 1.05rem; }
        }
      `}</style>

      <header className="navbar">
        <div className="navbar-inner">
          {/* Brand */}
          <Link to="/" className="brand">
            <div className="brand-icon">🎸</div>
            <span className="brand-name">
              Klef<span>ly</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navLinks.map(({ to, label, always, authOnly, studentOnly, tutorOnly }) => {
              if (authOnly && !user) return null;
              if (studentOnly && user?.role === "tutor") return null;
              if (tutorOnly && user?.role !== "tutor") return null;
              if (!always && !authOnly) return null;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`nav-link ${isActive(to) ? "active" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            <li><div className="nav-divider" /></li>

            {user ? (
              <>
                <li>
                  <div className="user-badge">
                    <div className="user-avatar">
                      {(user.fullName || user.email || "U")[0].toUpperCase()}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.1" }}>
                      <span className="user-name">
                        {user.fullName || user.email?.split("@")[0]}
                      </span>
                      <span style={{
                        fontSize: "0.65rem",
                        color: user.role === "tutor" ? "#f97316" : "#22c55e",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        {user.role === "tutor" ? "Tutor" : "Student"}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <button className="btn-auth btn-logout" onClick={logoutHandler}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="btn-auth btn-login">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="btn-auth btn-signup">Get Started</Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {navLinks.map(({ to, label, always, authOnly, studentOnly, tutorOnly }) => {
            if (authOnly && !user) return null;
            if (studentOnly && user?.role === "tutor") return null;
            if (tutorOnly && user?.role !== "tutor") return null;
            if (!always && !authOnly) return null;
            return (
              <Link
                key={to}
                to={to}
                className={`mobile-nav-link ${isActive(to) ? "active" : ""}`}
              >
                {label}
              </Link>
            );
          })}

          <div className="mobile-auth-row">
            {user ? (
              <button
                className="btn-auth btn-logout"
                onClick={logoutHandler}
                style={{ flex: 1, justifyContent: "center" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-auth btn-login">Login</Link>
                <Link to="/signup" className="btn-auth btn-signup">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;