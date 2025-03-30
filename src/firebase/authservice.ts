import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	setPersistence,
	browserLocalPersistence,
} from "firebase/auth";
import { firebaseAuth, firebaseDB } from "./config";
import { TUserFormValues } from "./authtypes";
import { doc, setDoc } from "firebase/firestore";

//required if you want to keep logged in after user exits the browser or closes tab
setPersistence(firebaseAuth, browserLocalPersistence);

const signIn = async ({ email, password }: TUserFormValues) => {
	const result = await signInWithEmailAndPassword(
		firebaseAuth,
		email,
		password
	);
	return result;
};

const signUp = async ({ email, password }: TUserFormValues) => {
	const result = await createUserWithEmailAndPassword(
		firebaseAuth,
		email,
		password
	);
	return result;
};

const logout = async () => {
	await signOut(firebaseAuth);
};

const resetPassword = async (email: string) => {
	await sendPasswordResetEmail(firebaseAuth, email);
};

const postToDatabase = async (userId: string, toPost: object) => {
	const userRef = doc(firebaseDB, "users", userId);
	await setDoc(userRef, toPost, { merge: true });
};

const firebaseService = {
	signIn,
	signUp,
	logout,
	resetPassword,
	postToDatabase,
};

export default firebaseService;
