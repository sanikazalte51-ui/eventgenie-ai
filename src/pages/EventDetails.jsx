import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./EventDetails.css";

function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");

  const venue = "Royal Palace Banquet";
  const today = new Date().toISOString().split("T")[0];

  const nextPage = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !guests ||
      !budget
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (Number(guests) <= 0) {
      alert("Number of guests must be greater than 0.");
      return;
    }

    navigate("/food", {
      state: {
        event,
        name,
        email,
        phone,
        date,
        time,
        guests,
        budget,
        venue,
      },
    });
  };

  return (
    <div className="planner-container">

      <div className="planner-card">

        <h1>🎉 {event?.name} Booking</h1>

        <p className="planner-subtitle">
          Fill in your event details to continue.
        </p>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            maxLength="10"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="two-column">

          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Event Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

        </div>

        <div className="two-column">

          <div className="form-group">
            <label>Guests</label>
            <input
              type="number"
              min="1"
              placeholder="100"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Select Budget</option>
              <option>₹50,000</option>
              <option>₹1,00,000</option>
              <option>₹2,00,000</option>
              <option>₹5,00,000+</option>
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Venue</label>
          <input
            type="text"
            value={venue}
            readOnly
          />
        </div>

        <button onClick={nextPage} className="next-btn">
          Continue to Food Selection →
        </button>

      </div>

    </div>
  );
}

export default EventDetails;