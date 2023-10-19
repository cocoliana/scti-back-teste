import { Router, json } from "express";
import { cadastrarEventosQuarta, cadastrarEventosQuinta, cadastrarEventosSegunda, cadastrarEventosSexta, cadastrarEventosTerca, getEventsMonday, getEventsQuarta, getEventsQuinta, getEventsSexta, getEventsTerca, getMyEventsMonday, getMyEventsSexta, getMyEventsThursday, getMyEventsTuesday, getMyEventsWednesday, payment, quartaDados, quintaDados, segundaDados, setMonday, setQuarta, setQuinta, setSexta, setTerca, sextaDados, tercaDados } from "../controllers/eventsController.js";
import { eventsValidation } from "../middlewares/eventsMiddleware.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";


const eventsRouter = Router()

eventsRouter.post("/comprar", payment)

//segunda
eventsRouter.post("/evento-cadastar-segunda", eventsValidation, cadastrarEventosSegunda)
eventsRouter.get("/events-get-segunda", getEventsMonday)
eventsRouter.put("/events-alter-segunda", tokenValidator, setMonday)
eventsRouter.get("/events-get-segunda-user/:idDay", getMyEventsMonday)

//terça
eventsRouter.post("/evento-cadastar-terca", eventsValidation, cadastrarEventosTerca)
eventsRouter.get("/events-get-terca", getEventsTerca)
eventsRouter.put("/events-alter-terca", tokenValidator, setTerca)
eventsRouter.get("/events-get-terca-user/:idDay", getMyEventsTuesday)

//quarta
eventsRouter.post("/evento-cadastar-quarta", eventsValidation, cadastrarEventosQuarta)
eventsRouter.get("/events-get-quarta", getEventsQuarta)
eventsRouter.put("/events-alter-quarta", tokenValidator, setQuarta)
eventsRouter.get("/events-get-quarta-user/:idDay", getMyEventsWednesday)


//quinta

eventsRouter.post("/evento-cadastar-quinta", eventsValidation, cadastrarEventosQuinta)
eventsRouter.get("/events-get-quinta", getEventsQuinta)
eventsRouter.put("/events-alter-quinta", tokenValidator, setQuinta)
eventsRouter.get("/events-get-quinta-user/:idDay", getMyEventsThursday)


//sexta
eventsRouter.post("/evento-cadastar-sexta", eventsValidation, cadastrarEventosSexta)
eventsRouter.get("/events-get-sexta", getEventsSexta)
eventsRouter.put("/events-alter-sexta", tokenValidator, setSexta)
eventsRouter.get("/events-get-sexta-user/:idDay", getMyEventsSexta)


//
eventsRouter.get("/evento-minha-seunda", tokenValidator, segundaDados)
eventsRouter.get("/evento-minha-terca", tokenValidator, tercaDados)
eventsRouter.get("/evento-minha-quarta", tokenValidator, quartaDados)
eventsRouter.get("/evento-minha-quinta", tokenValidator, quintaDados)
eventsRouter.get("/evento-minha-sexta", tokenValidator, sextaDados)

export default eventsRouter