const jwt =require('jsonwebtoken')

module.exports = async (req,res,next)=>{
  try {
    const fulltoken=await req.headers.authorization
    const token=fulltoken?.split(' ')[1]
    if(!token) {
        res.status(403).send("Acess Denied")
    }
    let user=jwt.verify(token,'securtiy_key')
    req.user=user
    next()
  } catch (error) {
    res.status(400).send("Invalid token")
  }
}