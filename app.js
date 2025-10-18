import "dotenv/config";
import express from "express";
import dbConnect from "./db.js";
import router from "./routes/api.router.js";
import cors from "cors";
import errorHandler from "./error_handler.js";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api", router);
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Api server is running at http://localhost:${port}`);
});