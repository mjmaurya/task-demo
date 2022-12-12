
import Dish from "../model/dish.js"
export const CreateDish=async(req,res,next)=>{
    try {
        const dish=new Dish(req.body)
        await dish.save()
        res.status(204).json()
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.maessge || "Somthing Went Wrong!"
        })
    }
}
export const UpdateDish=async(req,res,next)=>{
    try {
        const {id}=req.params
        await Dish.findByIdAndUpdate(id,{$set:req.body})
        res.status(200).json()
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.maessge || "Somthing Went Wrong!"
        })
    }
}

export const GetDishs=async(req,res,next)=>{
    const query={}
    const page=req.query.page || 1
    if (req.query.name) {
        query.name= { $regex: '.*' + req.query["name"].toLowerCase() + '.*','$options' : 'i' }
    }
    console.log(query);
    try {
        const dishes=await Dish.find(query).skip((page-1)*6).limit(6);
        const total=await Dish.countDocuments(query);
        res.status(200).send({success:true,...{metadata:{total:total,page:page,limit:6},data:dishes}})
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.maessge || "Somthing Went Wrong!"
        })
    }
}
export const GetDish=async(req,res,next)=>{
    const {id}=req.params
    try {
        const dish= await Dish.find({_id:id})
        res.status(200).send({success:true,...{data:dish[0]}})
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.maessge || "Somthing Went Wrong!"
        })
    }
}