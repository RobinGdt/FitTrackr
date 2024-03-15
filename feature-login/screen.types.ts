import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface SignInProps {
  isCreated: boolean;
  loading: boolean;
  navigation: NativeStackNavigationProp<ParamListBase>;
  onSubmit: (data: SignInFormValues) => Promise<void>;
}

export interface LogInProps {
  loginError?: string | null;
  loading?: boolean;
  navigation: NativeStackNavigationProp<ParamListBase>;
  onSubmit: (data: LogInFormValues) => Promise<void>;
}

export type SignInFormValues = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  weight: number;
  size: number;
};

export type LogInFormValues = {
  email: string;
  password: string;
};
