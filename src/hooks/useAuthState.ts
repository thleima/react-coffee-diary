import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "../firebase/config";
import { TCoffeeConsumptionHistory } from "../lib/types";

export function useAuthState() {
	const [user, setUser] = useState<User | null>(firebaseAuth.currentUser);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState({} as TCoffeeConsumptionHistory);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
			setUser(user);
			if (!user) {
				return;
			}
			try {
				setIsLoading(true);
				const docRef = doc(firebaseDB, "users", user.uid);
				const docSnap = await getDoc(docRef);
				let firebaseData = {};
				if (docSnap.exists()) {
					firebaseData = docSnap.data();
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

	return { user, isLoading, userData, setUserData, setUser };
}
