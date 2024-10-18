import { useState } from "react";
import Error from "../core/Error";

export default function LoginForm({ setUser, setShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setShowLogin(false);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="Form">
      <div className="FormField">
        <label className="Label" htmlFor="username">
          Username:
        </label>
        <input
          id="username"
          className="Input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="FormField">
        <label className="Label" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          className="Input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="FormField">
        <button type="submit" className="Button Utility">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="FormField">
        {errors.map((err, idx) => (
          <Error key={idx} err={err} />
        ))}
      </div>
    </form>
  );
}
