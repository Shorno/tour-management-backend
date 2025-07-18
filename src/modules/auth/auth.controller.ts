import {catchAsync} from "../../utils/catchAsync";
import {sendResponse} from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import {credentialsLoginService} from "./auth.service";

export const credentialsLogin = catchAsync(async (req, res, next) => {

    const loginInfo = await credentialsLoginService(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Login successful',
        data: loginInfo
    })

})