import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB database connected successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default dbConnect;