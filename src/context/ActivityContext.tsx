import { createContext, ReactNode, useMemo, useReducer } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const { activities } = state;

  // Counters
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
