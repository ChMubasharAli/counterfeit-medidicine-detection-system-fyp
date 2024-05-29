import mongoose from "mongoose";



const connection = {}

async function connectDB() {

    // check the database alredy connected or not 
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            dbName: "counterfeit"
        });

        connection.isConnected = db.connections[0].readyState

        // NOTE: must console.log "db" and "db.connections" you will understand the flow 

        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection error :: ", error);
        process.exit(1);
    }
}

export default connectDB;
