import mongoose from 'mongoose'
const connection ={}
async function connectDb(){
    //use new database connect
    if(connection.isConnected){
        // use existing db
        console.log('using existing connection')
        return
    }
    const db= await mongoose.connect(process.env.MONGO_SRV,{
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true

    })
    console.log('DB Connected')
    connection.isConnected = db.connections[0].readyState;
}export default connectDb;