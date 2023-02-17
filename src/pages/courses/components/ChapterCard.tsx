import { DescriptionTextItem } from '@/components/DescriptionText';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

interface ChapterCardProps {
  chapter?: Catlog;
  index: number; // 0, 1, 2
  courseId: string;
}
const ChapterCard: React.FC<ChapterCardProps> = (props) => {
  const { chapter, index, courseId } = props;
  if (!chapter) {
    return <></>
  }
  return (
    <li className='m-0 py-2 px-4'>
      <Link to={`/video/${courseId}/${chapter.id}`}>
        <div className='bg-gray-50 flex relative px-4 py-2 gap-x-4 rounded-lg cursor-pointer shadow hover:shadow-md transition'>
          {
            chapter?.completeType === 'COMPLETED' ? (
              <CheckCircleOutlined className='text-green-500 text-xl' />
            ): (
              <ClockCircleOutlined className='text-blue-500 text-xl' />
            )
          }
          <DescriptionTextItem top={`章节${index + 1}`} bottom={chapter.name} />
        </div>
      </Link>
    </li>
  )
}

export default ChapterCard;
