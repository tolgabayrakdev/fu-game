import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import 'dotenv/config';

const app = express();
const server = http.createServer(app);

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

server.listen(process.env.SERVER_PORT || 1234, () => {
    console.log("Server running on port 1234");
});