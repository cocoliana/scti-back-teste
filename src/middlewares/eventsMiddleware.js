import eventSchema from "../schemas/eventSchema.js"

export function eventsValidation(req, res, next) {
    const event = req.body
    const validateEvent = eventSchema.validate(event, { abortEarly: false })

    if (validateEvent.error) {
        console.log(validateEvent.error.details)
        return res.sendStatus(400)
    }

    next()
}
