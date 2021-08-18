const {logger} = require('../utils/logger')
const userModel = require('../models/user')
const {signupValidate} = require('../validation/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class User {
    signup = async (req, res, next) => {
        try {
            logger.info('Start signup user - - -');
            const {error, value} = signupValidate(req.body);
            if (error) {
                logger.error('ValidationError', error.message);
                return res.status(400).json(error)
            }
            const oldUser = await userModel.findOne({ email:value.email });

            if (oldUser) {
                logger.error('User Already Exist. Please Login')
                return res.status(409).json({
                    message:"User Already Exist. Please Login"
                });
            }
            const user = new userModel({
                ...value
            })
            await user.save();
            return res.status(201).json({
                user
            })
        } catch (e) {
            logger.error(`Signup Error: ${e.message}`)
            next(e)
        }
    }
    login = async (req,res,next)=>{
        try{
            const { email, password } = req.body;

            // Validate if user exist in our database
            const user = await userModel.findOne({ email });
            if(!user) {
                return res.status(404).json({
                    message:'User not found'
                })
            }
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                // user
                res.status(200).json({
                    user,
                    access_token:token
                });
            }
            res.status(400).send("Invalid Credentials");
        }
        catch (e) {
            next(e)
            logger.log(e.message);
        }

    }
    getOne = async (req,res,next)=>{
        try{
            const { id } = req.params;
            const user = await userModel.findOne({_id:id});
            if(!user) {
                return res.status(404).json({
                    message:'User not found'
                })
            }
            return res.status(200).json({
                user
            })
        }catch (e){
            logger.error(e.message);
            next(e)
        }

    }
}
module.exports = new User()