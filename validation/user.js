const Joi = require('joi');
const signupValidate = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};


module.exports = {
    signupValidate,
};