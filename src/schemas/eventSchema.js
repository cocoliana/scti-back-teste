import Joi from "joi";


const eventSchema = Joi.object({
    course: Joi.string().required(),
    speakerCourse: Joi.string().required(),
    lecture: Joi.string().required(),
    speakerLecture: Joi.string().required(),
    timeLecture: Joi.string().required(),
    timeCourse: Joi.string().required(),
    qtd: Joi.number().required()
})

export default eventSchema;