import { Breadcrumb, Button, Image } from 'antd';
import React from 'react';

const Box: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className='w-full sm:w-full md:w-1/2 lg:w-1/2 lg:px-4'>
    <div className='w-full h-full relative'>{children}</div>
  </div>
)

const CourseDetail: React.FC = () => {

  return (
    <div className='px-4 py-2 mt-6 bg-white'>
      <Breadcrumb>
        <Breadcrumb.Item href='/courses'>首页</Breadcrumb.Item>
        <Breadcrumb.Item>课程名称</Breadcrumb.Item>
      </Breadcrumb>
      <div className='flex flex-wrap lg:px-4 py-4'>
        <Box>
          <div className='w-full'>
            <Image src="https://static.runoob.com/images/demo/demo2.jpg" preview={false} />
          </div>
        </Box>
        <Box>
          <div className='flex justify-between pt-6'>
            <h1 className='text-lg font-medium m-0 p-0 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap'>课程名称</h1>
            <div className='text-ant-text-secondary text-lg'>开通组织：信息学院</div>
          </div>
          <div className='mt-8 text-ant-text-secondary leading-7 text-base'>
            课程介绍：
            {
              '使用 props 和 state，我们可以创建一个简易的 Todo 应用。在示例中，我们使用 state 来保存现有的待办事项列表及用户的输入。尽管事件处理器看似被内联地渲染，但它们其实只会被事件委托进行收集和调用。'
            }
          </div>
          <div className='absolute left-0 bottom-0'>
            <Button size='large' type='primary' className='bg-green-500 hover:bg-green-400'>继续学习</Button>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default CourseDetail;
