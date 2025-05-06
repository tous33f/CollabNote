
import { Router } from "express";
import {verifyAuth} from "../middlewares/auth.middleware.js"
import { createProject,getProject,getWorkspaceProjects } from "../controllers/index.js";

const router=Router()

router.route("/create/:workspace_id").post(verifyAuth,createProject)
router.route("/all/:workspace_id").get(verifyAuth,getWorkspaceProjects)
router.route("/:project_id").get(verifyAuth,getProject)

export default router
