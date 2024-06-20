import { ActivityContext } from "../context";

import { useContext } from "react";

export const useActivity = () => {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivity hook must be used inside of a ActivityProvider."
    );
  }

  return {
    ...context,
  };
};
