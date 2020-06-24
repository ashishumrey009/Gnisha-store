import mongoose from 'mongoose'
const connection ={}
async function connectDb(){
    //use new database connect
    if(connection.isConnected){
        // use existing db
        
        return
    }
    const db= await mongoose.connect(process.env.MONGO_SRV,{
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true

    })

    connection.isConnected = db.connections[0].readyState;
}export default connectDb;