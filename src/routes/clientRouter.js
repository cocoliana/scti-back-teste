import { Router } from "express";
import { confirmPayment, denyPayment, getAllParticipants, getUserById, login, signupClient, trocarSenha } from "../controllers/clientController.js";
import { clientValidation } from "../middlewares/clientMiddleware.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const clientRouter = Router()

clientRouter.post("/signup", clientValidation, signupClient)
clientRouter.post("/login", login)
clientRouter.get("/user-all", getAllParticipants)
clientRouter.put("/user-release-access", confirmPayment)
clientRouter.put("/user-deny-access", denyPayment)
clientRouter.get("/user-info", getUserById)
//em caso de esquever email, fazer novamente o cadastro
clientRouter.put("/trocar-senha", trocarSenha)
clientRouter.get("/get-one-participant/:idUser", getUserById)




export default clientRouter