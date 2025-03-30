type TableRowProps = {
	name: string;
	data1: string;
	data2: string;
};

export default function TableRow({ name, data1, data2 }: TableRowProps) {
	return (
		<tr>
			<td>{name}</td>
			<td>{data1}</td>
			<td>{data2}</td>
		</tr>
	);
}
