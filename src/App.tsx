import { useEffect } from "react";
import { useActivity } from "./hooks";
import { ActivityList, Form, CaloriesTracker } from "./components";

function App() {
  const {
    state: { activities },
    dispatch,
  } = useActivity();

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  return (
    <>
      <header className="p-3 bg-lime-600">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-lg font-bold text-center text-white uppercase">
            Contador de calorías
          </h1>
          <button
            className="p-2 text-sm font-bold text-white uppercase bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 disabled:opacity-10"
            disabled={activities.length === 0}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="px-5 py-10 md:py-20 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="py-10 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <CaloriesTracker />
        </div>
      </section>

      <section className="max-w-4xl p-10 mx-auto">
        <ActivityList />
      </section>
    </>
  );
}

export default App;
