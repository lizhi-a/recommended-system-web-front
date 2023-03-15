import { login } from '@/api/login'
import { setToken } from '@/http/token';
import { Button, Form, Input, notification } from 'antd'

export default () => {

	const handleFinish = (values: { userName: string; password: string }) => {
		return login(values).then((res) => {
			setToken(res.data.content.token)
			localStorage.setItem("userInfo", JSON.stringify(res.data.content))
			notification.success({
				message: '登录成功'
			})
			window.location.replace('/courses')
		})
	}

	return (
		<div className='min-h-screen flex justify-center items-center'>
			{/* 顶部导航栏 */}
			<div className='fixed top-0 flex w-full h-16 bg-blue-900 justify-center items-center' >
				<div className='w-full md:w-3/5 flex items-center'>
					<span className='text-white text-lg font-medium'>教育资源推荐系统</span>
				</div>
			</div>
			{/* 中间的图片及表单 */}
			<div className='flex flex-auto justify-center items-center'>
				<div className='bg-white w-96 h-60 p-4 relative rounded-md shadow-md'>
					<h2 className='text-center'>登录</h2>
					<Form
						title='login'
						onFinish={handleFinish}
						method='get'
						labelCol={{ span: 4 }}
						className='flex flex-col justify-center'
					>
						<Form.Item name='userName' label='用户名'>
							<Input />
						</Form.Item>
						<Form.Item name='password' label='密码'>
							<Input />
						</Form.Item>
						<Button type="primary" htmlType='submit'>登录</Button>
					</Form>
				</div>
			</div>
		</div >
	)
}