type PercentageCircleProps = {
	percentage: number;
};

export default function PercentageCircle({
	percentage,
}: PercentageCircleProps) {
	const radius = 50;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;

	return (
		<svg className="relative" width="40" height="40" viewBox="0 0 120 120">
            <title>
                {percentage}%
            </title>
			<circle
				cx="60"
				cy="60"
				r={radius}
				stroke="white"
				strokeWidth="10"
				fill="transparent"
			/>
			<circle
				cx="60"
				cy="60"
				r={radius}
				stroke="red"
				strokeWidth="12"
				fill="transparent"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
                transform="rotate(90 60 60)"
			/>
			<text
				x="60"
				y="60"
				textAnchor="middle"
				dy=".3em"
				fontSize="35"
				fill="red"
			>
				{percentage}%
			</text>
		</svg>
	);
}