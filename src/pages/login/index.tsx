import { login, signUp } from '@/api/login'
import { AllCoursesType } from '@/constants';
import { setToken } from '@/http/token';
import regs from '@/utils/reg';
import { Button, Form, Input, notification, Radio, Select, Tabs, TabsProps } from 'antd'

export default () => {

	const handleSignInFinish = (values: { userName: string; password: string }) => {
		return login(values).then((res) => {
			setToken(res.data.content.token)
			localStorage.setItem("userInfo", JSON.stringify(res.data.content))
			notification.success({
				message: '登录成功'
			})
			window.location.replace('/courses')
		})
	}

	const handleSignUpFinish = (values: Omit<UserData.User, 'id'>) => {
		const { label, ...rest } = values
		return signUp({
			label: label.join('、'),
			...rest
		}).then((res) => {
			setToken(res.data.content.token)
			localStorage.setItem("userInfo", JSON.stringify(res.data.content))
			notification.success({
				message: '注册成功'
			})
			window.location.replace('/courses')
		})
	}

	const items: TabsProps['items'] = [
		{
			key: 'signIn',
			label: `登录`,
			children: (
				<Form
					title='login'
					onFinish={handleSignInFinish}
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
			),
		},
		{
			key: 'signUp',
			label: `注册`,
			children: (
				<Form
					title='login'
					onFinish={handleSignUpFinish}
					method='get'
					labelCol={{ span: 6 }}
					className='flex flex-col justify-center'
				>
					<Form.Item name='userName' label='用户名' required>
						<Input />
					</Form.Item>
					<Form.Item name='password' label='密码'
						rules={[
							{ required: true },
							{ min: 6, max: 16, message: '密码必须在6-16位之间' },
							{ pattern: regs.onlyEnglishAndNumber, message: '由英文字母、数字、字母+数字组成' },
						]}>
						<Input />
					</Form.Item>
					<Form.Item name='name' label='姓名' required>
						<Input />
					</Form.Item>
					<Form.Item name='gender' label='性别' required>
						<Radio.Group options={[
							{ label: '男', value: '男' },
							{ label: '女', value: '女' },
						]} />
					</Form.Item>
					<Form.Item name='major' label='专业' required>
						<Input />
					</Form.Item>
					<Form.Item name='label' label='兴趣标签'>
						<Select
							placeholder="请选择您感兴趣的标签"
							mode="multiple"
							options={AllCoursesType.map(item => ({
								label: item,
								value: item,
							}))}
						/>
					</Form.Item>

					<Button type="primary" htmlType='submit'>注册</Button>
				</Form>
			),
		},
	];

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
				<div className='bg-white w-96 p-4 relative rounded-md shadow-md'>
					<Tabs defaultActiveKey="1" centered items={items} />
				</div>
			</div>
		</div >
	)
}