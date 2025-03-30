type TitleProps = {
	title: string;
	icon: string;
};

export default function Title({ title, icon }: TitleProps) {
	return (
		<h2 className="title-section">
			<i className={`fa-solid fa-${icon}`} />
			{title}
		</h2>
	);
}
