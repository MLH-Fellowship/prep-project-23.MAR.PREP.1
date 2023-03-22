import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const COMMANDS = {
  CHANGE_LOCATION: "change-location",
};
function VoiceButton({ handleCityChange }) {
  // Adding the Alan button
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_AI,
      onCommand: ({ command, payload }) => {
        if (command === COMMANDS.CHANGE_LOCATION) {
          handleCityChange(payload);
        }
      },
    });
  }, []);

  return <div></div>;
}

export default VoiceButton;
