import { Button } from 'antd'

export default () => (
	<div className=' min-h-screen flex justify-center items-center'>
		{/* 顶部导航栏 */}
		<div className='fixed top-0 flex w-full h-16 bg-blue-900 justify-center items-center' >
			<div className='w-full md:w-3/5 flex items-center'>
				<img src="/images/schoolIogo.png" className='h-10 mr-4' />
				<span className='text-white text-lg font-medium'>视频点播平台</span>
			</div>
		</div>
		{/* 背景图 */}
		<img src="/images/bgNow.jpg" className='w-full h-full absolute -z-10' />
		{/* 中间的图片及表单 */}
		<div className='flex flex-auto justify-center items-center '>
			<div className='w-0  md:w-2/5' >
				<img src="/images/miniBg1.png" className='w-full h-full object-contain object-center' />
			</div>
			<div className='bg-white w-64 h-64 p-4 relative rounded-md shadow-md'>
				<h3 className='text-center'>登录</h3>
				<div className='text-xs text-center'>
					<p>点击前往统一身份认证网关进行身份认证</p>
				</div>
				<form
					title='vdp'
					action='/api/v1/cas/signIn'
					method='get'
					className='absolute bottom-10 left-1/2 -ml-8 '
				>
					<input name="state" value={1} hidden />
					<Button type="primary" htmlType='submit' >登录</Button>
				</form>
			</div>
		</div>
	</div >
)
