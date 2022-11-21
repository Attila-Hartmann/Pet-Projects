const Joi = require('joi');

module.exports.todoSchema = Joi.object({    
        task: Joi.string().required(),
        time: Joi.string().required(),
        description: Joi.string().allow('')
    })
