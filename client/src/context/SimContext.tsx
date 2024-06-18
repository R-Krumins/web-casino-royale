import { createContext, useEffect, useState } from "react";
import { useSocketContext } from "../hooks/useSocketContext";

type Item = {
  symbol: string;
  amount: number;
  open: number;
  high: number;
  low: number;
  close: number;
  adjclose: number;
  volume: number;
};

type SimData = {
  portfolio: Item[] | [];
  portfolioValue: number;
  liquidCash: number;
  curentDate: string;
  searched: Item | null;
};

const intialState: SimData = {
  portfolio: [],
  portfolioValue: 0,
  liquidCash: 0,
  curentDate: "0000-00-00",
  searched: null,
};

const SimContext = createContext<SimData | null>(null);

const SimContextProvider = ({ children }: any) => {
  const [simData, setSimData] = useState<SimData>(intialState);
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("update", handleUpdate);
  }, [socket]);

  const handleUpdate = (update: SimData) => {
    if (!update) return;

    if (update.portfolio.length === 0) {
      setSimData((prev) => ({ ...prev, curentDate: update.curentDate }));
      return;
    }

    update.portfolioValue = update.portfolio.reduce((sum, item) => {
      return sum + item.close * item.amount;
    }, 0);

    setSimData(update);
  };

  return <SimContext.Provider value={simData}>{children}</SimContext.Provider>;
};

export { SimContext, SimContextProvider };
