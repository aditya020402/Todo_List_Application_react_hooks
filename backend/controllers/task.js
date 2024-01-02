import ErrorHandler from "../middlewares/error.js";

import {Task} from "../models/task.js";


export const newTask = async(req,res,next)=>{
    try{
        const {title,description} = req.body;
        // this user is present here because the authentication middleware has put req.user after decoding the jwt token that is present
        await Task.create({title:title,description:description,user:req.user});
        res.status(200).json({
            success:true,
            message:"Task added successfully",
        })
    }
    catch(error){
        next(error);
    }
}


// here we are finding the task using the userid 
// here all the task where the userid is equal to the search parameter is returned 
// if we only want one we use the findOne function rather than the find function 
export const getMyTask = async(req,res,next) =>{
    try{
        const userid = req.user._id;
        const tasks = await Task.find({user:userid});
        res.status(200).json({
            success:true,
            tasks,
        })
    }
    catch(error){
        next(error);
    }
}
// we use findById when we are finding by the _id of the object 
// like here we are finding using the _id of the task therefore we use this function 
// and above we don't use the same function 
export const updateTask = async(req,res,next) => {
    try{
        const task_to_find = req.params.id;
        const task = await Task.findById(task_to_find);
        if(!task) return next(new ErrorHandler("Task not Found",404));
        task.isCompleted = !task.isCompleted;
        await task.save({validateBeforeSave:false});
        res.status(200).json({
            success:true,
            message:"Task is updated",
        })
    }
    catch(error){
        next(error);
    }
}

export const deleteTask = async(req,res,next) => {
    try{
        const task_to_del = req.params.id;
        const task = await Task.findById(task_to_del);
        await task.deleteOne();
        res.status(200).json({
            message:"Task Deleted",
            success:true,
        })
    }
    catch(error){
        next(error);
    }
}