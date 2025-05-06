
import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, editTask, projectTasks, userTasks, workspaceTasks } from "../controllers/index.js";

const router=Router()

router.route("/create").post(verifyAuth,createTask)
router.route("/edit").patch(verifyAuth,editTask)
router.route("/:task_id").delete(verifyAuth,deleteTask)
router.route("/").get(verifyAuth,userTasks)
router.route("/workspace/:workspace_id").get(verifyAuth,workspaceTasks)
router.route("/project/:project_id").get(verifyAuth,projectTasks)


export default router
