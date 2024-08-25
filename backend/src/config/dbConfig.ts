import mongoose from 'mongoose';

/**
 * @description Connects to the MongoDB database using Mongoose.
 * @async
 * @function
 * @throws {Error} - Throws an error if the connection to the database fails.
 * 
 * This function attempts to establish a connection to the MongoDB database using
 * the URI specified in the environment variable `MONGO_URI`. If the environment
 * variable is not set, it defaults to a local MongoDB instance.
 * On successful connection, a message 'MongoDB connected' is logged to the console.
 * On failure, an error message is logged and the process exits with status code 1.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;
