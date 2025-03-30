type ButtonProps = {
	handleClick: () => void;
	text: string;
	icon?: boolean;
};

export default function Button({ handleClick, text, icon }: ButtonProps) {
	return (
		<button onClick={handleClick} className={icon ? "btn-icon" : ""}>
			<p>{text}</p>
			{text.includes("Sign up") && <i className="fa-solid fa-rocket"></i>}
			{text.includes("Log out") && (
				<i className="fa-solid fa-right-from-bracket"></i>
			)}
			{text.includes("Log in") && (
				<i className="fa-solid fa-hand-holding-heart"></i>
			)}
			{text.includes("Add Coffee") && <i className="fa-solid fa-mug-hot"></i>}
		</button>
	);
}
