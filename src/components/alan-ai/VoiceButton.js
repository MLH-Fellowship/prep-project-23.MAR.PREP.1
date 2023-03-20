import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

function VoiceButton() {
  // Adding the Alan button
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_AI,
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);

  return <div></div>;
}

export default VoiceButton;
