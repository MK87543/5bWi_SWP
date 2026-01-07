import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

interface Phone {
    id: number;
    brand: string;
    model: string;
    price: number;
}

let phones: Phone[] = [
    { id: 1, brand: "Apple", model: "iPhone 15", price: 999 },
    { id: 2, brand: "Samsung", model: "Galaxy S24", price: 899 },
    { id: 3, brand: "Google", model: "Pixel 8", price: 699 },
];

let nextId = 4;

app.get("/", (req: Request, res: Response) => {
    let userId = req.cookies.userId;
    let vCount = req.cookies.vCount ? parseInt(req.cookies.vCount) : 1;
    vCount++;
    let cookies = req.cookies;
    console.log("Cookies: ", req.cookies);

    if (!userId) {
        userId = Math.random().toString(36).substring(2, 15);
        res.cookie("userId", userId, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    }

    res.cookie("vCount", vCount, { maxAge: 365 * 24 * 60 * 60 * 1000 });

    res.send(`
        <h1>Hello, User ${userId}!</h1>
        <p>Du warst hier ${vCount} mal.</p>
        <hr>
        <h3>API Routes:</h3>
        <a href="/phones">GET /phones</a><br>
        <a href="/phones/1">GET /phones/1</a><br>
        <p>/ delete== /phones: id <p> <br>
        <p>/ put == /phones: id <p> <br>
        <hr>
        <p>Cookies: ${JSON.stringify(cookies || {}).replace(/,/g, "<br>")}</p>
    `);
});

// GET all phones
app.get("/phones", (req: Request, res: Response) => {
    res.json(phones);
});

// POST add a new phone
app.post("/phones", (req: Request, res: Response) => {
    const newPhone: Phone = {
        id: nextId++,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
    };
    phones.push(newPhone);
    res.status(201).json(newPhone);
});

// PUT update a phone
app.put("/phones/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = phones.findIndex((p) => p.id === id);

    if (index === -1) {
        res.status(404).json({ error: "Phone not found" });
        return;
    }

    phones[index] = {
        id: id,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
    };

    res.json(phones[index]);
});

// DELETE a phone
app.delete("/phones/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = phones.findIndex((p) => p.id === id);

    if (index === -1) {
        res.status(404).json({ error: "Phone not found" });
        return;
    }

    const deletedPhone = phones.splice(index, 1)[0];
    res.json(deletedPhone);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
