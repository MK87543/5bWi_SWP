export interface HourlyTrafficData {
    hourStart: string;
    carsPassed: number;
}

export interface TrafficLightStatistics {
    id: string;
    name: string;
    location: string;
    hours: HourlyTrafficData[];
    totalCars: number;
}

export interface TrafficStatsResponse {
    generatedAt: string;
    hours: number;
    trafficLights: TrafficLightStatistics[];
}
