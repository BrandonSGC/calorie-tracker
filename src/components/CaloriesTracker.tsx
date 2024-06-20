import { CaloriesDisplay } from "./CaloriesDisplay";
import { useActivity } from "../hooks";

export const CaloriesTracker = () => {
  const { caloriesBurned, caloriesConsumed, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-4xl font-black text-center text-white">
        Resumen de Calorías
      </h2>

      <div className="flex flex-col items-center gap-5 mt-5 md:flex-row md:justify-between">
        <CaloriesDisplay calories={caloriesConsumed} text="Consumidas" />
        <CaloriesDisplay calories={caloriesBurned} text="Ejercicio" />
        <CaloriesDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
};
