import { Router } from "express";
import { getAllParticipants, signupClient } from "../controllers/clientController.js";
import { clientValidation } from "../middlewares/clientMiddleware.js";

const clientRouter = Router()

clientRouter.post("/signuser", clientValidation, signupClient)
clientRouter.get("/clients/:id/orders")
clientRouter.get("/getAll", getAllParticipants)
clientRouter.put("/liberar/user")

export default clientRouter