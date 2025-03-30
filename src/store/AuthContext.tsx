// Firebase imports
import firebaseService from "../firebase/authservice";
import { TAuth, TUserFormValues } from "../firebase/authtypes";
import { firebaseAuth, firebaseDB } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
//
import { createContext, useContext, useState, useEffect } from "react";
import { TChildren, TCoffeeConsumptionHistory } from "../lib/types";
import Spinner from "../component/Spinner";

const AuthContext = createContext<TAuth>({
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

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: TChildren) => {
	const [user, setUser] = useState<User | null>(firebaseAuth.currentUser);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState({} as TCoffeeConsumptionHistory);
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

	const postToDatabase = async (userId: string, toPost: object) => {
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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
			setUser(user);
			if (!user) {
				console.log("No active user");
				return;
			}
			try {
				setIsLoading(true);
				const docRef = doc(firebaseDB, "users", user.uid);
				const docSnap = await getDoc(docRef);
				let firebaseData = {};
				if (docSnap.exists()) {
					firebaseData = docSnap.data();
					console.log("Found user data", firebaseData);
				}
				setUserData(firebaseData);
			} catch (e) {
				console.log("Error fetching user data", e);
			} finally {
				setIsLoading(false);
			}
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? <Spinner /> : children}
		</AuthContext.Provider>
	);
};
