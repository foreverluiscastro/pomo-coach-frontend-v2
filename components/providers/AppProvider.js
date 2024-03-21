import React, { useState, createContext, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // isStudy and session controls the app's color theme
  const [isStudy, setIsStudy] = useState(true);
  const [session, setSession] = useState("Study");

  // do not display the settings until the user clicks settings
  const [showSettings, setShowSettings] = useState(false);
  // do not display the login until the user clicks on the button
  const [showLogin, setShowLogin] = useState(false);

  // default values for time are 25 and 5 but can be customized
  const [studyTime, setStudyTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  // used to customize the study and break times
  const [settingsSaved, setSettingSaved] = useState(false);

  // for the start and pause functionality
  const [isRunning, setIsRunning] = useState(false);

  const [soundVolume, setSoundVolume] = useState(0.5);

  const appContextValue = {
    user,
    setUser,
    isStudy,
    setIsStudy,
    showSettings,
    setShowSettings,
    showLogin,
    setShowLogin,
    session,
    setSession,
    studyTime,
    setStudyTime,
    breakTime,
    setBreakTime,
    settingsSaved,
    setSettingSaved,
    isRunning,
    setIsRunning,
    soundVolume,
    setSoundVolume,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export { AppProvider };
