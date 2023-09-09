import { Router } from "express";
import { confirmPayment, denyPayment, getAllParticipants, getUserById, login, signupClient } from "../controllers/clientController.js";
import { clientValidation } from "../middlewares/clientMiddleware.js";

const clientRouter = Router()

clientRouter.post("/signup", clientValidation, signupClient)
clientRouter.post("/login", login)
clientRouter.get("/user-all", getAllParticipants)
clientRouter.get("/user-info", getUserById)
clientRouter.put("/user-release-access", confirmPayment)
clientRouter.put("/user-deny-access", denyPayment)



export default clientRouter