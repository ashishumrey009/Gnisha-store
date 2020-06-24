import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
connectDb()

export default async (req,res)=>{
   
    const {email,password} =  req.body
    try{
        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(404).send('No user exists with this email')
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(passwordMatch){
            const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{
                expiresIn:'7d'
            })
            res.status(200).json(token)
        }else{
            res.status(401).send('Password do not match')
        }
        
    }catch(error){
        console.error(error)
        res.status(500).send('Error logging in user')
    }

}