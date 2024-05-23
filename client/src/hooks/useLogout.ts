import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    // cleared saved browser data
    const respone = await fetch("/api/auth/logout");

    if (!respone.ok) {
      console.log("Could not clear auth cookie");
    }
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    console.log("LOGGED OUT");
  };

  return { logout };
};
