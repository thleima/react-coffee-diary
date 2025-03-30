type StatCardProps = {
	lg?: boolean;
	title: string;
	children: React.ReactNode;
};

export default function StatCard({ lg, title, children }: StatCardProps) {
	return (
		<div className={"stat-card  " + (lg ? " col-span-2" : "")}>
			<h4>{title}</h4>
			{children}
		</div>
	);
}
