import { useAuth } from "../../hooks/useAuth";
import { historyAsArray } from "../../utils";
import { getErrorMessage } from "../../utils/helpers";
import Title from "../Title";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

export default function History() {
	const { userData, user, deleteCoffeeFromDatabase, setUserData } = useAuth();
	const history = historyAsArray(userData);
	const userid = user ? user.uid : "";

	const deleteCoffee = (uid: string, time: string) => {
		try {
			deleteCoffeeFromDatabase(uid, time);
		} catch (error) {
			const message = getErrorMessage(error);
			console.error(message);
			alert(`An error occurred while deleting the coffee: ${message}`);
		} finally {
			// perform a fast refresh on userData
			Object.keys(userData).filter((key) => key === time);
			const newUserData = { ...userData };
			delete newUserData[time];
			setUserData(newUserData);
		}
	};
	return (
		<div className="history">
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
								time,
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
									onDelete={() => deleteCoffee(userid, time)}
								/>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
