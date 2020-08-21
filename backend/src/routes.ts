import express from "express";

import SurveyController from "./controllers/surveyController";
 
const routes = express.Router();

const surveyController = new SurveyController();
 
//****************surveyController***************//
routes.post("/create", surveyController.store);
routes.post("/form", surveyController.index);
routes.get("/show", surveyController.show);
routes.delete("/delete", surveyController.destroy);

 
export default routes;
