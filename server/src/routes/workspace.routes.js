
import { Router } from "express";
import { createWorkspace,getWorkspace, joinWorkspace, removeFromWorkspace, updateMemberRole, workspaceMembers } from "../controllers/index.js";
import {verifyAuth} from "../middlewares/auth.middleware.js"

const router=Router()

router.route("/create").post(verifyAuth,createWorkspace)
router.route("/").get(verifyAuth,getWorkspace)
router.route("/members/join/:workpsace_id").post(verifyAuth,joinWorkspace)
router.route("/members/:workspace_id").get(verifyAuth,workspaceMembers)
router.route("/members/update/:workspace_id").patch(verifyAuth,updateMemberRole)
router.route("/members/remove/:workspace_id").post(verifyAuth,removeFromWorkspace)

export default router
