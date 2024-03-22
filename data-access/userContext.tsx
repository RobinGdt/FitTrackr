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
import { decode as base64Decode } from "base-64";
import * as Updates from "expo-updates";

interface UserContextProps {
  id?: string;
  email: string;
  firstname: string;
  imageUrl?: string;
  weigth?: string;
  phone: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  getUser: () => Promise<void>;
  logOut: () => void;
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
  const [weigth, setWeigth] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  // GET USER INFO FROM TOKEN

  const getUserInfoFromToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        console.log("TOKEN: ", token);
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const [, payloadBase64] = tokenParts;
          const decodedPayload = base64Decode(payloadBase64);
          const decodedToken = JSON.parse(decodedPayload);
          const email = decodedToken.email;
          const id = decodedToken.id;

          console.log("Decoded Token:", decodedToken);

          setEmail(email);
          setId(id);
        } else {
          console.error("invalide token.");
        }
      } else {
        console.error("Empty token.");
      }
    } catch (error) {
      console.error("Fetch token error :", error);
      throw error;
    }
  }, []);

  // GET USER
  const getUser = useCallback(async () => {
    try {
      if (id === undefined) {
        console.error("User ID undefined.");
        return;
      }

      const userData = await fetchUser(
        email,
        phone,
        firstname,
        id,
        imageUrl,
        weigth
      );
      console.log("User data :", userData);
      console.log("weight:", userData.weigth);

      setFirstname(userData.firstname);
      setImageUrl(userData.imageUrl);
      setPhone(userData.phone);
      setWeigth(userData.weigth);
      setId(userData.id);
    } catch (error) {
      console.error("Fetch data error :", error);
    }
  }, [id, fetchUser]);

  // LOG OUT
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setId(undefined);
      setEmail("");
      setFirstname("");
      setPhone("");
      setImageUrl("");
      setWeigth("");
      await Updates.reloadAsync();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        id,
        email,
        phone,
        firstname,
        imageUrl,
        weigth,
        setImageUrl,
        getUser,
        logOut,
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
