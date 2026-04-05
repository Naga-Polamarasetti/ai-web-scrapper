import express from 'express';
import * as path from 'path';
import { apiRoutes } from './routes/api.routes';
import { config } from './config/env';

const app = express();

// Middlewares
app.use(express.json());

// Routers
app.use('/api', apiRoutes);

// Server Bootstrapping
const server = app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}/api`);
});

server.on('error', console.error);
