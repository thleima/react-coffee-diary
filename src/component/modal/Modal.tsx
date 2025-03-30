import { useAuth } from "../../hooks/useAuth";
import { TChildren } from "../../lib/types";

export default function Modal({ children }: TChildren) {
	const { toggleLogModal } = useAuth();
	return (
		<div className="modal-container">
			<div onClick={toggleLogModal} className="modal-underlay" />
			<div className="modal-content">{children}</div>
		</div>
	);
}
