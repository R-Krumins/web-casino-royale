import { createContext, useEffect, useReducer } from "react";
import { connectSocket } from "./SocketContext";

export const AuthContext = createContext<any | null>(null);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      connectSocket(action.payload);
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    if (username && id) {
      dispatch({ type: "LOGIN", payload: { username, id } });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
