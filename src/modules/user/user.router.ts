import {Router} from "express";
import {createUser, getAllUsers, updateUser} from "./user.controller";
import {createUserZodSchema} from "./user.validation";
import {validateRequest} from "../../middlewares/validateRequest";
import {checkAuth} from "../../middlewares/checkAuth";
import {Role} from "./user.interface";


const router = Router()


router.get("/", checkAuth(Role.USER), getAllUsers)

router.post("/register",
    validateRequest(createUserZodSchema),
    createUser
)
router.patch("/:userId", checkAuth(...Object.values(Role)), updateUser)


export const UserRoutes = router;