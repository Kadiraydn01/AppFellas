import mongoose from "mongoose";

// This is a function to connect to the MongoDB database
const connectToMongoDb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectToMongoDb;
