import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv'
dotenv.config()
const secret = process.env.TOKEN_SECRET
export const signin= async (req,res)=>{
    const {email,password} = req.body;
    console.log(secret);
    try {
        const existUser = await User.findOne({email});

        if(!existUser) return res.status(404).json({message:'User does not exist.'})
        const isPasswordCorrect = await bcrypt.compare(password,existUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:'invalid credentials.'});
        const token = Jwt.sign({email:existUser.email,id:existUser._id},secret);
        res.status(200).json({result:existUser,token})
    } catch (error) {
        res.status(400).json(error);
    }
}
export const signup= async (req,res)=>{
    const {email,password,firstName,lastName,confirmPassword} = req.body;
    try {
        const existUser = await User.findOne({email});
        if(existUser) return res.status(400).json({message:'User Already exist.'});
        if(password !== confirmPassword) return res.status(400).json({message:'Password dont match.'});
        const hashPassword = await bcrypt.hash(password,12);
        const result = await User.create({email:email, password:hashPassword, name:`${firstName} ${lastName}`});
        const token = Jwt.sign({email:result.email,id:result._id},secret);
        console.log(token);
        res.status(200).json({result:result,token})
    } catch (error) {
        res.status(400).json(error);

    }

};