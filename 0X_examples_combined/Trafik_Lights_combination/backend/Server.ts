import express, { Request, Response } from "express";

interface HourlyTrafficData {
    hourStart: string;
    carsPassed: number;
}

interface TrafficLightStatistics {
    id: string;
    name: string;
    location: string;
    hours: HourlyTrafficData[];
    totalCars: number;
}

const app = express();
app.use(express.json());
app.use((_req: Request, res: Response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (_req.method === "OPTIONS") {
        res.sendStatus(204);
        return;
    }

    next();
});

const HOUR_COUNT = 4;

const buildHourlySeries = (
    base: number,
    multiplier: number,
): HourlyTrafficData[] => {
    const now = new Date();
    const series: HourlyTrafficData[] = [];

    for (let i = HOUR_COUNT - 1; i >= 0; i -= 1) {
        const hour = new Date(now);
        hour.setMinutes(0, 0, 0);
        hour.setHours(hour.getHours() - i);
        series.push({
            hourStart: hour.toISOString(),
            carsPassed: base + multiplier * i + ((i + base) % 7) * 3,
        });
    }

    return series;
};

const buildStats = (): TrafficLightStatistics[] => {
    const lights = [
        {
            id: "tl-1",
            name: "North Cross",
            location: "Main St & 1st Ave",
            base: 120,
            multiplier: 18,
        },
        {
            id: "tl-2",
            name: "East Junction",
            location: "2nd Ave & Pine St",
            base: 95,
            multiplier: 14,
        },
        {
            id: "tl-3",
            name: "South Gate",
            location: "Market Rd & 4th Ave",
            base: 110,
            multiplier: 16,
        },
        {
            id: "tl-4",
            name: "West Bridge",
            location: "River Rd & Oak St",
            base: 80,
            multiplier: 12,
        },
    ];

    return lights.map((light) => {
        const hours = buildHourlySeries(light.base, light.multiplier);
        const totalCars = hours.reduce(
            (sum, entry) => sum + entry.carsPassed,
            0,
        );

        return {
            id: light.id,
            name: light.name,
            location: light.location,
            hours,
            totalCars,
        };
    });
};

const statistics = buildStats();

app.get("/statistiks", (_req: Request, res: Response) => {
    res.json({
        generatedAt: new Date().toISOString(),
        hours: HOUR_COUNT,
        trafficLights: statistics,
    });
});

app.get("/statistics/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const match = statistics.find((light) => light.id === id);

    if (!match) {
        res.status(404).json({ message: "Traffic light not found." });
        return;
    }

    res.json({
        generatedAt: new Date().toISOString(),
        trafficLight: match,
    });
});

const PORT = Number(process.env.PORT ?? 3001);

app.listen(PORT, () => {
    console.log(`Traffic lights API running on port ${PORT}`);
});
