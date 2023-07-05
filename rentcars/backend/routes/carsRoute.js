const express=require("express")
const router=express.Router()
const car=require("../models/carModel")

router.get("/getAllCars",async(req,res)=>{
    try {
        const cars= await car.find()
        res.send(cars)
    } catch (error) {
        return res.status(400).json(error)
    }
})
module.exports=router