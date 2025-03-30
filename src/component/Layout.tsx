import Modal from "./modal/Modal";
import Header from "./layout/Header";
import Authentication from "./modal/Authentication";
import { createPortal } from "react-dom";
import { useAuth } from "../store/AuthContext";
import { TChildren } from "../lib/types";

export default function Layout({ children }: TChildren) {
	const { showLogModal } = useAuth();

	return (
		<>
			{showLogModal &&
				createPortal(
					<Modal>
						<Authentication />
					</Modal>,
					document.body
				)}
			<>
				<Header />
				<div className="content">{children}</div>
			</>
		</>
	);
}
