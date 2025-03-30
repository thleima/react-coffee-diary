import { useAuth } from "../../../store/AuthContext";
import {
	calculateCoffeeStats,
	calculateCurrentCaffeineLevel,
	getTopThreeCoffees,
} from "../../../utils";
import Title from "../../Title";
import StatProgressBar from "./StatProgressBar";
import TableHead from "../TableHead";
import TableRow from "../TableRow";
import StatCard from "./StatCard";
import StatText from "./StatText";

export default function Stats() {
	const { userData } = useAuth();
	const stats = calculateCoffeeStats(userData);
	const caffeine_level = calculateCurrentCaffeineLevel(userData);

	const { daily_caffeine, average_coffees } = stats;

	const topThreeCoffees = getTopThreeCoffees(userData);

	return (
		<>
			<Title title="Stats" icon="chart-simple" />
			<div className="stats-grid">
				<StatCard lg title="Active Caffeine Level">
					<StatText level={caffeine_level} />
					<StatProgressBar level={caffeine_level} />
				</StatCard>
				<StatCard title="Avg Daily Caffeine">
					<StatText level={daily_caffeine} />
				</StatCard>
				<StatCard title="Avg # of Coffees">
					<StatText av level={average_coffees} />
				</StatCard>
				<table className="stat-table">
					<TableHead
						titles={["Coffee Type", "Nb of units", "Percentage of Total"]}
					/>
					<tbody>
						{topThreeCoffees.length === 0 ? (
							<tr>
								<td colSpan={4}>No coffes yet !</td>
							</tr>
						) : (
							topThreeCoffees.map((coffee, index) => {
								return (
									<TableRow
										key={index}
										name={coffee.coffeeName}
										data1={coffee.count}
										data2={coffee.percentage}
									/>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
