import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function VoiceButton() {
  // Adding the Alan button
  useEffect(() => {
    alanBtn({
      key: "bd5dd5642c8a637ed98c0a96706bb8052e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);
}
