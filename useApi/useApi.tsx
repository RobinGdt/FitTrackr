import { useCallback } from "react";
import { User } from "./interface.type";

export interface useApiResult {
  addNewUser: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string,
    weight: number,
    size: number
  ) => Promise<User>;
  logInUser: (email: string, password: string) => Promise<User>;
  fetchUser: (email: string, phone: string, firstname: string) => Promise<User>;
}
export const useApi = (): useApiResult => {
  const addNewUser: useApiResult["addNewUser"] = useCallback(
    async (
      email: string,
      password: string,
      firstname: string,
      lastname: string,
      phone: string,
      weight: number,
      size: number
    ) => {
      try {
        const url = "http://192.168.1.176:8000/api/users";
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
            weight: weight,
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
        const url = "http://192.168.1.176:8000/auth";
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
        return data;
      } catch (error) {
        console.error("Échec de la connexion :", error);
        throw error;
      }
    },
    []
  );

  const fetchUser: useApiResult["fetchUser"] = useCallback(
    async (email: string, phone: string, firstname: string) => {
      try {
        const url = "http://192.168.1.176:8000/";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            phone: phone,
            firstname: firstname,
          }),
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
