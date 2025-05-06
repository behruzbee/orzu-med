interface IResponseData<T> {
	status: T
	data: T
	message: string
}

export type SingleErrorType = {
	statusCode: number,
        message: string
}

export type ServerResponseType<T> = Promise<IResponseData<T>>

export type ServerErrorType = IResponseData<unknown>