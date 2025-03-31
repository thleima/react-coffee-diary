import { useAuthState } from "../hooks/useAuthState";
import { AuthContext } from "./AuthContext";
import Spinner from "../component/Spinner";
import { TChildren, TCoffeeConsumptionHistory } from "../lib/types";
import { useState } from "react";
import { TUserFormValues } from "../firebase/authtypes";
import firebaseService from "../firebase/authservice";

export const AuthProvider = ({ children }: TChildren) => {
	const { user, isLoading, userData, setUserData, setUser } = useAuthState();
	const [showLogModal, setShowLogModal] = useState(false);

	const signIn = async (creds: TUserFormValues) => {
		const result = await firebaseService.signIn(creds);
		return result;
	};

	const signUp = async (creds: TUserFormValues) => {
		const result = await firebaseService.signUp(creds);
		return result;
	};

	const logout = () => {
		setUser(null);
		setUserData({});
		return firebaseService.logout();
	};

	const resetPassword = async (email: string) => {
		await firebaseService.resetPassword(email);
	};

	const toggleLogModal = () => {
		setShowLogModal((prev) => !prev);
	};

	const postToDatabase = async (
		userId: string,
		toPost: TCoffeeConsumptionHistory
	) => {
		await firebaseService.postToDatabase(userId, toPost);
	};

	const value = {
		user,
		userData,
		setUserData,
		signIn,
		signUp,
		logout,
		resetPassword,
		postToDatabase,
		showLogModal,
		toggleLogModal,
	};

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? <Spinner /> : children}
		</AuthContext.Provider>
	);
};
