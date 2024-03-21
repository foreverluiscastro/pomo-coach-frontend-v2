import React, { useEffect, useState } from "react";
import { useAppContext } from "../providers/AppProvider";

export default function Timer() {
  const {
    user,
    session,
    setSession,
    isRunning,
    setIsRunning,
    isStudy,
    setIsStudy,
    studyTime,
    breakTime,
    settingsSaved,
    soundVolume,
  } = useAppContext();

  const [time, setTime] = useState(isStudy ? studyTime * 60 : breakTime * 60); // 25 minutes in total seconds
  const [totalSessionTime, setTotalSessionTime] = useState(
    isStudy ? studyTime * 60 : breakTime * 60
  ); // Total time for the current session
  const [sessionStarted, setSessionStarted] = useState(false); // tracks whether a session is started yet

  // This useEffect runs the timer if it is running
  useEffect(() => {
    let timerInterval;
    // before anything check if time reached zero
    if (time === 0) {
      if (user) {
        generateSessionReport();
      }

      // check if notifications are on and send a notification
      const audio = new Audio("/sounds/whistle.wav");
      audio.volume = soundVolume;
      audio.play();

      setIsRunning(false);
      setSessionStarted(false);

      if (Notification.permission === "granted") {
        displayNotification();
        // console.log("Browser times up");
      }

      if (session === "Study") {
        // refill the time for 25 mins
        setTime(1500);
      } else {
        // refill the time for 5 mins
        setTime(300);
      }
    }

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000); // adjust time for testing in development
    }

    const displayMessage = isStudy ? "to study" : "for a break";

    document.title = `${formatTime()} Time ${displayMessage}!`;

    return () => clearInterval(timerInterval);
  }, [time, isRunning, session, studyTime, breakTime]);

  // for custom study and break times
  useEffect(() => {
    // Update time only if settings have been saved
    if (settingsSaved) {
      setTime(session === "Study" ? studyTime * 60 : breakTime * 60);
    }
  }, [session, studyTime, breakTime, settingsSaved]);

  // if notifications are on let em know the timers done
  function displayNotification() {
    if ("Notification" in window) {
      // Your code for notifications
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          alert("Time's up!");
        }
      });
    }
  }

  function generateSessionReport() {
    const sessionType = session;
    const totalTime = totalSessionTime - time;
    const currentDate = new Date().toISOString(); // '2024-02-22T18:40:57.310Z'

    const data = {
      session_type: sessionType,
      total_time: totalTime,
      date: currentDate,
    };

    console.log("This is the data before the POST: ", data);
    // code for a POST request
    fetch("/pomo_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r) => console.log("This is the response from the server: ", r));
  }

  function formatTime() {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  const buttonsToDisplay = ["Study", "Break"].map((option) => {
    const buttonClass = `Button ${option === session ? `${option}` : ""}`;

    return (
      <button
        className={buttonClass}
        onClick={handleClick}
        value={option}
        key={option}
      >
        {option}
      </button>
    );
  });

  function handleClick(e) {
    // if a session has started, generate a new report before switching
    console.log("This is the value of session started: ", sessionStarted);
    if (sessionStarted && user) {
      console.log("Inside handle click");
      generateSessionReport();
    }

    setSession(e.target.value);

    if (e.target.value === "Study" && isStudy !== true) {
      setIsStudy(true);
      setTime(studyTime * 60); // Update time with new session duration
      setTotalSessionTime(studyTime * 60); // Update totalSessionTime
    }
    if (e.target.value === "Break" && isStudy === true) {
      setIsStudy(false);
      setTime(breakTime * 60); // Update time with new session duration
      setTotalSessionTime(breakTime * 60); // Update totalSessionTime
    }

    setIsRunning(false);
    setSessionStarted(false);
  }

  function handleConfirm() {
    // add browser notifications for multi-tabs
    Notification.requestPermission().then(() => {
      if (!isRunning) {
        setIsRunning(true);
        setSessionStarted(true);
      } else {
        setIsRunning(false);
      }
    });
  }

  return (
    <div
      className={`Container ${isStudy ? "StudySecondary" : "BreakSecondary"}`}
    >
      <div className="ButtonContainer">{buttonsToDisplay}</div>
      <div className="Time">{formatTime()}</div>
      <div>
        <button
          className={`StartButton ${isStudy ? "StudyStart" : "BreakStart"}`}
          onClick={handleConfirm}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
