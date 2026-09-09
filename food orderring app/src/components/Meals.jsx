import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import { Error } from "./Error.jsx";
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(`${import.meta.env.VITE_BACKEND_URL}/meals`, requestConfig, []);

  // const [loadedMeals, setLoadedMeals] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchMeals() {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/meals`);

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch meals");
  //       }

  //       const meals = await response.json();
  //       setLoadedMeals(meals);
  //     } catch (err) {
  //       setError(err.message || "Something went wrong!");
  //     }
  //     setIsLoading(false);
  //   }

  //   fetchMeals();
  // }, []);

  if (isLoading) {
    return <p className="text-center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to load meals" message={error} />;
  }

  return (
    <ul className="w-[90%] max-w-[70rem] list-none my-8 mx-auto p-4 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
