import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (username: string, password: string) => {
    setIsLoading(true);
    setUsernameError("");
    setPasswordError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.errors) {
        setIsLoading(false);
        setUsernameError(data.errors.username);
        setPasswordError(data.errors.password);
      }

      if (data.username) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("id", data.id);
        dispatch({ type: "LOGIN", payload: data });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { signup, isLoading, usernameError, passwordError };
};
