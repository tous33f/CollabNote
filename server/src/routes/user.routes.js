
import { Router } from "express";
import { registerUser,loginUser, logoutUser, getUser, updateName, updateEmail, updatePassword } from "../controllers/index.js";
import {verifyAuth} from "../middlewares/auth.middleware.js"

const router=Router()

// router.route("/").get(getAllUser)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyAuth,logoutUser)
router.route("/").get(verifyAuth,getUser)
router.route("/name").patch(verifyAuth,updateName)
router.route("/email").patch(verifyAuth,updateEmail)
router.route("/password").patch(verifyAuth,updatePassword)

export default router
