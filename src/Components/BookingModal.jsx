import "./BookingModal.css";

function BookingModal({
  booking,
  onClose,
  onCalculateCost,
}) {
  if (!booking) return null;

  return (
    <div className="modal-overlay">
      <div className="booking-modal">

        <h2>📄 BOOKING DETAILS</h2>

        <hr />

        <h3>Customer Details</h3>

        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>

        <hr />

        <h3>Event Details</h3>

        <p><strong>Event:</strong> {booking.event}</p>
        <p><strong>Venue:</strong> {booking.venue}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Guests:</strong> {booking.guests}</p>
        <p><strong>Decoration:</strong> {booking.decoration}</p>

        <hr />

        <h3>Food</h3>

        {booking.food?.length ? (
          <ul className="food-list">
            {booking.food.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        ) : (
          <p>No food selected</p>
        )}

        <hr />

        <div className="budget-box">
          <h3>Estimated Budget</h3>
          <h2>{booking.budget}</h2>
        </div>

        <div className="modal-buttons">
          <button
            className="calculate-btn"
            onClick={onCalculateCost}
          >
            Calculate Final Cost
          </button>

          <button
            className="close-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default BookingModal;