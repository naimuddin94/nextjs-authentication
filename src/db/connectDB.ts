import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!, { dbName: "NEXT-AUTH" });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB!");
    });

    connection.on("error", (error) => {
      console.error("MongoDB connection error: ", error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong connecting to MongoDB: ", error);
  }
}
