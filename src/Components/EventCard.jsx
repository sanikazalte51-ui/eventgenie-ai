import { Link } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">

      {event.recommended && (
        <div className="badge">
          ⭐ AI Recommended
        </div>
      )}

      <img
        src={event.image}
        alt={event.name}
        className="event-image"
      />

      <div className="event-content">

        <h2>{event.name}</h2>

        <p className="event-desc">
          Create unforgettable memories with a beautifully
          planned {event.name.toLowerCase()}.
        </p>

        <div className="event-info">

          <p className="price">
            💰 Starting From
            <br />
            <strong>₹{event.price}</strong>
          </p>

          <p className="rating">
            <FaStar /> {event.rating}
          </p>

        </div>

        <Link
          to="/details"
          state={{ event }}
          className="select-btn"
        >
          Select Event <FaArrowRight />
        </Link>

      </div>

    </div>
  );
}

export default EventCard;