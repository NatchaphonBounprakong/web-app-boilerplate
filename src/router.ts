import { Router } from "express";
import authRouter from "./api/auth";
import accountRouter from "./api/account";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/account", accountRouter);
//apiRouter.use("/api", authRouter);

export default apiRouter;