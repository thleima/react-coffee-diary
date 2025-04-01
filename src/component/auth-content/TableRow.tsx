type TableRowProps = {
	name: string;
	data1: string;
	data2: string;
	onDelete?: () => void;
};

export default function TableRow({
	name,
	data1,
	data2,
	onDelete,
}: TableRowProps) {
	return (
		<tr>
			<td>{name}</td>
			<td>{data1}</td>
			<td style={{ display: "flex", justifyContent: "space-between" }}>
				{data2}
				{onDelete && (
					<span onClick={onDelete} style={{ cursor: "pointer" }}>
						<i className="fa-solid fa-xmark"></i>
					</span>
				)}
			</td>
		</tr>
	);
}
