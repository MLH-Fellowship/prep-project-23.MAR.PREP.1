import React, { useEffect, useState } from "react";
import foodCategories from "./foodCategories.json";

function FoodRecommendation({ weatherCode }) {
  const [recommendedFoods, setRecommendedFoods] = useState([]);

  useEffect(() => {
    const foodCategory = chooseFoodCategory(weatherCode);

    //choose 5 random foods from category
    const randomRecommendations = new Set();
    while (randomRecommendations.size < 3) {
      const randIdx = Math.floor(Math.random() * foodCategories[foodCategory].length);
      randomRecommendations.add(foodCategories[foodCategory][randIdx]);
    }
    setRecommendedFoods(Array.from(randomRecommendations));
  }, [weatherCode]);

  return (
    <div className="recommended-foods">
      <h3>Recommended Foods</h3>
      <ul>
        {recommendedFoods.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
    </div>
  );
}

function chooseFoodCategory(weatherCode) {
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

export default FoodRecommendation;
