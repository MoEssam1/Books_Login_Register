const usermodle=require('../Moudels/user.schema.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.register=async (req,res)=>{
  try {
    const newuser=new usermodle(req.body)
    let hashedpassword=await bcrypt.hash(req.body.password,10)
    newuser.password=hashedpassword;
    newuser.token=await jwt.sign({name:newuser.name,email:newuser.email,id:newuser._id,role:newuser.role},'securtiy_key')
    newuser.save()
    res.json({message:"account regrister successfuly",status:200})
  } catch (error) {
    console.log(error)
    res.status(400).send({message:error})
  }
}
exports.login=async (req,res)=>{
    try {
      let user=await usermodle.findOne({email:req.body.email})
      if(!user || !await user.comparepassword(req.body.password)){
       return res.status(401).json({message:"invaild email or password"})
      }
      return res.status(200).json({message:"accout login successfuly",data:user})
    } catch (error) {
      console.log(error)
      return res.status(401).send({message:error})
    }
  }