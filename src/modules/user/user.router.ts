import {Router} from "express";
import {createUser, getAllUsers} from "./user.controller";

const router = Router()

router.get("/", getAllUsers)
router.post("/register", createUser)


export const UserRoutes = router;