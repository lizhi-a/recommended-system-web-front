export const errors: Record<string, number | string> = {
	BAD_REQUEST: 400,
}

const errorCode: Record<number | string, string> = {
	[errors.BAD_REQUEST]: '错误请求',
}

const getErrorMessage = (code?: number | string, defaultMessage?: string) => {
	if (code && errorCode[code]) {
		return errorCode[code]
	}
	return defaultMessage
}
export default getErrorMessage
