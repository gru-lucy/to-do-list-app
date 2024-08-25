import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

import connectDB from './config/dbConfig';
import taskRoutes from './routes/taskRoutes';

// Load environment variables from a .env file into process.env
dotenv.config();

// Initialize Express application
const app = express();

// Connect to MongoDB
connectDB();

// Load Swagger YAML file
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse JSON bodies
app.use(express.json());

// Allow cors
app.use(cors());

// Mount the task routes at /api
app.use('/api', taskRoutes);

// Define the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server and log the port number
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
