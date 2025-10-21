import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null); // for later JWT

  async function onSubmit(e) {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // if you later use cookie/session auth, add: credentials: 'include'
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.message || `Error ${res.status}`);
        return;
      }

      // if your login returns token: { token: "..." }
      if (data.token) {
        setToken(data.token);
        setMessage("Login successful. Token saved to state.");
        // you might want to store token in localStorage: localStorage.setItem('token', data.token)
      } else {
        setMessage("Login successful");
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Username</label><br />
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div style={{ marginTop: 12 }}>{message}</div>}
      {token && <pre style={{ marginTop: 12, maxWidth: 600, wordBreak: "break-all" }}>{token}</pre>}
    </div>
  );
}
