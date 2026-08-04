import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./FoodSelection.css";

function FoodSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const menu = {
    starters: [
      "Paneer Tikka",
      "Hara Bhara Kebab",
      "Veg Manchurian",
      "Spring Roll",
      "Crispy Corn",
    ],
    main: [
      "Paneer Butter Masala",
      "Veg Kolhapuri",
      "Dal Fry",
      "Jeera Rice",
      "Butter Naan",
      "Veg Biryani",
    ],
    desserts: [
      "Gulab Jamun",
      "Rasmalai",
      "Ice Cream",
      "Brownie",
    ],
    drinks: [
      "Tea",
      "Coffee",
      "Soft Drinks",
      "Mocktails",
    ],
  };

  const [selectedFood, setSelectedFood] = useState([]);

  const handleFood = (item) => {
    if (selectedFood.includes(item)) {
      setSelectedFood(selectedFood.filter((food) => food !== item));
    } else {
      setSelectedFood([...selectedFood, item]);
    }
  };

  const renderSection = (title, items) => (
    <>
      <h2>{title}</h2>

      <div className="food-grid">
        {items.map((item) => (
          <div
            key={item}
            className={`food-card ${
              selectedFood.includes(item) ? "selected" : ""
            }`}
            onClick={() => handleFood(item)}
          >
            <input
              type="checkbox"
              checked={selectedFood.includes(item)}
              readOnly
            />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </>
  );

  const nextPage = () => {
    navigate("/decoration", {
      state: {
        ...booking,
        selectedFood,
      },
    });
  };

  return (
    <div className="food-container">

      <h1>🍽 Choose Your Food Menu</h1>

      <p className="subtitle">
        Select the dishes you would like to include in your event.
      </p>

      {renderSection("🥗 Starters", menu.starters)}

      {renderSection("🍛 Main Course", menu.main)}

      {renderSection("🍨 Desserts", menu.desserts)}

      {renderSection("🥤 Drinks", menu.drinks)}

      <button onClick={nextPage}>
        Continue to Decoration →
      </button>

    </div>
  );
}

export default FoodSelection;