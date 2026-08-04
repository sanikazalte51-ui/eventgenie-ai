import "./DashboardCards.css";

function DashboardCards({ bookings }) {
  const total = bookings.length;

  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const approved = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const rejected = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  return (
    <div className="dashboard-cards">

      <div className="dashboard-card">
        <h2>{total}</h2>
        <p>Total Bookings</p>
      </div>

      <div className="dashboard-card">
        <h2>{pending}</h2>
        <p>Pending</p>
      </div>

      <div className="dashboard-card">
        <h2>{approved}</h2>
        <p>Approved</p>
      </div>

      <div className="dashboard-card">
        <h2>{rejected}</h2>
        <p>Rejected</p>
      </div>

    </div>
  );
}

export default DashboardCards;