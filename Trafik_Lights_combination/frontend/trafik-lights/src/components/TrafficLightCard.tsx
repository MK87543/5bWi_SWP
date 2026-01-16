import type { TrafficLightStatistics } from "../types/traffic";

interface TrafficLightCardProps {
    light: TrafficLightStatistics;
    onOpen: (light: TrafficLightStatistics) => void;
}

const TrafficLightCard = ({ light, onOpen }: TrafficLightCardProps) => {
    const latest = light.hours[light.hours.length - 1];
    const cars = latest?.carsPassed ?? 0;
    const status = cars >= 160 ? "red" : cars >= 120 ? "yellow" : "green";

    return (
        <button
            onClick={() => onOpen(light)}
            className="flex w-full items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-left shadow-xl transition hover:border-white/20 hover:bg-slate-900/90"
        >
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-slate-950/60 px-4 py-3">
                <span className={`h-4 w-4 rounded-full ${status === "red" ? "bg-red-500" : "bg-red-500/30"}`} />
                <span className={`h-4 w-4 rounded-full ${status === "yellow" ? "bg-yellow-400" : "bg-yellow-400/30"}`} />
                <span className={`h-4 w-4 rounded-full ${status === "green" ? "bg-emerald-400" : "bg-emerald-400/30"}`} />
            </div>

            <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{light.id}</p>
                <h3 className="text-lg font-semibold text-white">{light.name}</h3>
                <p className="text-sm text-slate-400">{light.location}</p>
                <p className="mt-3 text-xs text-slate-400">Last hour</p>
                <p className="text-sm font-semibold text-white">{cars} cars</p>
            </div>
        </button>
    );
};

export default TrafficLightCard;
