import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useApi, useApiResult } from "../useApi/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";

interface UserContextProps {
  id?: string;
  email: string;
  firstname: string;
  phone: string;
  getUser: () => void;
  fetchUser: useApiResult["fetchUser"];
  getUserInfoFromToken: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { fetchUser } = useApi();

  const [id, setId] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");

  // GET USER INFO FROM TOKEN

  const getUserInfoFromToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      if (token) {
        const key = "fjqfkljvdnklke12";
        const decodedToken: any = JWT.decode(token, key);

        const email = decodedToken.email;

        setEmail(email);

        console.log("email:", email);
      } else {
        console.error("Le token est vide.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur à partir du token :",
        error
      );
      throw error;
    }
  }, []);

  // GET USER
  const getUser = useCallback(async () => {
    try {
      if (id === undefined) {
        console.error("L'ID de l'utilisateur est indéfini.");
        return;
      }

      const userData = await fetchUser(email, firstname, phone, id);
      console.log("Données de l'utilisateur :", userData);

      setPhone(userData.phone);
      setFirstname(userData.firstname);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'utilisateur :",
        error
      );
    }
  }, [id, fetchUser]);

  return (
    <UserContext.Provider
      value={{
        id,
        email,
        phone,
        firstname,
        getUser,
        fetchUser,
        getUserInfoFromToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
