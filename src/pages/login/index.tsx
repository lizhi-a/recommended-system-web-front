import { Button } from 'antd'

export default () => {
	return (
		<div className='bg-white min-h-screen flex'>
      <div className='flex-auto flex justify-center'>
        <form
          title='vdp'
          action='/api/v1/cas/signIn'
          method='get'
        >
            <input name="state" value={1} hidden />
            <Button type="primary" htmlType='submit'>统一身份认证登录</Button>
        </form>
      </div>
		</div>
	)
}
