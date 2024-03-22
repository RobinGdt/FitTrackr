import { useCallback } from "react";
import { User } from "./interface.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import { useUser } from "../data-access/userContext";

export interface useApiResult {
  addNewUser: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string,
    weigth: number,
    size: number,
    imgUrl: string | { uri: string }
  ) => Promise<User>;
  logInUser: (email: string, password: string) => Promise<User>;
  fetchUser: (
    email: string,
    phone: string,
    firstname: string,
    id?: string,
    imageUrl?: string,
    weigth?: string
  ) => Promise<User>;
}
export const useApi = (): useApiResult => {
  const addNewUser: useApiResult["addNewUser"] = useCallback(
    async (
      email: string,
      password: string,
      firstname: string,
      lastname: string,
      phone: string,
      weigth: number,
      size: number
    ) => {
      try {
        const url = "http://172.20.10.2:8000/api/users";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            weigth: weigth,
            size: size,
          }),
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log("User created: ", data);
        return data;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const logInUser: useApiResult["logInUser"] = useCallback(
    async (email: string, password: string) => {
      try {
        const url = "http://172.20.10.2:8000/auth";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          const error = new Error(`Erreur HTTP ! Statut : ${response.status}`);
          (error as any).status = response.status;
          throw error;
        }

        const data = await response.json();

        if (typeof data.weigth === "number") {
          data.weigth = data.weigth.toString();
        }

        const token = JWT.encode({ email: data.email }, "fjqfkljvdnklke12");

        await AsyncStorage.setItem("userToken", token);
        return data;
      } catch (error) {
        console.error("Échec de la connexion :", error);
        throw error;
      }
    },
    []
  );

  const fetchUser: useApiResult["fetchUser"] = useCallback(
    async (
      email: string,
      phone: string,
      firstname: string,
      id?: string,
      imageUrl?: string,
      weight?: string
    ) => {
      try {
        const url = `http://172.20.10.2:8000/api/users/${id}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          const error = new Error(`Erreur HTTP ! Statut : ${response.status}`);
          (error as any).status = response.status;
          throw error;
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Échec de la connexion :", error);
        throw error;
      }
    },
    []
  );

  return {
    addNewUser,
    logInUser,
    fetchUser,
  };
};
