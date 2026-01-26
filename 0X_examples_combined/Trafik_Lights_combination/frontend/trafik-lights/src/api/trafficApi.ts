import type { TrafficStatsResponse } from "../types/traffic";

const API_BASE = import.meta.env.VITE_TRAFFIC_API_BASE ??
    "http://localhost:3001";

export const fetchTrafficStats = async (): Promise<TrafficStatsResponse> => {
    const response = await fetch(`${API_BASE}/statistiks`);

    if (!response.ok) {
        throw new Error("Failed to load traffic statistics.");
    }

    return response.json();
};
