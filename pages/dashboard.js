import React, { useEffect, useState } from "react";
import { useAppContext } from "@/components/providers/AppProvider";
import { Page } from "@/components/core/Page";
import Image from "next/image";
import { useRouter } from "next/router";
import StudyStats from "@/components/core/StudyStats";
import AIAnalyzer from "@/components/ai/AIAnalyzer";

function Dashboard() {
  // console.log("THe dashboard is being rendered.")
  const { isStudy, user, setUser } = useAppContext();
  const router = useRouter();
  console.log(user);

  const [sessions, setSessions] = useState([]);
  console.log(sessions);
  const [totalMinutesStudied, setTotalMinutesStudied] = useState(0);
  const [percentage, setPercentage] = useState(0); // State for percentage

  useEffect(() => {
    // Ensure user and user.daily_goal are available before proceeding
    if (user && user.daily_goal) {
      const today = new Date().toISOString();

      fetch(
        `/pomo_sessions?time_range=this_week&date=${encodeURIComponent(today)}`
      )
        .then((r) => r.json())
        .then((sessions) => {
          setSessions(sessions);

          const todaySessions = sessions.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate.toDateString() === new Date().toDateString();
          });

          const todayMinutes =
            todaySessions.reduce(
              (acc, session) => acc + session.total_time,
              0
            ) / 60;
          setTotalMinutesStudied(todayMinutes);

          const percentage = Math.floor((todayMinutes / user.daily_goal) * 100);
          setPercentage(percentage);
        });
    }
  }, [user]); // Only re-run the effect if user changes

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      router.push("/");
      setUser(null);
    });
  }

  if (user === null) return <h1>Loading...</h1>;

  const minutesForTheWeek = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ].map((dayAbbreviation) => {
    const sessionsForDay = sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      const sessionDayAbbreviation = sessionDate.toString().split(" ")[0];
      return sessionDayAbbreviation === dayAbbreviation;
    });
    // console.log("This is sessionsForDay: ", sessionsForDay);

    const minutesForDay = Math.ceil(
      sessionsForDay.reduce((total, session) => total + session.total_time, 0) /
        60
    );

    return minutesForDay;
  });

  // console.log("This is minutesForTheWeek: ", minutesForTheWeek);
  // console.log("This is the value of percentage: ", percentage);

  return (
    <Page>
      <div className="flex justify-between pb-4 items-baseline">
        <h1 className="font-semibold text-lg">Dashboard</h1>
        <button
          className={`NavButtons ${
            isStudy ? "StudyButtonSecondary" : "BreakButtonSecondary"
          }`}
          onClick={handleLogOut}
        >
          <Image
            src="/logout.png"
            width={25}
            height={25}
            className="p-1 "
            alt="Logo"
          />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
      <StudyStats
        user={user}
        setUser={setUser}
        isStudy={isStudy}
        percentage={percentage}
        totalMinutesStudied={totalMinutesStudied}
        minutesForTheWeek={minutesForTheWeek}
      />
      {/* <Container>
        Inside this container I want to create a section where you can use AI to analyze your daily and overall weekly habits and get advice for how to maximize efficiency
      </Container> */}
      <AIAnalyzer isStudy={isStudy} />
    </Page>
  );
}

export default Dashboard;
