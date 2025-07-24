import React, { useState } from "react";
import { useHistory } from "react-router";
import "./onboarding.scss";

const Onboarding = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show loading UI

    const name = username.trim();
    const emailTrimmed = email.trim();
    const endpoint = process.env.REACT_APP_ENDPOINT;

    try {
      const res = await fetch(endpoint + "/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) {
        alert("Invalid key. Please try again.");
        setLoading(false);
        return;
      }

      const sessionId = crypto.randomUUID();
      const user = { name, email: emailTrimmed, sessionId, key };
      localStorage.setItem("ghost-user", JSON.stringify(user));
      history.push("/assistant/chat");
    } catch (error) {
      console.error("Error during onboarding:", error);
      alert("Server unavailable. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="welcome-banner">WELCOME TO GHOST ME</div>

      {loading && (
        <div className="loading-banner">
          <div className="spinner"></div>
          <span>Server is waking up... Please wait</span>
        </div>
      )}

      <div className={`login-box ${loading ? "disabled" : ""}`}>
        <h2>ONBOARD</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="key"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <label>Key</label>
          </div>
          <div className="user-box">
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Starting..." : "Start Conversation"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
