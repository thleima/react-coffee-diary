import { useAuth } from "../../store/AuthContext";
import Button from "../Button";

export default function Header() {
	const { user, logout, toggleLogModal } = useAuth();
	return (
		<header>
			<h1>Coffee Diary</h1>
			{user ? (
				<Button handleClick={logout} text={"Log out"} />
			) : (
				<Button handleClick={toggleLogModal} text={"Sign up Free"} />
			)}
		</header>
	);
}
