export const halfLifeHours = 5;

// ** Coffee Options to select in dropdown menu (CoffeeForm.tsx) **

type TCoffeeOptions = {
	name: string;
	caffeine: number;
};

export const coffeeOptions: TCoffeeOptions[] = [
	{ name: "Espresso", caffeine: 63 },
	{ name: "Double Espresso", caffeine: 126 },
	{ name: "Americano", caffeine: 96 },
	{ name: "Cappuccino", caffeine: 80 },
	{ name: "Latte", caffeine: 80 },
	{ name: "Mocha", caffeine: 90 },
	{ name: "Macchiato", caffeine: 85 },
	{ name: "Flat White", caffeine: 130 },
	{ name: "Black Coffee (200ml)", caffeine: 95 },
	{ name: "Iced Coffee (200ml)", caffeine: 90 },
	{ name: "Frappuccino", caffeine: 95 },
	{ name: "Turkish Coffee", caffeine: 160 },
	{ name: "Irish Coffee", caffeine: 70 },
	{ name: "Vietnamese Coffee", caffeine: 100 },
	{ name: "Affogato", caffeine: 65 },
	{ name: "Instant Coffee (1 tsp)", caffeine: 30 },
	{ name: "Decaf Coffee", caffeine: 2 },
	{ name: "Chai Latte", caffeine: 40 },
	{ name: "Matcha Latte", caffeine: 70 },
	{ name: "Monster Energy (50cl)", caffeine: 160 },
	{ name: "Red Bull (250ml)", caffeine: 80 },
	{ name: "Rockstar Energy (50cl)", caffeine: 160 },
];

// ** Statut Level for the current Caffeine Level (auth-content/Stats.tsx) **
export type TStatusLevels = {
	[key: string]: {
		color: string;
		background: string;
		description: string;
		maxLevel: number;
	};
};

export const statusLevels: TStatusLevels = {
	Nil: {
		color: "#047857",
		background: "transparent",
		description: "Your caffeine level is nil. You may feel tired or unfocused.",
		maxLevel: 1,
	},
	Low: {
		color: "#047857",
		background: "#d1fae5",
		description:
			"Caffeine levels are mild, resulting in a light boost in alertness with minimal side effects.",
		maxLevel: 200,
	},
	Moderate: {
		color: "#b45309",
		background: "#fef3c7",
		description:
			"A moderate amount of caffeine leads to noticeable stimulation, increased focus, and potential restlessness.",
		maxLevel: 400,
	},
	High: {
		color: "#e11d48",
		background: "#ffe4e6",
		description:
			"Elevated caffeine levels can cause jitteriness, rapid heartbeat, and trouble concentrating, signaling an excessive intake.",
		maxLevel: 600,
	},
	Critical: {
		color: "#522546",
		background: "#BF3131",
		description:
			"Excessive caffeine consumption can lead to severe health issues, including heart problems and anxiety.",
		maxLevel: 1000,
	},
};
