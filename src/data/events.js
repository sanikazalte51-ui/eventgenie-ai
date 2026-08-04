import wedding from "../assets/events/wedding.jpg";
import birthday from "../assets/events/birthday.jpg";
import ring from "../assets/events/ring.jpg";
import kelvan from "../assets/events/kelvan.jpg";
import baby from "../assets/events/baby.jpg";
import corporate from "../assets/events/corporate.jpg";

const events = [
  {
    id: 1,
    name: "Wedding",
    image: wedding,
    price: "₹50,000 onwards",
    rating: 4.9,
    recommended: true,
  },
  {
    id: 2,
    name: "Birthday",
    image: birthday,
    price: "₹15,000 onwards",
    rating: 4.8,
    recommended: false,
  },
  {
    id: 3,
    name: "Ring Ceremony",
    image: ring,
    price: "₹35,000 onwards",
    rating: 4.7,
    recommended: true,
  },
  {
    id: 4,
    name: "Kelvan",
    image: kelvan,
    price: "₹20,000 onwards",
    rating: 4.6,
    recommended: false,
  },
  {
    id: 5,
    name: "Baby Shower",
    image: baby,
    price: "₹18,000 onwards",
    rating: 4.8,
    recommended: true,
  },
  {
    id: 6,
    name: "Corporate Event",
    image: corporate,
    price: "₹80,000 onwards",
    rating: 4.9,
    recommended: true,
  },
];

export default events;