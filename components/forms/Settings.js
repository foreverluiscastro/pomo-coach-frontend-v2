import { useState } from "react";
import { useAppContext } from "../providers/AppProvider";
import { Modal } from "../core/Modal";

export default function Settings() {
  // Context
  const {
    studyTime,
    setStudyTime,
    breakTime,
    setBreakTime,
    setSettingSaved,
    setIsRunning,
    setShowSettings,
    soundVolume,
    setSoundVolume,
  } = useAppContext();
  // Local State
  const [formStudyTime, setFormStudyTime] = useState(studyTime);
  const [formBreakTime, setFormBreakTime] = useState(breakTime);
  // Callbacks
  function handleCloseSettings() {
    setShowSettings(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // save the new times from the form
    setStudyTime(parseInt(formStudyTime));
    setBreakTime(parseInt(formBreakTime));
    // set saved to true to use custom settings
    setSettingSaved(true);
    // stop the timer
    setIsRunning(false);
    // close the settings page
    handleCloseSettings();
  }

  return (
    <Modal>
      <div className="ModalTop">
        <h1 className="ModalHeader">Settings</h1>
        <button className="Button Close" onClick={handleCloseSettings}>
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit} className="Form">
        <div className="FormField">
          <label className="Label" htmlFor="study-time">
            Study Time:
          </label>
          <input
            id="study-time"
            autoComplete="off"
            className="Input"
            value={formStudyTime}
            onChange={(e) => setFormStudyTime(e.target.value)}
          />
        </div>
        <div className="FormField">
          <label className="Label" htmlFor="break-time">
            Break Time:
          </label>
          <input
            id="break-time"
            autoComplete="off"
            className="Input"
            value={formBreakTime}
            onChange={(e) => setFormBreakTime(e.target.value)}
          />
        </div>
        <div className="FormField">
          <label className="Label" htmlFor="volume">
            Sound Volume:
          </label>
          <input
            id="sound-volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={soundVolume}
            onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
          />
        </div>
        <div className="FormField">
          <button type="submit" className="Button Utility">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
