import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useAppContext } from "../providers/AppProvider";
import { Modal } from "../core/Modal";

export default function Login({ setUser }) {
  const [login, setLogin] = useState("Login");
  const { showLogin, setShowLogin } = useAppContext();

  function handleShowLogin() {
    setShowLogin(!showLogin);
  }

  const buttonsToDisplay = ["Login", "SignUp"].map((option) => {
    const buttonClass = `Button ${
      option === login ? "Selected" : "NotSelected"
    }`;

    return (
      <button
        className={buttonClass}
        onClick={() => setLogin(option)}
        value={option}
        key={option}
      >
        {option}
      </button>
    );
  });

  return (
    <Modal>
      <div className="ModalTop">
        <div className="ButtonContainer">{buttonsToDisplay}</div>
        <button className="Button Close" onClick={handleShowLogin}>
          Close
        </button>
      </div>
      {login === "Login" ? (
        <LoginForm setUser={setUser} setShowLogin={setShowLogin} />
      ) : (
        <SignUpForm setUser={setUser} setShowLogin={setShowLogin} />
      )}
    </Modal>
  );
}
