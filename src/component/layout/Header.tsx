import { useAuth } from "../../hooks/useAuth";
import Button from "../Button";

export default function Header() {
	const { user, logout, toggleLogModal } = useAuth();
	return (
		<header>
			<h1>Coffee Diary</h1>
			{user ? (
				<Button handleClick={logout} text={"Log out"} icon />
			) : (
				<Button handleClick={toggleLogModal} text={"Sign up Free"} icon />
			)}
		</header>
	);
}
