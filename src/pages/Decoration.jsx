import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Decoration.css";

function Decoration() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const [selectedDecoration, setSelectedDecoration] = useState("");

  const packages = [
    {
      name: "Classic",
      price: "₹20,000",
      features: [
        "Marigold Flowers",
        "Stage Decoration",
        "Fairy Lights",
        "Welcome Gate",
      ],
    },
    {
      name: "Royal",
      price: "₹45,000",
      features: [
        "White Floral Theme",
        "LED Stage",
        "Entrance Decoration",
        "Premium Lighting",
      ],
    },
    {
      name: "Luxury",
      price: "₹80,000",
      features: [
        "Imported Flowers",
        "Crystal Stage",
        "Luxury Entrance",
        "Premium Chandeliers",
      ],
    },
  ];

  const nextPage = () => {
    navigate("/recommendation", {
      state: {
        ...booking,
        decoration: selectedDecoration,
      },
    });
  };

  return (
    <div className="decoration-container">

      <h1>🎨 Choose Your Decoration Package</h1>

      <p className="subtitle">
        Select a decoration package that best suits your celebration.
      </p>

      <div className="package-grid">

        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`package-card ${
              selectedDecoration === pkg.name ? "selected" : ""
            }`}
          >

            <h2>{pkg.name}</h2>

            <h3>{pkg.price}</h3>

            <ul>
              {pkg.features.map((item) => (
                <li key={item}>✅ {item}</li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedDecoration(pkg.name)}
            >
              {selectedDecoration === pkg.name
                ? "✔ Selected"
                : "Select Package"}
            </button>

          </div>
        ))}

      </div>

      <button
        className="next-btn"
        onClick={nextPage}
        disabled={!selectedDecoration}
      >
        Continue to AI Recommendation →
      </button>

    </div>
  );
}

export default Decoration;