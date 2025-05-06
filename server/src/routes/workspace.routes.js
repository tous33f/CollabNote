
import { Router } from "express";
import { createWorkspace,getWorkspace, joinWorkspace, workspaceMembers } from "../controllers/index.js";
import {verifyAuth} from "../middlewares/auth.middleware.js"

const router=Router()

router.route("/create").post(verifyAuth,createWorkspace)
router.route("/").get(verifyAuth,getWorkspace)
router.route("/join/:workpsace_id").post(verifyAuth,joinWorkspace)
router.route("/members/:workspace_id").get(verifyAuth,workspaceMembers)

export default router
