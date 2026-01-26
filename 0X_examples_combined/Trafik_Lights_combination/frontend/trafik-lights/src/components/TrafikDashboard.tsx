import { useEffect, useState } from "react";
import { fetchTrafficStats } from "../api/trafficApi";
import type { TrafficLightStatistics, TrafficStatsResponse } from "../types/traffic";
import TrafficLightCard from "./TrafficLightCard";
import TrafficLightModal from "./TrafficLightModal";

const TrafikDashboard = () => {
    const [data, setData] = useState<TrafficStatsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<TrafficLightStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const response = await fetchTrafficStats();
                setData(response);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Traffic lights overview</p>
                        <h1 className="text-3xl font-semibold">Smart Traffic Control</h1>
                        <p className="text-sm text-slate-400">Live stats from the city intersection network.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
                        <p>Updated</p>
                        <p className="text-sm font-semibold text-white">
                            {data ? new Date(data.generatedAt).toLocaleTimeString() : "--:--"}
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300">
                        Loading traffic data...
                    </div>
                )}

                {error && !loading && (
                    <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
                        {error}
                    </div>
                )}

                {!loading && !error && data && (
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {data.trafficLights.map((light) => (
                            <TrafficLightCard key={light.id} light={light} onOpen={setSelected} />
                        ))}
                    </div>
                )}
            </div>

            <TrafficLightModal light={selected} onClose={() => setSelected(null)} />
        </div>
    );
};

export default TrafikDashboard;
