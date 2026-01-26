import type { TrafficLightStatistics } from "../types/traffic";
import TrafficChart from "./TrafficChart";

interface TrafficLightModalProps {
    light: TrafficLightStatistics | null;
    onClose: () => void;
}

const TrafficLightModal = ({ light, onClose }: TrafficLightModalProps) => {
    if (!light) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-6">
            <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Traffic light</p>
                        <h2 className="text-2xl font-semibold text-white">{light.name}</h2>
                        <p className="text-sm text-slate-400">{light.location}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                    >
                        Close
                    </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
                    <TrafficChart hours={light.hours} />

                    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
                        <p className="text-xs uppercase text-slate-400">Summary</p>
                        <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <span>Total cars</span>
                                <span className="font-semibold text-white">{light.totalCars}</span>
                            </div>
                            {light.hours.map((hour) => (
                                <div key={hour.hourStart} className="flex items-center justify-between text-xs">
                                    <span>{new Date(hour.hourStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                                    <span className="text-slate-200">{hour.carsPassed}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrafficLightModal;
