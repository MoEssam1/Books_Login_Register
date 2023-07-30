const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Schema=mongoose.Schema;

const userschema=new Schema({

    name:String,
    phone:{type:String,unique:true},
    password:String,
    email:{type:String,unique:true},
    token:String,
    role:{type:String,default:"User"}
})

userschema.methods.comparepassword=async function (pass){
   return await bcrypt.compare(pass,this.password)
}

module.exports=mongoose.model('Users',userschema)
