import DescriptionText, { DescriptionTextItem } from '@/components/DescriptionText';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Image } from 'antd';
import React from 'react';
import ChapterCard from './components/ChapterCard';

const Box: React.FC<{ children?: React.ReactNode; className?: string; }> = ({ children }) => (
  <div className='w-full sm:w-full md:w-1/2 lg:w-1/2 lg:px-4'>
    <div className='w-full h-full relative'>{children}</div>
  </div>
)

const CourseDetail: React.FC = () => {

  return (
    <div>
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
          <Box className="md:">
            <div className='flex justify-between pt-6'>
              <h1 className='text-base font-medium m-0 p-0 w-1/2 overflow-hidden text-ellipsis whitespace-nowrap'>课程名称</h1>
              <div className='text-ant-text-secondary text-base'>开通组织：信息学院</div>
            </div>
            <div className='mt-8 mb-2 text-ant-text-secondary leading-7 text-base'>
              课程介绍：
              {
                '使用 props 和 state，我们可以创建一个简易的 Todo 应用。在示例中，我们使用 state 来保存现有的待办事项列表及用户的输入。尽管事件处理器看似被内联地渲染，但它们其实只会被事件委托进行收集和调用。'
              }
            </div>
            <div className='md:absolute lg:absolute left-0 bottom-0'>
              <Button size='large' type='primary' className='bg-green-500 hover:bg-green-400'>继续学习</Button>
            </div>
          </Box>
        </div>
      </div>
      
      <div className='mt-2 bg-white py-4'>
        <h2 className='ml-4 my-0 font-medium text-base'>课程章节</h2>
        <ul className='list-none my-0 p-0 mx-auto w-full sm:w-full md:w-2/3'>
          {
            [1, 2, 3, 4, 5, 6].map((v) => (
              <ChapterCard
                chapter={{
                  sort: v,
                  name: `C语言入门第${v}课`,
                  description: '',
                }}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default CourseDetail;
