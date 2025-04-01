export type TCoffeeForm = {
	name: string;
	caffeine: number;
	hour: number;
	minutes: number;
};

export type TCoffeeConsumptionHistory = {
	[key: string]: { name: string; caffeine: number };
};

export type TDailyStats = {
	daily_caffeine: number;
	average_coffees: number;
};

export type THistory = {
	time: string;
	coffee: { name: string; caffeine: number };
	timeSinceConsume: string;
	remainingAmount: number;
};

export type TChildren = {
	children?: React.ReactNode;
};
