import { User } from "firebase/auth";
import { TCoffeeConsumptionHistory } from "../lib/types";

export type TUserFormValues = {
	email: string;
	password: string;
};

export type TAuth = {
	user: User | null;
	userData: TCoffeeConsumptionHistory;
	setUserData: (data: TCoffeeConsumptionHistory) => void;
	signIn: (creds: TUserFormValues) => void;
	signUp: (creds: TUserFormValues) => void;
	logout: () => void;
	resetPassword: (email: string) => void;
	postToDatabase: (userId: string, toPost: TCoffeeConsumptionHistory) => void;
	deleteCoffeeFromDatabase: (userId: string, field: string) => void;
	showLogModal: boolean;
	toggleLogModal: () => void;
};
