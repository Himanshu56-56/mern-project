import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ================= TOKEN =================
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [services, setServices] = useState([]); // ✅ services state
  const authorizationToken = `Bearer ${token}`;

  // ================= STORE TOKEN =================
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // ================= LOGIN STATUS =================
  const isLoggedIn = !!token;

  // ================= LOGOUT =================
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // ================= USER AUTH =================
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/auth/user",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false);
      } else {
        LogoutUser();
        console.error("Error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Auth Error:", error);
    }
  };

  // ================= SERVICES FETCH =================
  const getServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/data/service"
      );

      const data = await response.json();

      console.log("API DATA 👉", data);

      // ✅ backend direct array bhej raha hai
      setServices(data);
    } catch (error) {
      console.log("Service Fetch Error:", error);
    }
  };

  // ================= EFFECTS =================

  // user fetch when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  // services load on app start
  useEffect(() => {
    getServices();
  }, []);

  // ================= PROVIDER =================
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services, // ✅ service page yahi se data lega
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= CUSTOM HOOK =================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
