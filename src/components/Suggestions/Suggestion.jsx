import React from "react";
import { Items } from "./items";
import "./Suggestion.css";

export default function Suggestion({ weatherType, isLoaded }) {
  console.log(weatherType);
  console.log(isLoaded);

  return (
    <>
      <h1 className="suggestion-title">Items to Bring</h1>
      <div className="suggestions-container">
        {isLoaded && weatherType ? (
          <>
            {Object.entries(Items[weatherType]).map((item, index) => {
              return (
                <div className="suggestion-box" key={index}>
                  <img
                    className="suggestion-image"
                    src={item[1]}
                    alt={item[0]}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
