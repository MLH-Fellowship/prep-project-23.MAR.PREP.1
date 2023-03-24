import React, { useEffect, useState } from "react";
import activityCategories from "./Activities.json";

function ActivityRecommendation({ weatherCode }) {
  const [recommendedactivity, setRecommendedactivities] = useState([]);

  useEffect(() => {
    const activityCategory = chooseactivity(weatherCode);

    //choose 5 random activities from category
    const randomRecommendations = new Set();
    while (randomRecommendations.size < 3) {
      const randIdx = Math.floor(
        Math.random() * activityCategories[activityCategory].length
      );
      randomRecommendations.add(activityCategories[activityCategory][randIdx]);
    }
    setRecommendedactivities(Array.from(randomRecommendations));
  }, [weatherCode]);

  return (
    <>
      <div className="activity-recommendation-container">
        <h2>Perfect activity for this weather!</h2>
      
        {recommendedactivity.map((activity, index) => (
          <div className="activity-box" key={index}>
            <h2 className="activity-name">{activity}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

function chooseactivity(weatherCode) {
  if (weatherCode >= 200 && weatherCode <= 232) {
    return "winter";
  } else if (weatherCode >= 300 && weatherCode <= 531) {
    return "spring";
  } else if (weatherCode >= 600 && weatherCode <= 622) {
    return "winter";
  } else if (weatherCode === 800) {
    return "summer";
  } else if (weatherCode >= 801 && weatherCode <= 804) {
    return "fall";
  } else {
    return "fall";
  }
}

export default ActivityRecommendation;
