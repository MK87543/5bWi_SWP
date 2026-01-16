import type { HourlyTrafficData } from "../types/traffic";

interface TrafficChartProps {
    hours: HourlyTrafficData[];
}

const formatHour = (iso: string) => {
    const date = new Date(iso);
    return `${date.getHours().toString().padStart(2, "0")}:00`;
};

const getRange = (values: number[]) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.max(10, Math.round((max - min) * 0.15));
    return {
        min: min - padding,
        max: max + padding,
    };
};

const TrafficChart = ({ hours }: TrafficChartProps) => {
    const values = hours.map((entry) => entry.carsPassed);
    const { min, max } = getRange(values);
    const width = 520;
    const height = 220;
    const padding = 40;

    const scaleX = (index: number) => {
        if (hours.length <= 1) {
            return padding;
        }
        const usableWidth = width - padding * 2;
        return padding + (usableWidth / (hours.length - 1)) * index;
    };

    const scaleY = (value: number) => {
        const usableHeight = height - padding * 2;
        if (max === min) {
            return height - padding - usableHeight / 2;
        }
        return height - padding - ((value - min) / (max - min)) * usableHeight;
    };

    const path = hours
        .map((entry, index) => `${index === 0 ? "M" : "L"} ${scaleX(index)} ${scaleY(entry.carsPassed)}`)
        .join(" ");

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 shadow-lg">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full">
                <defs>
                    <linearGradient id="traffic-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="50%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>

                <rect x="0" y="0" width={width} height={height} rx="16" fill="none" />

                <g className="text-[10px] fill-slate-400">
                    {hours.map((entry, index) => (
                        <text
                            key={entry.hourStart}
                            x={scaleX(index)}
                            y={height - 12}
                            textAnchor="middle"
                        >
                            {formatHour(entry.hourStart)}
                        </text>
                    ))}
                </g>

                <g className="text-[10px] fill-slate-400">
                    <text x={8} y={padding}>
                        {Math.round(max)}
                    </text>
                    <text x={8} y={height - padding}>
                        {Math.round(min)}
                    </text>
                </g>

                <path
                    d={path}
                    fill="none"
                    stroke="url(#traffic-line)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {hours.map((entry, index) => (
                    <circle
                        key={entry.hourStart}
                        cx={scaleX(index)}
                        cy={scaleY(entry.carsPassed)}
                        r={4}
                        fill="#38bdf8"
                        stroke="#0f172a"
                        strokeWidth="2"
                    />
                ))}
            </svg>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Last {hours.length} hours</span>
                <span>Cars passed per hour</span>
            </div>
        </div>
    );
};

export default TrafficChart;
