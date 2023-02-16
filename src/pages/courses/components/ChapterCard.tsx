import { DescriptionTextItem } from '@/components/DescriptionText';
import { ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';

interface ChapterCardProps {
  chapter?: Catlog;
  index?: number; // 0, 1, 2
}
const ChapterCard: React.FC<ChapterCardProps> = (props) => {
  const { chapter, index } = props;
  if (!chapter) {
    return <></>
  }
  return (
    <li className='m-0 py-2 px-4'>
      <div className='bg-gray-50 flex relative px-4 py-2 gap-x-4 rounded-lg cursor-pointer shadow hover:shadow-md transition'>
        <ClockCircleOutlined className='text-blue-500 text-xl' />
        <DescriptionTextItem top={`章节${index}`} bottom={chapter.name} />
      </div>
    </li>
  )
}

export default ChapterCard;
