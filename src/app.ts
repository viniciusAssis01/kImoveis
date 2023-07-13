import "express-async-errors";
import "reflect-metadata";
import express from "express";
import * as M from "./middlewares";
import * as R from "./routers"

const app = express();
app.use(express.json());

app.use("/users", R.userRouter)
app.use("/login", R.sessionRouter)
app.use("/categories", R.categoryRouter)
app.use("/realEstate", R.realEstateRouter)
//se ao rodar um teste especifico, e em todos (hipoteses de sucess e error) retornar 404, significa q vc escreveu a rota errado aqui no arq app.

app.use(M.handleError)

export default app;
