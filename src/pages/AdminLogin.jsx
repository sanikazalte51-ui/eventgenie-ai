import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Only allow the admin account
      if (userCredential.user.email !== "admin@eventgenie.com") {
        alert("Access Denied! You are not an administrator.");
        return;
      }

      alert("Welcome Admin!");
      navigate("/admin-dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">

        <h1>🎉 EventGenie AI</h1>
        <p className="subtitle">Administrator Portal</p>

        <h2>Admin Login</h2>

        <form onSubmit={handleAdminLogin}>

          <div className="input-box">
            <FaEnvelope className="icon" />

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">

            <FaLock className="icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <button className="admin-login-btn">
            Login as Admin
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;