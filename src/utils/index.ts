import { halfLifeHours, TStatusLevels } from "../lib/constants";
import {
	TCoffeeConsumptionHistory,
	TCoffeeForm,
	TDailyStats,
	THistory,
} from "../lib/types";

export function calculateCurrentCaffeineLevel(
	historyData: TCoffeeConsumptionHistory
): number {
	const currentTime = Date.now();
	const halfLifeMs = halfLifeHours * 60 * 60 * 1000; // Convert half-life to milliseconds
	const maxAgeMs = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

	const result = Object.entries(historyData)
		.filter(([timestamp]) => currentTime - parseInt(timestamp) <= maxAgeMs) // Filter entries within 48 hours
		.reduce((totalCaffeine, [timestamp, entry]) => {
			const timeElapsed = currentTime - parseInt(timestamp);
			const remainingCaffeine =
				entry.caffeine * Math.pow(0.5, timeElapsed / halfLifeMs); // Half-life formula
			return totalCaffeine + remainingCaffeine;
		}, 0)
		.toFixed(2); // Round to 2 decimal places

	return Number(result);
}

// Calculate daily caffeine stats
export function calculateCoffeeStats(
	historyData: TCoffeeConsumptionHistory
): TDailyStats {
	const dailyStats: Record<string, { caffeine: number; count: number }> = {};
	let totalCoffees = 0;
	let totalCaffeine = 0;

	// Process each coffee entry
	Object.entries(historyData).forEach(([timestamp, coffee]) => {
		// Get the date for the history
		const date = new Date(parseInt(timestamp)).toISOString().split("T")[0];
		// Get the caffeine amount
		const caffeine = coffee.caffeine;

		// Initialize daily stats for the date if not present
		dailyStats[date] ??= { caffeine: 0, count: 0 };

		// Update daily stats
		dailyStats[date].caffeine += caffeine;
		dailyStats[date].count += 1;

		// Update totals
		totalCoffees += 1;
	});

	// Calculate total caffeine and days with coffee
	const totalDaysWithCoffee = Object.values(dailyStats).filter(
		(stats) => stats.caffeine > 0
	).length;

	totalCaffeine = Object.values(dailyStats).reduce(
		(sum, stats) => sum + stats.caffeine,
		0
	);

	// Calculate averages
	const days = Object.keys(dailyStats).length;
	const daily_caffeine =
		totalDaysWithCoffee > 0
			? parseFloat((totalCaffeine / totalDaysWithCoffee).toFixed(2))
			: 0;
	const average_coffees =
		days > 0 ? parseFloat((totalCoffees / days).toFixed(2)) : 0;

	return {
		daily_caffeine,
		average_coffees,
	};
}

export function getTopThreeCoffees(historyData: TCoffeeConsumptionHistory) {
	// Count occurrences of each coffee type
	const coffeeCount = Object.values(historyData).reduce<Record<string, number>>(
		(acc, { name }) => {
			acc[name] = (acc[name] || 0) + 1;
			return acc;
		},
		{}
	);

	// Calculate total coffees consumed
	const totalCoffees = Object.values(coffeeCount).reduce(
		(sum, count) => sum + count,
		0
	);

	// Get the top 3 most popular coffees
	return Object.entries(coffeeCount)
		.sort((a, b) => b[1] - a[1]) // Sort by count in descending order
		.slice(0, 3) // Take the top 3
		.map(([coffeeName, count]) => ({
			coffeeName,
			count: String(count),
			percentage: `${Math.floor((count / totalCoffees) * 100)}%`,
		}));
}

export function timeSinceConsumption(utcMilliseconds: number): string {
	const now = Date.now();
	let diffInMilliseconds = now - utcMilliseconds;

	// Define time units in milliseconds
	const units = [
		{ label: "month", value: 30 * 24 * 60 * 60 * 1000 },
		{ label: "day", value: 24 * 60 * 60 * 1000 },
		{ label: "hour", value: 60 * 60 * 1000 },
		{ label: "minute", value: 60 * 1000 },
	];

	// Calculate the time differences
	const result = units
		.map(({ label, value }) => {
			const amount = Math.floor(diffInMilliseconds / value);
			diffInMilliseconds %= value;
			return amount > 0 ? `${amount} ${label}${amount > 1 ? "s" : ""}` : null;
		})
		.filter(Boolean) // Remove null values
		.join(", ");

	const processedResult = result ? `${result} ago` : "just now";

	return processedResult;
}

export function historyAsArray(
	historyData: TCoffeeConsumptionHistory
): THistory[] {
	return Object.keys(historyData)
		.sort((a, b) => Number(b) - Number(a)) // Sort by most recent
		.slice(0, 10) // Limit to 10 most recent entries
		.map((time) => {
			const coffee = historyData[time];
			return {
				coffee,
				timeSinceConsume: timeSinceConsumption(Number(time)),
				originalAmount: coffee.caffeine,
				remainingAmount: calculateCurrentCaffeineLevel({ [time]: coffee }),
			};
		});
}

export function getWarningLevel(
	caffeineLevel: number,
	statusLevels: TStatusLevels
) {
	return caffeineLevel < statusLevels["Nil"].maxLevel
		? "Nil"
		: caffeineLevel < statusLevels["Low"].maxLevel
		? "Low"
		: caffeineLevel < statusLevels["Moderate"].maxLevel
		? "Moderate"
		: caffeineLevel < statusLevels["High"].maxLevel
		? "High"
		: "Critical";
}

export function getNowTimeMinestTimeAgo(selectedCoffee: TCoffeeForm): number {
	const nowTime = Date.now();
	const timeToSubtract =
		selectedCoffee.hour * 60 * 60 * 1000 + selectedCoffee.minutes * 60 * 1000;
	return nowTime - timeToSubtract;
}
