export interface Credentials {
	username: string
	password: string
}

export interface UserInfo {
	id: number
	username: string
}

export interface LoginDetails {
	info: UserInfo
	token: string
}