export default function StatText({
	level,
	av,
}: {
	level: number;
	av?: boolean;
}) {
	return (
		<p>
			<span className="stat-text">{level}</span>
			{av ? "per day" : "mg"}
		</p>
	);
}
