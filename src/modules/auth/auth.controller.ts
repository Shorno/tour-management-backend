import {catchAsync} from "../../utils/catchAsync";
import {sendResponse} from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import {credentialsLoginService, getNewAccessTokenService} from "./auth.service";
import {setAuthCookie} from "../../utils/setCookie";

export const credentialsLogin = catchAsync(async (req, res, next) => {

    const loginInfo = await credentialsLoginService(req.body)

    setAuthCookie(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Login successful',
        data: loginInfo
    })

})

export const getNewAccessToken = catchAsync(async (req, res, next) => {

    const refreshToken = req.cookies.refreshToken;

    const tokenInfo = await getNewAccessTokenService(refreshToken)


    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Access token refreshed successfully',
        data: tokenInfo
    })

})


export const logout = catchAsync(async (req, res, next) => {

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
    })

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Logout successful',
        data: null
    })



})