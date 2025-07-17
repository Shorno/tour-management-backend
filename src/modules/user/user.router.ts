import {Router} from "express";
import {createUser, getAllUsers} from "./user.controller";
import {createUserZodSchema} from "./user.validation";
import {validateRequest} from "../../middlewares/validateRequest";



const router = Router()

router.get("/", getAllUsers)

router.post("/register",
    validateRequest(createUserZodSchema),
    createUser
)


export const UserRoutes = router;