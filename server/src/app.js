import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import 'dotenv/config';

import { createSocketServer } from './socket.js';

//routes import
import authRoutes from './routes/auth-routes.js';

const envFile =
    process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
dotenv.config({ path: envFile });

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

createSocketServer(server);

server.listen(process.env.SERVER_PORT || 1234, () => {
    console.log('Server running on port 1234');
});
