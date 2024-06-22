import mongoose from "mongoose";

const config = {
    isConnected: false,
};

export async function connectDB() {

    if (config.isConnected) {
        console.log("MongoDB already connected");
        return;
    }

    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL, {
            dbName: "counterfeit"
        });
        console.log("MongoDB connected successfully");
        config.isConnected = connection.readyState === 1;

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        process.exit();

    }

}

export default connectDB;