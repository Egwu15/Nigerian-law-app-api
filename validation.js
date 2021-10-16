const joi = require('joi');


const registerValidation = data => {
    const schema = joi.object({
        name: joi.string().required(),
        password: joi.string().min(6).required(),
        email: joi.string().min(4).required().email(),
    });

    return schema.validate(data);
}
const loginValidation = data => {
    const schema = joi.object({
        password: joi.string().min(6).required(),
        email: joi.string().min(4).required().email(),
    });

    return schema.validate(data);
}

// LAW VALIDATION
const lawValidation = data => {
    const schema = joi.object({
        law_name: joi.string().min(6).required(),
        description: joi.string().min(4).required(),
    });

    return schema.validate(data);
}

const lawSectionValidation = data => {
    const schema = joi.object({
        section: joi.number().min(1).required(),
        content: joi.string().min(4).required(),
    });

    return schema.validate(data);
}
const lawSectionOnlyValidation = data => {
    const schema = joi.object({
        section: joi.number().min(1).required(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.lawValidation = lawValidation;
module.exports.lawSectionValidation = lawSectionValidation;
module.exports.lawSectionOnlyValidation = lawSectionOnlyValidation;