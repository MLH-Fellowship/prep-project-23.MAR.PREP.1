import React, { useEffect, useState } from "react";
import foodCategories from "./foodCategories.json";

function FoodRecommendation() {
  const [recommendedFoods, setRecommendedFoods] = useState([]);

  useEffect(() => {
    //add logic to choose category based on current weather here (would be in props)

    
    //choose 5 random foods from category
    const randomRecommendations = new Set();
    while (randomRecommendations.size < 5) {
      const randIdx = Math.floor(Math.random() * foodCategories.summer.length);
      randomRecommendations.add(foodCategories.summer[randIdx]);
    }
    setRecommendedFoods(Array.from(randomRecommendations));
  }, []);

  return <div>FoodRecommendation</div>;
}

export default FoodRecommendation;
