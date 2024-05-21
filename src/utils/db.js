import mongoose from "mongoose";
const connect = async () => {
    if(mongoose.connections[0].readState) return;
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Mongo Connection succesfully established.");
    } catch(error){
        throw new Error ("Error connecting to Mongoose");
    }

};
export default connect;