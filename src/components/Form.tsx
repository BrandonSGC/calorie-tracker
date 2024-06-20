import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useActivity } from "../hooks";
import { categories } from "../data";
import type { Activity } from "../types";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export const Form = () => {
  const [activity, setActivity] = useState<Activity>(initialState);
  const {
    state: { activities, activeId },
    dispatch,
  } = useActivity();

  useEffect(() => {
    if (activeId) {
      const selectedActivity = activities.find(
        (activity) => activity.id === activeId
      );

      if (selectedActivity) {
        setActivity(selectedActivity);
      }
    }
  }, [activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const isNumberField = ["category", "calories"].includes(name);

    setActivity({
      ...activity,
      [name]: isNumberField ? +value : value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="p-10 space-y-5 bg-white rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría
        </label>
        <select
          className="w-full p-2 border rounded-lg border-slate-300"
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          className="p-2 border rounded-lg border-slate-300"
          id="name"
          name="name"
          type="text"
          placeholder="Ejemplo: Hamburguesa, Ejercicio, Ensalada, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          className="p-2 border rounded-lg border-slate-300"
          id="calories"
          name="calories"
          type="number"
          placeholder="Ejemplo: 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        className="w-full p-2 font-bold text-white uppercase bg-gray-800 cursor-pointer hover:bg-gray-900 disabled:opacity-5"
        type="submit"
        value={`Guardar ${activity.category === 1 ? "Comida" : "Ejercicio"}`}
        disabled={!isValidActivity()}
      />
    </form>
  );
};
