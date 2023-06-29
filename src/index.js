import express, {json} from "express"
import cors from "cors"
import clientRouter from "./routes/clientRouter.js"
import paymentRouter from "./routes/payment.js"



const server = express()

server.use(cors())
server.use(json())
server.use(clientRouter)
server.use(paymentRouter)

server.listen(process.env.PORT, ()=>{
    console.log("server on air on port: ", process.env.PORT)
})