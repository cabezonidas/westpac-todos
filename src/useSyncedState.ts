import { useEffect, useState } from "react";

export function useSyncedState<T>(key: string, value?: T) {
  const stateArray = useState<T>(() => {
    const cached = localStorage?.getItem(key);
    // This is not reliable, needs validation in real world
    return cached ? JSON.parse(cached) : value;
  });

  const [state] = stateArray;

  useEffect(() => {
    localStorage?.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return stateArray;
}
