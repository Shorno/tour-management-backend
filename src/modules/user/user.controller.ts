import {NextFunction, Request, Response} from 'express';
import httpStatus from "http-status-codes"
import {createUserService, getAllUsersService} from "./user.service";
import {catchAsync} from "../../utils/catchAsync";
import {sendResponse} from "../../utils/sendResponse";


export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await createUserService(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User created successfully',
        data: result
    })
})


export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllUsersService();
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Users fetched successfully',
        data: result.data,
        metadata: result.metadata
    })
})