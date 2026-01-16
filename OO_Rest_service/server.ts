import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { IPhoneDAO } from "./dao/IPhoneDAO.ts";
import { PhoneDAO } from "./dao/PhoneDAO.ts";

const app = express();
const port = 3000;
const JWT_SECRET = "your-secret-key-change-in-production"; // In production, use environment variable

app.use(express.json());
app.use(cookieParser());

const phoneDAO: IPhoneDAO = new PhoneDAO();

// JWT Middleware
interface AuthRequest extends Request {
    user?: { username: string };
}

function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({ error: "Access token required" });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ error: "Invalid or expired token" });
            return;
        }
        req.user = user as { username: string };
        next();
    });
}

// Helper function to convert object to XML
function toXML(obj: any, rootElement: string = "root"): string {
    if (Array.isArray(obj)) {
        const items = obj.map((item) => toXML(item, rootElement.slice(0, -1)))
            .join("");
        return `<?xml version="1.0" encoding="UTF-8"?><${rootElement}>${items}</${rootElement}>`;
    }

    let xml = `<${rootElement}>`;
    for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined) {
            xml += `<${key}>${value}</${key}>`;
        }
    }
    xml += `</${rootElement}>`;
    return xml;
}

// Helper function to send response based on Accept header
function sendResponse(
    req: Request,
    res: Response,
    data: any,
    rootElement: string = "data",
) {
    const acceptHeader = req.headers.accept || "";

    if (
        acceptHeader.includes("application/xml") ||
        acceptHeader.includes("text/xml")
    ) {
        res.type("application/xml");
        res.send(toXML(data, rootElement));
    } else {
        res.json(data);
    }
}

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
        <h4>Authentication:</h4>
        <p>POST /login - Get JWT token (username: admin, password: password)</p>
        <h4>Get Phones:</h4>
        <a href="/phones" onclick="fetch('/phones', {headers: {'Accept': 'application/json'}}).then(r => r.json()).then(d => alert(JSON.stringify(d, null, 2))); return false;">GET /phones (JSON)</a><br>
        <a href="/phones" onclick="fetch('/phones', {headers: {'Accept': 'application/xml'}}).then(r => r.text()).then(d => alert(d)); return false;">GET /phones (XML)</a><br>
        <br>
        <a href="/phones/1">GET /phones/1</a><br>
        <p>POST /phones - Add new phone</p>
        <p>PUT /phones/:id - Update phone</p>
        <p>DELETE /phones/:id - Delete phone</p>
        <hr>
        <p>Cookies: ${JSON.stringify(cookies || {}).replace(/,/g, "<br>")}</p>
    `);
});

// Login route - generates JWT token
app.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Simple authentication (in production, validate against database)
    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token,
            message: "Login successful",
            expiresIn: "1 hour",
        });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

// GET all phones (protected)
app.get("/phones", authenticateToken, (req: AuthRequest, res: Response) => {
    sendResponse(req, res, phoneDAO.getAll(), "phones");
});

// POST add a new phone (protected)
app.post("/phones", authenticateToken, (req: AuthRequest, res: Response) => {
    const newPhone = phoneDAO.create(
        req.body.brand,
        req.body.model,
        req.body.price,
    );
    res.status(201);
    sendResponse(req, res, newPhone, "phone");
});

// PUT update a phone (protected)
app.put("/phones/:id", authenticateToken, (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedPhone = phoneDAO.update(
        id,
        req.body.brand,
        req.body.model,
        req.body.price,
    );

    if (!updatedPhone) {
        res.status(404);
        sendResponse(req, res, { error: "Phone not found" }, "error");
        return;
    }

    sendResponse(req, res, updatedPhone, "phone");
});

// DELETE a phone (protected)
app.delete(
    "/phones/:id",
    authenticateToken,
    (req: AuthRequest, res: Response) => {
        const id = parseInt(req.params.id);
        const deletedPhone = phoneDAO.delete(id);

        if (!deletedPhone) {
            res.status(404);
            sendResponse(req, res, { error: "Phone not found" }, "error");
            return;
        }

        sendResponse(req, res, deletedPhone, "phone");
    },
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
