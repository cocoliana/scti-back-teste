import clientSchema from "../schemas/clientSchema.js";

export function clientValidation(req,res,next){
    const client = req.body
    const validateClient = clientSchema.validate(client, {abortEarly:false})

    if (validateClient.error){
        console.log(validateClient.error.details)
        return res.sendStatus(400)
    }
 
    next()
}

