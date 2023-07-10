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
app.use("/reaEstate", R.realEstateRouter)

app.use(M.handleError)

export default app;
