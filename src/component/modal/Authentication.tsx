import {
	checkCreds,
	getErrorMessage,
	handleCredsErrors,
} from "../../utils/helpers";
import { useState } from "react";
import Button from "../Button";
import { useAuth } from "../../hooks/useAuth";

export default function Authentication() {
	const [isRegister, setIsRegister] = useState(true);
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	const { signUp, signIn, toggleLogModal } = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prev) => ({ ...prev, [name]: value }));
	};

	const toggleRegister = () => {
		setIsRegister((prev) => !prev);
		setError("");
	};

	const handleAuthenticate = async () => {
		const { email, password } = user;
		if (!checkCreds(email, password)) {
			setError("Please enter a valid email and password");
			return;
		}
		try {
			if (isRegister) {
				await signUp(user);
			} else {
				await signIn(user);
			}
			setError("");
			toggleLogModal();
		} catch (err) {
			const reportError = getErrorMessage(err);
			setError(handleCredsErrors(reportError));
		}
	};
	return (
		<>
			<div className="register-content">
				{isRegister ? (
					<p>Already have an account ?</p>
				) : (
					<p>Don&apos;t have an account ?</p>
				)}
				<Button
					handleClick={toggleRegister}
					text={isRegister ? "Log in" : "Sign up"}
					icon
				/>
			</div>
			<hr />
			<h2>{isRegister ? "Sign up" : "Log in"}</h2>
			{isRegister ? <p>Create your account</p> : <p>Connect to your account</p>}
			{error && <p>❌ {error}</p>}
			<input
				value={user.email}
				name="email"
				onChange={handleChange}
				placeholder="Email"
			/>
			<input
				value={user.password}
				onChange={handleChange}
				placeholder="*****"
				type="password"
				name="password"
			/>
			<Button handleClick={handleAuthenticate} text={"Submit"} />
		</>
	);
}
