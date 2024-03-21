import { useEffect } from "react";
import { useAppContext } from "../providers/AppProvider";
import Login from "../forms/Login";
import NavBar from "./NavBar";
import Settings from "../forms/Settings";
import Image from "next/image";

export const Layout = ({ children }) => {
  const { user, setUser, isStudy, showSettings, showLogin } = useAppContext();

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className={`Layout ${isStudy ? "Study" : "Break"}`}>
      <NavBar isStudy={isStudy} user={user} />
      <div className="Main">
        {showSettings && <Settings />}
        {showLogin && <Login setUser={setUser} />}
        {children}
      </div>
      <footer className="Footer">
        Made by Luis Castro. Powered by OpenAI{" "}
        <Image
          src="/openai.png"
          width={30}
          height={25}
          className="p-1"
          alt="Logo"
        />
      </footer>
    </div>
  );
};
