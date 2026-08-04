import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

import DashboardCards from "../components/DashboardCards";
import BookingTable from "../components/BookingTable";
import BookingModal from "../components/BookingModal";
import CostCalculatorModal from "../components/CostCalculatorModal";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [showBookingModal, setShowBookingModal] =
    useState(false);

  const [showCostCalculator, setShowCostCalculator] =
    useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    (
      booking.name +
      " " +
      booking.event +
      " " +
      booking.email +
      " " +
      booking.bookingId
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const approveBooking = async (id) => {
    await updateDoc(doc(db, "bookings", id), {
      status: "Approved",
    });

    alert("Booking Approved Successfully");
  };

  const rejectBooking = async (id) => {
    await updateDoc(doc(db, "bookings", id), {
      status: "Rejected",
    });

    alert("Booking Rejected");
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    await deleteDoc(doc(db, "bookings", id));

    alert("Booking Deleted");
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  return (
    <div className="dashboard">

      <div className="topbar">

        <h1>🎉 EventGenie AI Admin Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      <DashboardCards bookings={bookings} />

      <input
        className="search"
        placeholder="Search Booking ID, Customer, Email or Event..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
            <BookingTable
        bookings={filteredBookings}
        onView={(booking) => {
          setSelectedBooking(booking);
          setShowBookingModal(true);
        }}
        onApprove={approveBooking}
        onReject={rejectBooking}
        onDelete={deleteBooking}
      />

      {showBookingModal && selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedBooking(null);
          }}
          onCalculateCost={() => {
            setShowBookingModal(false);
            setShowCostCalculator(true);
          }}
        />
      )}

      {showCostCalculator && selectedBooking && (
        <CostCalculatorModal
          booking={selectedBooking}
          onClose={() => {
            setShowCostCalculator(false);
            setSelectedBooking(null);
          }}
          onApproved={() => {
            setShowCostCalculator(false);
            setSelectedBooking(null);
          }}
        />
      )}
          </div>
  );
}
export default AdminDashboard;
