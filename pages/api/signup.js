import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
import Cart from '../../models/Cart'
connectDb()

export default async (req,res)=>{
    const {name,email,password} =  req.body
    try{
        //validate name, email.password
        if(!isLength(name,{min:3,max:10})){
            return res.status(422).send('Name must be 3-10 characters long')
        }
        else if(!isLength(password,{min:6})){
            return res.status(422).send('Password must be 6 characters long')
        }else if(!isEmail){
            return res.status(422).send('Email must Valid')
        }
        //if user is already there in database
        //if not hash their password 
        //create user
        
        const user =await User.findOne({email})
        if(user){
            return res.status(422).send(`user already exits with ${email}`)
        }
        //if not hash their password 
        const hash = await bcrypt.hash(password,10)
        const newUser = await new User({
            name,email,
            password:hash
        }).save()
        // console.log(newUser._id)
        await new Cart({user:newUser._id}).save();
        //send back token
        const token = jwt.sign({userId: newUser._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        res.status(201).json(token)
    }catch(error){
        console.error(error)
        res.status(500).send('Error signup user.Please try agin later')
    }

}