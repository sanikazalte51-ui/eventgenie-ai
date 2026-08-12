import "./BookingTable.css";

function BookingTable({
  bookings,
  onView,
  onReject,
  onDelete,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Event</th>
          <th>Date</th>
          <th>Guests</th>
          <th>Budget</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.name}</td>

            <td>{booking.event}</td>

            <td>{booking.date}</td>

            <td>{booking.guests}</td>

            <td>{booking.budget}</td>

            <td>{booking.status}</td>

            <td className="action-buttons">
              <button
                className="view-btn"
                onClick={() => onView(booking)}
              >
                View
              </button>

              {booking.status === "Pending" && (
                <button
                  className="reject-btn"
                  onClick={() => onReject(booking.id)}
                >
                  Reject
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => onDelete(booking.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingTable;