import {Response} from "express";

interface Metadata {
    total: number
}

interface IResponse<T> {
    statusCode: number,
    success: boolean,
    message: string,
    data: T;
    metadata?: Metadata
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
        metadata: data.metadata || undefined
    })
}