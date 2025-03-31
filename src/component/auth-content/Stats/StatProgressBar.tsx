import { getWarningLevel } from "../../../utils";
import { statusLevels } from "../../../lib/constants";
import { getLevelAsWidth } from "../../../utils/helpers";

type StatProgressBarProps = {
	level: number;
};

export default function StatProgressBar({ level }: StatProgressBarProps) {
	const warningLevel = getWarningLevel(level, statusLevels);

	const maxLevel = statusLevels["High"].maxLevel;

	// Set a minimum width of 14% for the progress bar
	const progressBarWidth = Math.max(getLevelAsWidth(level, maxLevel), 14);

	return (
		<>
			<div className="bcg-progress">
				<div
					className="progress-bar"
					style={{
						color: statusLevels[warningLevel].color,
						backgroundColor: statusLevels[warningLevel].background,
						width: `${progressBarWidth}%`,
						transition: "width 0.6s ease-in",
					}}>
					{warningLevel}
				</div>
			</div>

			<p>{statusLevels[warningLevel].description}</p>
		</>
	);
}
