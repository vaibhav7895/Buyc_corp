const express=require('express');
const app=express();
const {connection}=require('./db');
const {userRouter}=require('./Routes/auth.routes');
const {oemRouter}=require('./Routes/oem.routes');
app.use(express.json());
app.use("/user",userRouter);
app.use("/oem",oemRouter);

app.listen(8080,async()=>{
    try{
        await connection
        console.log("Database connected")
        console.log("connected to port 8080")

    }catch(err){
        console.log(err)
    }
})