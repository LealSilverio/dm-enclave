import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connect = async () => {
  await mongoose.connect(process.env.MONGO_ATLAS_URI);
};

export default connect;
