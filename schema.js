const joi = require('joi');
const review = require('./models/review');

module.exports.newlistingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required().max(30),
        description:joi.string().required(),
        image:joi.string().allow("",null),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
        category:joi.array().required()
    }).required(),

})

module.exports.editlistingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required().max(30),
        description:joi.string().required(),
        image:joi.string().allow("",null),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
    }).required(),

})

module.exports.reviewSchema=joi.object({
    review:joi.object({
        content:joi.string().required(),
        rating:joi.number().required().min(1).max(5),
    }).required(),
})