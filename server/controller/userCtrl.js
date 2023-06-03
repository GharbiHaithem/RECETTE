const User = require('../model/user.model')
const {generateToken} =require('../config/jwtToken')
const userCtrl = {
    createUser: async (req, res) => {
        const { googleId ,email,fullname,pic,secret} = req.body
       
        const findUser = await User.findOne({ googleId:req.body.googleId })
           console.log(req.body.googleId)
           console.log(findUser)
            console.log({searchUser:findUser})
            if (findUser !== null) {
              console.log({request:req.user})
                 const updateUser = {
                    googleId:findUser.googleId,
                    fullname: findUser.fullname,
                 email: findUser.email,
                     pic: findUser.pic,
                    secret: findUser.secret,
                    token:generateToken(findUser.googleId)
             }
             
             const updatedUser =   await User.findOneAndUpdate({
                    googleId: findUser.googleId
                },
                    { $set: updateUser },
                    { new: true }

                )
                console.log(updatedUser)
                res.json(updatedUser)
               
            } else {
                console.log(req.user)
                const newUser = new User({
                    googleId:googleId,
                    fullname:fullname ,
                    email: email,
                    pic: pic,
                    secret: secret,
                    token:generateToken(googleId)
                })
                await newUser.save()
             
                 res.json({
                    _id:newUser._id,
                    googleId:newUser.googleId,
                    fullname:newUser.fullname,
                    email:newUser.email,
                    pic:newUser.pic,
                    secret:newUser.secret,
                    token:newUser.token
                 })
         
            }

            },
        
       

       
    
    login: async (req, res) => {
        const { email, password } = req.body

        const findUser = await User.findOne({ email })
        if (findUser && (await findUser.IsPasswordMatched(password))) {
            const refreshToken = generateRefreshToken(findUser?._id)
            const updateUser = await User.findByIdAndUpdate(findUser._id, {
                refreshToken: refreshToken
            }, {
                new: true,
                upsert: true
            })
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000
            })
            res.json({
                _id: findUser._id,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                email: findUser.email,
                mobile: findUser.mobile,
                token: generateToken(findUser._id)
            })
        } else {
            res.status(500).json({ message: 'invalid credentials' })
        }
    },

}
module.exports = userCtrl;