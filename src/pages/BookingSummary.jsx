import { useLocation } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./BookingSummary.css";

function BookingSummary() {
  const location = useLocation();
  const booking = location.state || {};

  const [loading, setLoading] = useState(false);

  // Generate Booking ID
  const bookingId =
    "EGA-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  const handleConfirmBooking = async () => {
    setLoading(true);

    const templateParams = {
      booking_id: bookingId,

      // Customer
      name: booking.name || "",
      email: booking.email || "",
      phone: booking.phone || "",

      // Event
      event: booking.event?.name || "",
      venue: "Royal Palace Banquet",
      guests: booking.guests || "",
      budget: booking.budget || "",
      date: booking.date || "",
      time: booking.time || "",
      decoration: booking.decoration || "",
      food:
        booking.selectedFood?.join(", ") ||
        "No Food Selected",

      // EmailJS
      to_name: booking.name || "",
      to_email: booking.email || "",
      reply_to: booking.email || "",
    };

    try {
      // Save booking to Firestore
      await addDoc(collection(db, "bookings"), {
        bookingId,

        name: booking.name,
        email: booking.email,
        phone: booking.phone,

        event: booking.event?.name,

        venue: "Royal Palace Banquet",

        guests: booking.guests,

        budget: booking.budget,

        date: booking.date,

        time: booking.time,

        decoration: booking.decoration,

        food: booking.selectedFood || [],

        status: "Pending",

        createdAt: serverTimestamp(),
      });

      // Admin Email
      await emailjs.send(
        "service_a4zwk9n",
        "template_h4e1hys",
        templateParams,
        "_dFRlb6d1kbFEFkAZ"
      );

      // Customer Email
      await emailjs.send(
        "service_a4zwk9n",
        "template_nmfdhu9",
        templateParams,
        "_dFRlb6d1kbFEFkAZ"
      );

      alert(
        "🎉 Booking Confirmed Successfully!\n\nBooking has been saved and emails have been sent."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to complete booking.\n\n" +
          (error.message || "Unknown Error")
      );
    }

    setLoading(false);
  };

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h1>🎉 Booking Summary</h1>

        <p className="booking-id">
          Booking ID: <strong>{bookingId}</strong>
        </p>

        <hr />

        <div className="section">
          <h2>👤 Customer Details</h2>

          <p>
            <strong>Name:</strong> {booking.name}
          </p>

          <p>
            <strong>Email:</strong> {booking.email}
          </p>

          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>
        </div>

        <div className="section">
          <h2>🎉 Event Details</h2>

          <p>
            <strong>Event:</strong>{" "}
            {booking.event?.name}
          </p>

          <p>
            <strong>Venue:</strong> Royal Palace Banquet
          </p>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Time:</strong> {booking.time}
          </p>

          <p>
            <strong>Guests:</strong>{" "}
            {booking.guests}
          </p>

          <p>
            <strong>Budget:</strong>{" "}
            {booking.budget}
          </p>

          <p>
            <strong>Decoration:</strong>{" "}
            {booking.decoration}
          </p>
        </div>

        <div className="section">
          <h2>🍽 Selected Food</h2>

          <ul>
            {booking.selectedFood?.length ? (
              booking.selectedFood.map(
                (food, index) => (
                  <li key={index}>✅ {food}</li>
                )
              )
            ) : (
              <li>No Food Selected</li>
            )}
          </ul>
        </div>

        <div className="bill">
          <h2>💰 Estimated Budget</h2>

          <h3>{booking.budget}</h3>

          <p>
            Final charges will be calculated by the
            administrator after reviewing food,
            decoration and additional services.
          </p>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;