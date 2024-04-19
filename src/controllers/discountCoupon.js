const DiscountCoupon = require("../models/DiscountCoupon")

const updateDiscountCoupon = async (req, res)=>{
    try {
        const {name, available} = req.body

        if(name===undefined || available===undefined){
            res.status(500).json({message: "define name or available"})
        }else{
            const updateCoupon = await DiscountCoupon.findOneAndUpdate({name: name}, {available: available}, {new : true})

        if(name && available){
            if(!updateCoupon){
                res.status(404).json({message: "coupon not exist"})
            }else{
                res.status(200).json({message: "coupon updated correctly", updateCoupon})
            }
        }else{
            res.status(500).json({message: "enter coupon name and available"})
        }
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getDiscountCoupon = async (req, res)=>{
    try {
        const name = req.params.name
        const searchCoupon = await DiscountCoupon.findOne({name: name})
    if (!searchCoupon) {
        res.status(200).json({message: "coupon not exist "})
    } else {
        res.status(200).json(searchCoupon)
    }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createDiscountCoupon = async (req, res)=>{
    try {
        const {name, percentage, available} = req.body;

        if(!name || !percentage || !available){
            res.status(500).json({message:"enter fields correctly"})
        }else{
            if(percentage>100 || isNaN(percentage) || percentage===true || percentage===false){
                res.status(500).json({message: "Percentage must be a number and cannot be greater than 100"})
            }else{
                const searchCoupon = await DiscountCoupon.find({name:name})
    
                if(searchCoupon.length===0){
                    const coupon = new DiscountCoupon({name, percentage, available})
                    await coupon.save()
                    res.status(201).json({message: "coupon created successfully"})
                }else{
                    res.status(201).json({message: "coupon already exists"})
                } 
            }
        } 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createDiscountCoupon,
    getDiscountCoupon,
    updateDiscountCoupon,
}