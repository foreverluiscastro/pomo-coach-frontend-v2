import { useState } from "react";
import Error from "../core/Error";

export default function SignUpForm({ setUser, setShowLogin }) {
  const [username, setUsername] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [details, setDetails] = useState("");
  const [goal, setGoal] = useState(60);
  const [goalUnit, setGoalUnit] = useState("minutes"); // Default unit is minutes
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    let goalInMins;

    if (goalUnit === "hours") {
      goalInMins = goal * 60;
    } else {
      goalInMins = goal;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("daily_goal", parseInt(goalInMins));
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture); // Add the profile picture to the form data
    }

    fetch("/signup", {
      method: "POST",
      body: formData, // Send as FormData, not JSON
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            setUser(user);
            setShowLogin(false);
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors([err.message || "An unexpected error occurred."]);
      });
  }

  function handleChange(e) {
    if (e.target.value === "hours" && goalUnit === "minutes") {
      setGoal((currentGoal) => Math.ceil(currentGoal / 60));
      setGoalUnit(e.target.value);
    }
    if (e.target.value === "minutes" && goalUnit === "hours") {
      setGoal((currentGoal) => currentGoal * 60);
      setGoalUnit(e.target.value);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="Form">
      <div className="FormField">
        <label className="Label" htmlFor="username">Username:</label>
        <div className="flex items-center">
          <input
            id="username"
            autoComplete="username"
            className="Input flex-grow"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="FormField">
        <label className="Label" htmlFor="goal">Daily Goal:</label>
        <div className="GoalContainer">
          <input
            id="goal"
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight w-1/2"
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <select value={goalUnit} onChange={handleChange} className="Select">
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>
      <div className="FormField">
        <label className="Label" htmlFor="study-goal">What are you studying?</label>
        <div className="flex items-center">
          <input
            id="study-goal"
            autoComplete="study-goal"
            className="Input flex-grow"
            value={studyGoal}
            onChange={(e) => setStudyGoal(e.target.value)}
          />
        </div>
      </div>
      <div className="FormField">
        <label className="Label" htmlFor="details">Why are you studying this?</label>
        <textarea
          id="details"
          autoComplete="details"
          maxLength={400}
          className="flex-grow"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div className="FormField">
        <label className="Label" htmlFor="password">Password:</label>
        <div className="flex items-center">
          <input
            id="password"
            autoComplete="off"
            className="Input flex-grow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="FormField">
        <label className="Label" htmlFor="password-confirm">Confirm Password:</label>
        <input
          id="password-confirm"
          autoComplete="off"
          className="Input flex-grow"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <div className="FormField">
        <label className="Label" htmlFor="profile-picture">Profile Picture:</label>
        <input
          id="profile-picture"
          type="file"
          accept="image/*"
          className="Input flex-grow"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </div>
      <div className="FormField">
        <button type="submit" className="Button Utility">
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </div>
      {errors.length > 0 && (
        <div className="FormField flex-col">
          {errors.map((err, idx) => (
            <Error key={idx} err={err} />
          ))}
        </div>
      )}
    </form>
  );
}
