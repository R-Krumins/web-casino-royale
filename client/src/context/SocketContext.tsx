import { createContext } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

let socket: Socket | undefined = undefined;

type User = {
  username: string;
  id: string;
};

export const connectSocket = (user: User) => {
  //TODO: fix connection URL
  console.log("ASS");
  console.log(user);

  socket = io("http://localhost:3000", {
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
