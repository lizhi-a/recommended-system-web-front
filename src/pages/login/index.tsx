import { login } from '@/api/login'
import { Credentials } from '@/api/login/types'
import { setToken } from '@/http/token'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { Button, notification, Tabs } from 'antd'
import { useState } from 'react'

type LoginType = 'account' | 'uniform'
const handleFinsih = async (loginType: LoginType, value: Credentials) => {
  if (loginType === 'uniform') {
    return
  }
	return login(value).then(response => {
			const token = response?.data.token
			const previousUrl = sessionStorage.getItem('previous_url')
			if (token) {
				setToken(token)
				window.location.replace('/')
			}
			if (previousUrl) {
				window.location.replace(previousUrl)
				localStorage.removeItem('previous_url')
			}
		})
		.catch(() => {
			notification.error({
				message: '用户名或密码错误'
			})
		})
}
export default () => {
	const [loginType, setLoginType] = useState<LoginType>('account') // 账号密码登录 | 统一身份认证登录
	return (
		<div style={{ background: '#fff', minHeight: '100vh' }}>
			<LoginForm
				title='vdp'
				subTitle='视频点播'
				onFinish={(value: Credentials) => handleFinsih(loginType, value)}
			>
				<Tabs
					activeKey={loginType}
					onChange={activeKey => setLoginType(activeKey as LoginType)}
					centered
					items={[
            {
							key: 'uniform',
							label: '统一身份认证登录'
						},
						{
							key: 'account',
							label: '账号密码登录'
						},
					]}
				/>
				{loginType === 'account' && (
					<>
						<ProFormText
							name='username'
							fieldProps={{
								size: 'large',
								prefix: <UserOutlined className='prefixIcon' />
							}}
							placeholder='用户名'
							rules={[
								{
									required: true,
									message: '请输入用户名!'
								}
							]}
						/>
						<ProFormText.Password
							name='password'
							fieldProps={{
								size: 'large',
								prefix: <LockOutlined className='prefixIcon' />
							}}
							placeholder='密码'
							rules={[
								{
									required: true,
									message: '请输入密码！'
								}
							]}
						/>
					</>
				)}
			</LoginForm>
		</div>
	)
}
