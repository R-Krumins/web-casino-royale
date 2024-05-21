import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    // cleared saved browser data
    await fetch("/api/auth/logout");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    console.log("LOGGED OUT");
  };

  return { logout };
};
