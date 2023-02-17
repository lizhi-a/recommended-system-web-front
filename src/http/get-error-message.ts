export const errors: Record<string, number | string> = {
  ROLE_ALREADY_EXISTS: 1003,
  ROLE_NOT_EXISTS: 1004,
  ROLE_ALREADY_USED: 1005,
  USER_NAME_EMPTY: 1011,
  PASSWORD_EMPTY: 1012,
  USER_NAME_EXISTS: 1013,
  USER_NOT_FOUND: 1014,
  ORG_NOT_FOUND: 1015,
  ORG_ALREADY_EXIST: 1016,
  PARSE_EXCEL_EXCEPTION: 1018,
  FILE_DOWNLOAD_ERROR: 1019,
  ORG_CODE_ALREADY_EXIST: 1020,
  PRIVILEGE_NOT_FOUND: 1024,
  OLD_PASSWORD_IS_ERROR: 1027,
  TWO_NEW_PASSWORDS_DO_NOT_MATCH: 1028,
  FOUND_MULTIPLE_USERS: 1029,
  ORG_NAME_ALREADY_EXIST: 1032,
  COURSE_NOT_EXIST: 1034,
  ACCOUNT_COURSE_IS_EXIST: 1035,
  COURSE_NAME_ALREADY_EXIST: 1036,
  CATALOG_NAME_ALREADY_EXIST: 1037,
  ACCOUNT_COURSE_PROGRESS_NOT_EXIST: 1038,
  PROGRESS_REOPRT_ERROR: 1039,
  COURSE_PUBLISHED_OR_WAIT_APPROVAL: 1040,
  NAME_HAVE_SPECIAL_CHARACTERS: 1041,
  RESOURCE_UPLOAD_ERROR: 1101,
}

const errorCode: Record<number | string, string> = {
  [errors.ROLE_ALREADY_EXISTS]: "角色已存在",
  [errors.ROLE_NOT_EXISTS]: "角色不存在",
  [errors.ROLE_ALREADY_USED]: "角色已使用",
  [errors.USER_NAME_EMPTY]: "用户名为空",
  [errors.PASSWORD_EMPTY]: "密码为空",
  [errors.USER_NAME_EXISTS]: "用户名已存在",
  [errors.USER_NOT_FOUND]: "用户不存在",
  [errors.ORG_NOT_FOUND]: "组织不存在",
  [errors.ORG_ALREADY_EXIST]: "组织已存在",
  [errors.PARSE_EXCEL_EXCEPTION]: "解析excel异常",
  [errors.FILE_DOWNLOAD_ERROR]: "下载文件失败",
  [errors.ORG_CODE_ALREADY_EXIST]: "组织编码已存在",
  [errors.PRIVILEGE_NOT_FOUND]: "无权限",
  [errors.OLD_PASSWORD_IS_ERROR]: "旧密码错误",
  [errors.TWO_NEW_PASSWORDS_DO_NOT_MATCH]: "两次输入密码不一致",
  [errors.FOUND_MULTIPLE_USERS]: "There are multiple records for this user name",
  [errors.ORG_NAME_ALREADY_EXIST]: "组织已存在",
  [errors.COURSE_NOT_EXIST]: "课程不存在",
  [errors.ACCOUNT_COURSE_IS_EXIST]: "用户已注册该课程",
  [errors.COURSE_NAME_ALREADY_EXIST]: "组织内有同名课程",
  [errors.CATALOG_NAME_ALREADY_EXIST]: "课程内有同名章节",
  [errors.ACCOUNT_COURSE_PROGRESS_NOT_EXIST]: "用户课程进度不存在",
  [errors.PROGRESS_REOPRT_ERROR]: "进度上传失败",
  [errors.COURSE_PUBLISHED_OR_WAIT_APPROVAL]: "课程已发布或正在审核",
  [errors.NAME_HAVE_SPECIAL_CHARACTERS]: "课程名称不支持特殊字符",
  [errors.RESOURCE_UPLOAD_ERROR]: "文件上传失败",
}

const getErrorMessage = (code?: number | string, defaultMessage?: string) => {
	if (code && errorCode[code]) {
		return errorCode[code]
	}
	return defaultMessage
}
export default getErrorMessage
