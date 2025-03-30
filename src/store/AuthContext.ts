import { createContext } from "react";
import { TAuth } from "../firebase/authtypes";
import { firebaseAuth } from "../firebase/config";
import { TCoffeeConsumptionHistory } from "../lib/types";

export const AuthContext = createContext<TAuth>({
	user: firebaseAuth.currentUser,
	userData: {} as TCoffeeConsumptionHistory,
	setUserData: () => {},
	signIn: () => {},
	signUp: () => {},
	logout: () => {},
	resetPassword: () => {},
	postToDatabase: () => {},
	showLogModal: false,
	toggleLogModal: () => {},
});
