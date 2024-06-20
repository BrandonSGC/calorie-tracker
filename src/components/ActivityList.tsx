import { useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { useActivity } from "../hooks";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";

export const ActivityList = () => {
  const {
    state: { activities },
    dispatch,
  } = useActivity();

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => cat.id === category && cat.name),
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-center text-slate-600">
        Comida y Actividades
      </h2>

      {activities.length === 0 && (
        <p className="my-5 text-center">No hay actividades aún...</p>
      )}

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex justify-between px-5 py-10 bg-white"
        >
          <div className="relative space-y-2">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(activity.category)}
            </p>
            <p className="pt-5 text-2xl font-bold">{activity.name}</p>
            <p className="text-4xl font-black text-lime-500">
              {activity.calories} {""}
              <span>Calorías</span>
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() =>
                dispatch({ type: "set-activeId", payload: { id: activity.id } })
              }
            >
              <PencilSquareIcon className="text-gray-800 size-8 hover:scale-105" />
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "delete-activity",
                  payload: { id: activity.id },
                })
              }
            >
              <XCircleIcon className="text-red-500 size-8 hover:scale-105" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
