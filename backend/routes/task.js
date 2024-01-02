import express from "express" ;
import {deleteTask,getMyTask,newTask,updateTask} from "../controllers/task.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMyTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

//after putting on router.route you can put multiple methods like get put delete
// this way you don't have to write one path again and again 



export default router;