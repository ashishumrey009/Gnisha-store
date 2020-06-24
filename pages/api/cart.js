import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb()
const  {ObjectId}   =mongoose.Types
export default async(req,res)=>{
    console.log('header is',res.headers)
    switch(req.method){
    case "GET":
        await handleGetRequest(req,res);
        break;
    case "PUT":
        await handlePutRequest(req,res)
        break;
    case "DELETE":
        await handleDeleteRequest(req,res)
        break;
    default:
        res.status(405).send(`Method ${req.method} not allowed`)
    }
}
async function handleGetRequest(req,res){
    console.log('in get cart api',req.headers)
    if(!("authorization" in req.headers)){
        return res.status(401).send('No authorization token')
    }
    try{
        const {userId} = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        const cart =await Cart.findOne({user :userId}).populate({
            path:"products.product",
            model:"Product"
        })
        
        res.status(200).json(cart.products)
    }catch(error){
        console.error(error)
        res.status(403).send('Please Login again')
    }
 }
 async function  handlePutRequest(req,res){
    console.log('in put cart api',req.headers)
    const{quantity ,productId} = req.body
    if(!("authorization" in req.headers)){
        return res.status(401).send('No authorization token')
    }
    try{
        const {userId} = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        // get user card based on id
        // check if product already exits
        // yes then add
        const cart =await Cart.findOne({user :userId})
        const productExits= cart.products.some(doc =>ObjectId(productId).equals(doc.product))
        if(productExits){
           await  Cart.findOneAndUpdate({_id:cart._id,"products.product":productId},
            {$inc :{"products.$.quantity":quantity }})
        }else{
            const newProduct = {quantity ,product:productId}
            await Cart.findOneAndUpdate({_id:cart._id},
            {$addToSet:{products:newProduct}}
            )
        }
        res.status(200).send('Cart Updated')
    }catch(error){
        console.error(error)
        res.status(403).send('Please Login again')
    }
 }
 async function handleDeleteRequest(req,res){
     const {pid} = req.query
     console.log('in del',pid)
    if(!("authorization" in req.headers)){
        return res.status(401).send('No authorization token')
    }try{
        const {userId} = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        const cart = await Cart.findOneAndUpdate(
            {user:userId },
            {$pull:{products:{product:pid}}},
            {new:true}
            ).populate({
                path:"products.product",
                model:"Product"
            })
            // /console.log(cart.products)
            res.status(200).json(cart.products)
           
    }catch(error){
        console.error(error)
        res.status(403).send('Please Login again')
    }
 }