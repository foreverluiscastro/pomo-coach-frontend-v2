import Image from "next/image";
import { Container } from "./Container";
import DonutChart from "../charts/DonutChart";
import BarGraph from "../charts/BarGraph";
import { Modal } from "./Modal";
import { useState } from "react";

function StudyStats({
  user,
  setUser,
  isStudy,
  percentage,
  totalMinutesStudied,
  minutesForTheWeek,
}) {
  const [goal, setGoal] = useState(user.daily_goal);
  const [goalUnit, setGoalUnit] = useState("minutes"); // Default unit is minutes
  const [editGoal, setEditGoal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setEditGoal(!editGoal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    let goalInMins;

    if (goalUnit === "hours") {
      goalInMins = goal * 60;
    } else {
      goalInMins = goal;
    }

    fetch("/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        daily_goal: parseInt(goalInMins),
      }),
    })
      .then((r) => r.json())
      .then((user) => {
        setUser(user);
        setEditGoal(false);
        setIsLoading(false);
      });
  }

  function handleChange(e) {
    // console.log("This is the chosen option: ", e.target.value)
    // console.log("This is the current goalUnit: ", goalUnit)
    if (e.target.value === "hours" && goalUnit === "minutes") {
      setGoal((currentGoal) => Math.ceil(currentGoal / 60));
      setGoalUnit(e.target.value);
    }
    if (e.target.value === "minutes" && goalUnit === "hours") {
      setGoal((currentGoal) => currentGoal * 60);
      setGoalUnit(e.target.value);
    }
  }
  // console.log("This is the minutes for the week: ", minutesForTheWeek)
  const percentagesForTheWeek = minutesForTheWeek.map(
    (num) => (num / goal) * 100
  );
  // console.log("This is the percentages for the week: ", percentagesForTheWeek)

  return (
    <Container>
      <div className="text-left px-4 flex justify-between mb-4">
        <div className="flex items-center">
          <h1 className=" font-semibold text-lg items-center">Study Stats</h1>
        </div>
        <div className="flex items-center">
          <h1 className=" font-semibold text-md items-center">
            Weekly goal: {goal} minutes
          </h1>
          <button
            className={`EditButton ${
              isStudy ? "StudyButtonSecondary" : "BreakButtonSecondary"
            }`}
            onClick={handleClick}
          >
            <Image
              src="/settings.png"
              width={25}
              height={25}
              className="p-1"
              alt="Logo"
            />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>
      <div className="px-4">
        <div className="flex w-full">
          <div className="flex flex-col items-center">
            <DonutChart percentage={percentage} strokeWidth={15} size={100} />
            <h1 className="whitespace-nowrap">
              {parseInt(totalMinutesStudied, 10)} minutes today
            </h1>
          </div>
          <div className="w-full relative flex flex-col items-center">
            <BarGraph data={percentagesForTheWeek} />
            <h1>
              {minutesForTheWeek.reduce((acc, element) => acc + element, 0)}{" "}
              minutes for the week
            </h1>
          </div>
        </div>
      </div>
      {editGoal ? (
        <Modal>
          <div className="flex items-center justify-between w-full shadow-md p-4">
            <div className="flex-grow"></div>
            <button className="Button Close" onClick={() => setEditGoal(false)}>
              Close
            </button>
          </div>
          <form className="Form" onSubmit={handleSubmit}>
            <div className="FormField">
              <label className="Label" htmlFor="weekly_goal">
                Set you new weekly goal:
              </label>
              <input
                id="weekly_goal"
                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight w-1/2"
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                autoComplete="off"
              />
              <select
                value={goalUnit}
                onChange={handleChange}
                className="Select"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <div className="FormField">
              <button type="submit" className="Button Utility">
                {isLoading ? "Loading..." : "Update"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </Container>
  );
}

export default StudyStats;
