import { createContext, useEffect } from "react";
import * as io from "socket.io-client";

export const SocketContext = createContext<io.Socket | undefined>(undefined);

let socket: io.Socket | undefined = undefined;

export const connectSocket = () => {
  socket = io.connect("http://localhost:3000");
};

export const SocketContextProvider = ({ children }: any) => {
  // if (socket) {
  //   throw new Error("Socket not initalized!");
  // }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
