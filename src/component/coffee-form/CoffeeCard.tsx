import { TCoffeeForm } from "../../lib/types";

type CoffeeCardProps = {
	onSelect: () => void;
	selected: TCoffeeForm;
	coffee: { name: string; caffeine: number };
};

export default function CoffeeCard({
	onSelect,
	selected,
	coffee,
}: CoffeeCardProps) {
	return (
		<button
			onClick={onSelect}
			className={`button-card ${
				selected.name === coffee.name ? "coffee-button-selected" : ""
			}`}>
			<h4>{coffee.name}</h4>
			<p>{coffee.caffeine}mg</p>
		</button>
	);
}
