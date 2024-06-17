import { useContext } from "react";
import { SimContext } from "../context/SimContext";

export const useSimContext = () => {
  const context = useContext(SimContext);

  if (!context) {
    throw Error("useSimContext must be used inside an SimContextProvider!");
  }

  return context;
};
