import { useAuth } from "../../store/AuthContext";
import { historyAsArray } from "../../utils";
import Title from "../Title";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

export default function History() {
	const { userData } = useAuth();
	const history = historyAsArray(userData);
	return (
		<>
			<Title title="History" icon="timeline" />
			<table className="stat-table">
				<TableHead
					titles={["Coffee Type", "Consumption's time", "Remaining Caffeine"]}
				/>
				<tbody>
					{history.length === 0 ? (
						<tr>
							<td colSpan={4}>No history yet !</td>
						</tr>
					) : (
						history.map((coffee, index) => {
							const {
								coffee: { name, caffeine },
								timeSinceConsume,
								remainingAmount,
							} = coffee;

							return (
								<TableRow
									key={index}
									name={name}
									data1={timeSinceConsume}
									data2={`${remainingAmount}mg / ${caffeine}mg`}
								/>
							);
						})
					)}
				</tbody>
			</table>
		</>
	);
}
