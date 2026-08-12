import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./CostCalculatorModal.css";

function CostCalculatorModal({
  booking,
  onClose,
  onApproved,
}) {
  const [cost, setCost] = useState({
    venue: "",
    food: "",
    decoration: "",
    photography: "",
    dj: "",
    other: "",
  });

  const [loading, setLoading] = useState(false);

  const subtotal =
    Number(cost.venue || 0) +
    Number(cost.food || 0) +
    Number(cost.decoration || 0) +
    Number(cost.photography || 0) +
    Number(cost.dj || 0) +
    Number(cost.other || 0);

  const gst = subtotal * 0.18;

  const grandTotal = subtotal + gst;

  const handleChange = (e) => {
    setCost({
      ...cost,
      [e.target.name]: e.target.value,
    });
  };

  const approveBooking = async () => {
    setLoading(true);

    try {
      // Update Firestore
      await updateDoc(doc(db, "bookings", booking.id), {
        status: "Approved",
        finalAmount: grandTotal.toFixed(2),
        approvedAt: serverTimestamp(),
      });

      // Email Parameters
      const templateParams = {
        booking_id: booking.bookingId,
        to_name: booking.name,
        to_email: booking.email,
        reply_to: booking.email,

        event: booking.event,
        venue: booking.venue,
        date: booking.date,
        time: booking.time,

        final_amount: grandTotal.toFixed(2),
      };

      // Send Customer Email
      await emailjs.send(
        "service_a4zwk9n",
        "template_nmfdhu9",
        templateParams,
        "_dFRlb6d1kbFEFkAZ"
      );

      alert(
        "✅ Booking Approved & Email Sent Successfully!"
      );

      if (onApproved) {
        onApproved();
      }

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to approve booking.\n\n" +
          (error.message || "Unknown Error")
      );
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="cost-modal">

        <h2>💰 Final Cost Calculator</h2>

        <input
          type="number"
          name="venue"
          placeholder="Venue Charges"
          onChange={handleChange}
        />

        <input
          type="number"
          name="food"
          placeholder="Food Charges"
          onChange={handleChange}
        />

        <input
          type="number"
          name="decoration"
          placeholder="Decoration Charges"
          onChange={handleChange}
        />

        <input
          type="number"
          name="photography"
          placeholder="Photography Charges"
          onChange={handleChange}
        />

        <input
          type="number"
          name="dj"
          placeholder="DJ Charges"
          onChange={handleChange}
        />

        <input
          type="number"
          name="other"
          placeholder="Other Charges"
          onChange={handleChange}
        />

        <hr />

        <p>
          <strong>Subtotal :</strong> ₹
          {subtotal.toLocaleString()}
        </p>

        <p>
          <strong>GST (18%) :</strong> ₹
          {gst.toFixed(2)}
        </p>

        <h2>
          Grand Total : ₹
          {grandTotal.toFixed(2)}
        </h2>

        <div className="modal-buttons">

          <button
            className="approve-btn"
            onClick={approveBooking}
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Approve & Send Email"}
          </button>

          <button
            className="close-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default CostCalculatorModal;