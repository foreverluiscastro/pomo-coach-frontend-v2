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

    console.log("This is the request body: ", {
      username,
      daily_goal: parseInt(goalInMins),
      study_goal: studyGoal,
      details: details,
      password,
      password_confirmation: passwordConfirmation,
    });

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        daily_goal: parseInt(goalInMins),
        password,
        password_confirmation: passwordConfirmation,
      }),
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

  function handleChange(e) {
    console.log("This is the chosen option: ", e.target.value);
    console.log("This is the current goalUnit: ", goalUnit);
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
        <label className="Label" htmlFor="username">
          Username:
        </label>
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
        <label className="Label" htmlFor="goal">
          Daily Goal:
        </label>
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

      {/* AI info area */}
      <div className="FormField">
        <label className="Label" htmlFor="study-goal">
          What are you studying? <span className="text-red-500">*</span>
        </label>
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
        <label className="Label" htmlFor="details">
          Why are you studying this and describe your ideal study situation:{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col items-center">
          <textarea
            id="details"
            autoComplete="details"
            maxLength={400}
            className=" flex-grow"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <p className="text-xs text-gray-600 mt-1">
            {details.length} / 200 characters
          </p>
        </div>
      </div>
      {/*  */}

      <div className="FormField">
        <label className="Label" htmlFor="password">
          Password:
        </label>
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
        <label className="Label" htmlFor="password-confirm">
          Confirm Password:
        </label>
        <div className="flex items-center">
          <input
            id="password-confirm"
            autoComplete="off"
            className="Input flex-grow"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
      </div>
      <div className="FormField">
        <button type="submit" className="Button Utility">
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </div>
      <div className="FormField flex-col">
        {errors.map((err) => (
          <Error err={err} />
        ))}
      </div>
      <p className="text-md text-gray-600 mt-4">
        <span className="text-red-500">*</span>This information will be used to
        compile better advice and strategies using ChatGPT.
      </p>
    </form>
  );
}
