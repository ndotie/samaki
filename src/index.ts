import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import auth from "./auth/auth_router"; //picking the index.ts
import fish from "./fisher/router";
import fishtype from "./fish/router";
import orders from "./orders/router";
import wallet_router from "./wallet/wallet_router";
import { isAuthenticated } from "./middleware/authenticated";

dotenv.config(); //i think this works populate the process env objec

const app = express();
const port = process.env.PORT; //This needs to be a global thing, and i dont know why its even here!!
app.use(express.static("gallery")); //okey we're exposing the gallery folder here!!
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
  })
);

app.use("/auth", auth);
app.use("/fish", isAuthenticated, fish);
app.use("/fishtype", isAuthenticated, fishtype);
app.use("/orders", isAuthenticated, orders);
app.use("/wallet", isAuthenticated, wallet_router);
app.get("/", isAuthenticated, (req: Request, res: Response) => {
  res.send("Not a route " + req.context.user.userId); //this needs not to fail @any sacumstances
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
