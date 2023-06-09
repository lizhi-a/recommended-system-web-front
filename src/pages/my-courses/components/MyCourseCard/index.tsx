import { Image, Progress, Typography } from 'antd';
import courseImg from '@/assets/course.png'
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

interface MyCourseCardProps {
  course?: MyCourses;
  onDelete?: (course: CourseDetail) => void;
}
const MyCourseCard: React.FC<MyCourseCardProps> = (props) => {
  const { course } = props;
  // const hasCatalogs = (course?.catalogs?.length || 0) > 0
  // const realProgress = course?.courseProgress || 0

  if (!course) {
    return <></>
  }
  return (
    <div className='w-full sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-3 flex' style={{ minHeight: 200 }}>
      <Link to={`/course-detail/${course.cid_id}`} className="block w-full">
        <div className='flex-auto bg-white shadow-md transform transition hover:shadow-xl cursor-pointer rounded-lg overflow-hidden my-course-card'>
          <div className='w-full h-40'>
            <Image className="object-cover object-center" width="100%" height={160} preview={false} src={course.courseInfo.image || courseImg} />
          </div>
          <div className='p-4'>
            <Typography.Text className='double-line-ellipsis mb-1 m-0 font-medium te'>{course.courseInfo.name}</Typography.Text>
            <Typography.Text type="secondary">课时安排:{course.courseInfo.period_schedule}</Typography.Text>
            <div className='flex'>
              <Typography.Text type='secondary' className='mr-1'>进度</Typography.Text>
              <div className='flex-1'>
                <Progress percent={course.process || 0} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MyCourseCard;
