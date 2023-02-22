import { Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course?: Course;
}
const CourseCard: React.FC<CourseCardProps> = (props) => {
  const { course } = props;
  if (!course) {
    return <></>
  }
  return (
    <div className='w-full sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-3 flex' style={{ minHeight: 200 }}>
      <Link to={`/course-detail/${course.id}`} className="block w-full">
        <div className='flex-auto bg-white shadow-md transform transition hover:shadow-xl cursor-pointer rounded-lg overflow-hidden'>
          <div className='w-full h-40'>
            <Image className="object-cover object-center" width="100%" height={160} preview={false} src={course.cover} />
          </div>
          <div className='p-4'>
            <Typography.Text className='double-line-ellipsis pb-2 m-0 font-medium te'>{course.name}</Typography.Text>
            <div className='text-ant-text-secondary m-0 p-0'>{course.orgName}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard;
