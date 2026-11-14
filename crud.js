const mongoose = require('mongoose');
const { connectDB } = require('./db');
const express = require('express');
const empSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        min:3400,
        required:true
    },
    dept:{
        type:String,
        enum:["IT","CS","sales"],
        required:true
    }

} ,{timestamps:true})

const empModel = mongoose.model("emp",empSchema)

connectDB();
const app = express();
app.use(express.json())
app.get("/",async(req,resp)=>{
    try{
        const data= await empModel.find()
        resp.json(data)

    }catch(error){
        console.log(error);
        
    }
})

app.post("/adddata",async(req,resp)=>{
    try{
        const{name,salary,dept}=req.body
        const result = await empModel.create({name,salary,dept})
        resp.json(result)
    
    }catch(error){
        console.log(error);
        
    }
})
app.patch("/update/:id",async(req,resp)=>{
    try{
        const result= await empModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        resp.json(result)
    } catch(error){
        console.log(error);
        
    }
})
app.delete("/delete/:id",async(req,resp)=>{
    try{
        const result= await empModel.findByIdAndDelete(req.params.id)
        resp.json(result)
    } catch(error){
        console.log(error);
        
    }
})

app.listen(4000,()=>{
    console.log("running");
    
})