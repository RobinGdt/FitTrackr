import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface UserContextProps {
  userId?: string;
  email: string;
  phone: string;
  fetchUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchUser = useCallback(async () => {
    try {
    } catch {}
  }, []);

  return (
    <UserContext.Provider value={{ userId, email, phone, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
