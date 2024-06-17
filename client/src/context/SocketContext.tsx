import { createContext } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

let socket: Socket | undefined = undefined;

type User = {
  username: string;
  id: string;
};

export const connectSocket = (user: User) => {
  console.log("INIT SOCKET CONNECTION");
  socket = io({
    query: { username: user.username, id: user.id },
  });
};

export const SocketContextProvider = ({ children }: any) => {
  // if (socket) {
  //   throw new Error("Socket not initalized!");
  // }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
