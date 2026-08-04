import hero from "../assets/hero.jpg";
import "../App.css";

function Home() {
  return (
    <div>

      <nav className="navbar">

        <h2 className="logo">
          🎉 EventGenie AI
        </h2>

        <ul className="nav-links">
          <li>Home</li>
          <li>Events</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

      </nav>

      <section className="hero">

        <div className="left">

          <h1>
            Plan Your Dream Event
            <br />
            With Artificial Intelligence
          </h1>

          <p>
            Weddings, Birthdays, Ring Ceremonies,
            Kelvan, Baby Showers and Corporate Events.
          </p>

          <button className="btn">
            Start Planning
          </button>

        </div>

        <div className="right">

          <img src={hero} alt="Hero"/>

        </div>

      </section>

    </div>
  );
}

export default Home;