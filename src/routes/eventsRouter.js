import { Router, json } from "express";
import { cadastrarEventosSegunda, getEventsMonday, getMyEventsMonday, payment, setMonday } from "../controllers/eventsController.js";
import { eventsValidation } from "../middlewares/eventsMiddleware.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";


const eventsRouter = Router()

eventsRouter.post("/comprar", payment)
eventsRouter.post("/evento-cadastar-segunda", eventsValidation, cadastrarEventosSegunda)
eventsRouter.get("/events-get-segunda", getEventsMonday)
//essa rota precisa ser autenticada
eventsRouter.put("/events-alter-segunda", tokenValidator, setMonday)
eventsRouter.get("/events-get-segunda-user/:idMonday", getMyEventsMonday)

export default eventsRouter