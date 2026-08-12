import EventCard from "../components/EventCard";
import events from "../data/events";
import "./EventSelection.css";

function EventSelection() {
  return (
    <div className="event-page">

      <div className="event-header">

        <h1>🎉 Choose Your Perfect Event</h1>

        <p>
          Select the event you want to celebrate and let
          <strong> EventGenie AI </strong>
          recommend the best venue, food, decoration and planning.
        </p>

      </div>

      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </div>
  );
}

export default EventSelection;