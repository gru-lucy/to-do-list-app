import mongoose from 'mongoose';
import connectDB from '../dbConfig';

jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

describe('connectDB', () => {
    it('should connect to MongoDB successfully', async () => {
        const mockConnect = mongoose.connect as jest.Mock;
        mockConnect.mockResolvedValueOnce('MongoDB connected');

        await connectDB();

        expect(mockConnect).toHaveBeenCalledWith(process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp');
        expect(mockConnect).toHaveBeenCalledTimes(1);
    });

    it('should log an error and exit the process if the connection fails', async () => {
        const mockConnect = mongoose.connect as jest.Mock;
        const mockExit = jest.spyOn(process, 'exit').mockImplementation((code?: number | string | null) => {
            throw new Error(`Process exited with code: ${code}`);
        });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

        const errorMessage = 'Connection failed';
        mockConnect.mockRejectedValueOnce(new Error(errorMessage));

        await expect(connectDB()).rejects.toThrow(`Process exited with code: 1`);

        expect(mockConsoleError).toHaveBeenCalledWith('Error connecting to MongoDB:', expect.any(Error));
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockConsoleError.mockRestore();
    });
});
