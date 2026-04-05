import express from 'express';
import cors from 'cors';
import { apiRoutes } from './routes/api.routes';
import { config } from './config/env';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Routers
app.use('/api', apiRoutes);

// Server Bootstrapping
const server = app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}/api`);
});

server.timeout = 300000; // 5 minutes - scraping + AI analysis takes time
server.on('error', console.error);
