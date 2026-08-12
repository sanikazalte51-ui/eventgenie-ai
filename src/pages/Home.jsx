import { Link } from "react-router-dom";
import {
  FaRobot,
  FaUtensils,
  FaPalette,
  FaEnvelope,
  FaCalendarCheck,
  FaUsers,
} from "react-icons/fa";
import heroImg from "../assets/hero.jpg";
import "../App.css";

function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          🎉 EventGenie AI
        </div>

        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-buttons">

          <Link to="/">
            <button className="login-btn">
              Customer Login
            </button>
          </Link>

          <Link to="/admin">
            <button className="admin-btn">
              Admin
            </button>
          </Link>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-left">

          <span className="tag">
            AI Powered Event Planning
          </span>

          <h1>
            Plan Your Dream Event
            <br />
            With EventGenie AI
          </h1>

          <p>
            Book weddings, birthdays, ring ceremonies,
            baby showers, corporate events and much more.
            Our AI helps you choose the perfect venue,
            food, decoration and planning package.
          </p>

          <div className="hero-buttons">

            <Link to="/events">
              <button className="primary-btn">
                Start Planning
              </button>
            </Link>

            <a href="#services">
              <button className="secondary-btn">
                Explore
              </button>
            </a>

          </div>

        </div>

        <div className="hero-right">

          <img
            src={heroImg}
            alt="Event"
          />

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section
        className="services"
        id="services"
      >

        <h2>Our Event Services</h2>

        <div className="service-grid">

          <div className="service-card">
            💍
            <h3>Wedding</h3>
          </div>

          <div className="service-card">
            🎂
            <h3>Birthday</h3>
          </div>

          <div className="service-card">
            💐
            <h3>Ring Ceremony</h3>
          </div>

          <div className="service-card">
            🍼
            <h3>Baby Shower</h3>
          </div>

          <div className="service-card">
            🏢
            <h3>Corporate</h3>
          </div>

          <div className="service-card">
            🎊
            <h3>Festival</h3>
          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        className="features"
        id="features"
      >

        <h2>Why Choose EventGenie AI?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <FaRobot size={45} />
            <h3>AI Planning</h3>
            <p>
              Intelligent recommendations
              for every event.
            </p>
          </div>

          <div className="feature-card">
            <FaUtensils size={45} />
            <h3>Food Selection</h3>
            <p>
              Customize menus for
              every guest.
            </p>
          </div>

          <div className="feature-card">
            <FaPalette size={45} />
            <h3>Decoration</h3>
            <p>
              Premium decoration
              packages.
            </p>
          </div>

          <div className="feature-card">
            <FaEnvelope size={45} />
            <h3>Email Confirmation</h3>
            <p>
              Instant booking
              confirmation.
            </p>
          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="stats">

        <div className="stat-box">
          <FaCalendarCheck size={35}/>
          <h2>500+</h2>
          <p>Events Planned</p>
        </div>

        <div className="stat-box">
          <FaUsers size={35}/>
          <h2>1200+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-box">
          ⭐
          <h2>4.9/5</h2>
          <p>Customer Rating</p>
        </div>

        <div className="stat-box">
          🤖
          <h2>24×7</h2>
          <p>AI Support</p>
        </div>

      </section>

      {/* ================= CONTACT ================= */}

      <section
        className="contact"
        id="contact"
      >

        <h2>Contact Us</h2>

        <p>
          📧 eventgenie.ai@gmail.com
        </p>

        <p>
          📞 +91 9876543210
        </p>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <h2>🎉 EventGenie AI</h2>

        <p>
          Smart Event Planning Platform
        </p>

        <p>
          © 2026 EventGenie AI
        </p>

        <p>
          Developed by
          <strong> Sanika Zalte</strong>
        </p>

      </footer>

    </div>
  );
}

export default Home;