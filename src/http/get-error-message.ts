export const errors: Record<string, number | string> = {
  OLD_PASSWORD_IS_WRONG: 1000,
  USERNAME_ALREADY_EXIST: 1001
}

const errorCode: Record<number | string, string> = {
  [errors.OLD_PASSWORD_IS_WRONG]: "旧密码错误",
  [errors.USERNAME_ALREADY_EXIST]: '用户名已存在'
}

const getErrorMessage = (code?: number | string, defaultMessage?: string) => {
  if (code && errorCode[code]) {
    return errorCode[code]
  }
  return defaultMessage
}
export default getErrorMessage
