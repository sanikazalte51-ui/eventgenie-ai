import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo">
          🎉
        </div>

        <h1>EventGenie AI</h1>

        <p className="tagline">
          Smart AI Powered Event Planning Platform
        </p>

        <h2>Customer Login</h2>

        <form onSubmit={handleLogin}>

          <div className="input-box">

            <FaEnvelope className="icon"/>

            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>

          <div className="input-box">

            <FaLock className="icon"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <span
              className="eye"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
        </p>

        <Link
          className="signup-link"
          to="/signup"
        >
          Create Account
        </Link>

        <div className="divider"></div>

        <h3>Administrator</h3>

        <Link to="/admin">

          <button className="admin-btn">

            <FaUserShield />

            Admin Login

          </button>

        </Link>

      </div>

    </div>
  );
}

export default Login;