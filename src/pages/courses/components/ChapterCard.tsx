import { DescriptionTextItem } from '@/components/DescriptionText';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';
import React from 'react';

interface ChapterCardProps {
  chapter?: Catlog;
  index: number; // 0, 1, 2
  courseId: string;
  onClick?: (chapter?: Catlog) => void;
}
const ChapterCard: React.FC<ChapterCardProps> = (props) => {
  const { chapter, index, courseId, onClick } = props;
  const handleClick = () => {
    onClick?.(chapter);
  }
  if (!chapter) {
    return <></>
  }
  const isComplete =  chapter?.completeType === 'COMPLETED';
  return (
    <li className='m-0 py-2 px-4' onClick={handleClick}>
      <div className={`bg-gray-50 flex items-center relative px-4 py-2 gap-x-4 rounded-lg cursor-pointer shadow hover:shadow-md transition ${isComplete ? 'opacity-60' : 'opacity-100'}`}>
        {
          isComplete ? (
            <Tooltip title="已完成">
              <CheckCircleOutlined className='text-green-500 text-xl' />
            </Tooltip>
          ): (
            <ClockCircleOutlined className='text-blue-500 text-xl' />
          )
        }
        <DescriptionTextItem
          top={<div className="text-base">章节{index + 1}</div>}
          bottom={<div className='text-lg font-medium'>{chapter.name}</div>}
        />
        {
          isComplete && (
            <div className='absolute right-4 top1/2'>已完成</div>
          )
        }
      </div>
    </li>
  )
}

export default ChapterCard;
