import { DeleteOutlined } from '@ant-design/icons';
import { Image, Progress, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

interface MyCourseCardProps {
  course?: CourseDetail;
  onDelete?: (course: CourseDetail) => void;
}
const MyCourseCard: React.FC<MyCourseCardProps> = (props) => {
  const { course, onDelete } = props;
  const handleDelete: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    if (onDelete && course) {
      onDelete(course);
    }
    event.preventDefault();
  }
  const hasCatalogs = (course?.catalogs?.length || 0) > 0;
  const realProgress = course?.courseProgress || 0;
  if (!course) {
    return <></>
  }
  return (
    <div className='w-full sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-3 flex' style={{ minHeight: 200 }}>
      <Link to={`/course-detail/${course.id}`} className="block w-full">
        <div className='flex-auto bg-white shadow-md transform transition hover:shadow-xl cursor-pointer rounded-lg overflow-hidden my-course-card'>
          <div className='w-full h-40'>
            <Image className="object-cover object-center" width="100%" height={160} preview={false} src={course.coverUrl} />
          </div>
          <div className='p-4'>
            <Typography.Text className='double-line-ellipsis mb-1 m-0 font-medium te'>{course.name}</Typography.Text>
            <div className='text-ant-text-secondary m-0 mb-1 p-0'>
              <span className='mr-1'>
                开始时间
              </span>
              {dayjs(course?.createAt).format('YYYY-MM-DD HH:mm')}
            </div>
            <div className='flex'>
              <Typography.Text type='secondary' className='mr-1'>进度</Typography.Text>
              <div className='flex-1'>
                <Progress percent={hasCatalogs ? realProgress : 100} />
              </div>
            </div>
          </div>

          {/* 删除按钮 begin */}
          {/* <div className='my-course-card__delete-btn absolute top-0 right-0 rounded-full w-32 h-32 bg-black opacity-50'>
            <span className='absolute bottom-6 left-8 text-lg text-ant-error-color' onClick={handleDelete}>
              <DeleteOutlined />
            </span>
          </div> */}
          {/* 删除按钮 end */}
        </div>
      </Link>
    </div>
  )
}

export default MyCourseCard;
