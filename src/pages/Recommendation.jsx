import { useLocation, useNavigate } from "react-router-dom";
import "./Recommendation.css";

function Recommendation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state || {};

  const event = booking.event?.name || "Event";

  let suggestion = {};

  switch (event) {
    case "Wedding":
      suggestion = {
        venue: "Royal Palace Banquet",
        decoration: "Royal Floral Decoration",
        entertainment: "DJ + Live Band",
        photography: "Drone + Cinematic Shoot",
      };
      break;

    case "Birthday":
      suggestion = {
        venue: "Royal Palace Banquet",
        decoration: "Balloon Theme Decoration",
        entertainment: "Magic Show + Games",
        photography: "Birthday Photoshoot",
      };
      break;

    case "Ring Ceremony":
      suggestion = {
        venue: "Royal Palace Banquet",
        decoration: "White Floral Stage",
        entertainment: "Live Music",
        photography: "Premium Photography",
      };
      break;

    default:
      suggestion = {
        venue: "Royal Palace Banquet",
        decoration: booking.decoration,
        entertainment: "Live Entertainment",
        photography: "Professional Photography",
      };
  }

  return (
    <div className="recommendation-container">

      <div className="recommendation-card">

        <h1>🤖 AI Recommendation</h1>

        <p className="subtitle">
          Based on your booking details, EventGenie AI recommends the following.
        </p>

        <div className="recommendation-grid">

          <div className="info-box">
            <h3>🎉 Event</h3>
            <p>{event}</p>
          </div>

          <div className="info-box">
            <h3>📍 Venue</h3>
            <p>{suggestion.venue}</p>
          </div>

          <div className="info-box">
            <h3>👥 Guests</h3>
            <p>{booking.guests}</p>
          </div>

          <div className="info-box">
            <h3>💰 Budget</h3>
            <p>{booking.budget}</p>
          </div>

          <div className="info-box">
            <h3>🎨 Decoration</h3>
            <p>{booking.decoration}</p>
          </div>

          <div className="info-box">
            <h3>🎵 Entertainment</h3>
            <p>{suggestion.entertainment}</p>
          </div>

          <div className="info-box">
            <h3>📸 Photography</h3>
            <p>{suggestion.photography}</p>
          </div>

        </div>

        <div className="food-section">

          <h2>🍽 Selected Food Menu</h2>

          <ul>
            {(booking.selectedFood || []).map((food, index) => (
              <li key={index}>✅ {food}</li>
            ))}
          </ul>

        </div>

        <div className="ai-tip">

          <h2>💡 AI Suggestion</h2>

          <p>
            Based on your selected budget and guest count,
            this package offers the best balance of elegance,
            comfort and memorable experience.
          </p>

        </div>

        <button
          onClick={() => navigate("/summary", { state: booking })}
        >
          Continue to Booking Summary →
        </button>

      </div>

    </div>
  );
}

export default Recommendation;