// connect to mongodb with mongoose
import mongoose from "mongoose";

export async function connectToDB() {
    // check if MONGODB_URI is defined
    if (!process.env.MONGO_URI) {
        throw new Error("MONGODB_URI is not defined");
    }

    // check if a connection already exists
    if (mongoose.connection.readyState === 1) {
        return;
    }

    let connectionString = process.env.NODE_ENV === "production" ? process.env.MONGO_URI : 'mongodb://localhost:27017/moving-out';
    mongoose
        .connect(connectionString)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.log(error));
};
