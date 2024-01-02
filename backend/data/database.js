import mongoose from "mongoose";

export const connectDB = () => (
    mongoose.connect(
        process.env.DB_URI,{
            dbName:"backendapi",
        }
    ).then((c)=>console.log(`Database connected with ${c.connection.host}`))
    .catch((error)=>console.log(error))
);

