import { TChildren } from "../../lib/types";
import { useAuth } from "../../store/AuthContext";

export default function Modal({ children }: TChildren) {
	const { toggleLogModal } = useAuth();
	return (
		<div className="modal-container">
			<div onClick={toggleLogModal} className="modal-underlay" />
			<div className="modal-content">{children}</div>
		</div>
	);
}
