import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../providers/AppProvider";

export default function NavBar({ isStudy, user }) {
  const { showSettings, setShowSettings, showLogin, setShowLogin } =
    useAppContext();
    console.log("This is the user", user)

  const buttonClass = `NavButtons ${
    isStudy ? "StudyButtonSecondary" : "BreakButtonSecondary"
  }`;

  function handleSettingsClick() {
    setShowSettings(!showSettings);
  }

  function handleShowLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <div className="NavBar">
      {/* max-w-screen-sm makes sure the width of the navbar stays a reasonable width */}
      <div className="NavContainer">
        <Link href={"/"}>
          <div className="py-3">
            <h1 className="text-xl font-bold flex">
              <Image
                src="/timer.png"
                width={30}
                height={25}
                className="p-1"
                alt="Logo"
              />
              PomoCoach
            </h1>
          </div>
        </Link>
        <span className="flex">
          <button className={buttonClass} onClick={handleSettingsClick}>
            <Image
              src="/settings.png"
              width={25}
              height={25}
              className="p-1"
              alt="Settings"
            />
            <span className="hidden sm:inline">Settings</span>
          </button>
          {user ? (
            <Link href={"/dashboard"}>
              <button className={buttonClass}>
                <Image
                  src={user.profile_picture_url || "/profile.png"} // Use profile picture or default
                  width={25}
                  height={25}
                  className="p-1 rounded-full" // Add rounded-full for circular profile image
                  alt="Profile"
                />
                <span className="hidden sm:inline">Hello, {user.username}</span>
              </button>
            </Link>
          ) : (
            <button className={buttonClass} onClick={handleShowLogin}>
              <Image
                src="/profile.png"
                width={25}
                height={25}
                className="p-1"
                alt="Profile"
              />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
