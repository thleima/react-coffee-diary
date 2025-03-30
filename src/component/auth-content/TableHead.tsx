type TableHeadProps = {
	titles: string[];
};

export default function TableHead({ titles }: TableHeadProps) {
	return (
		<thead>
			<tr>
				{titles.map((title, index) => {
					return <th key={index}>{title}</th>;
				})}
			</tr>
		</thead>
	);
}
