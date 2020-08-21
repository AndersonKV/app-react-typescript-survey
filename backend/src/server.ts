import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import routes from "./routes";
import bodyParser from "body-parser";
const app = express();

mongoose.connect(
  "mongodb+srv://adm_jr:juniorjunior@cluster0-xage2.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

app.listen(3333);
