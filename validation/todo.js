const Joi = require('joi');
const todoCreate = (data) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
    });
    return schema.validate(data);
};


module.exports = {
    todoCreate,
};