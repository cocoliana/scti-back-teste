import joi from "joi"

const clientSchema = joi.object({
name: joi.string().required(),
email: joi.string().email().required(),
password: joi.string().min(4).required(),
confirmPassword: joi.valid(joi.ref("password"))
})

export default clientSchema;
