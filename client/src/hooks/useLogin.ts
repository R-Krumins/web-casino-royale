import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      console.log(data);

      if (data.errors) {
        setIsLoading(false);
        setErrorMsg(data.errors.msg);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { login, isLoading, errorMsg };
};
