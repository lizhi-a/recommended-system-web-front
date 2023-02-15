import React from 'react';
import MyCourseCard from './components/MyCourseCard';

const MyCourses: React.FC = () => {

  return (
    <div>
      <h1>我的课程</h1>
      <section className='flex justify-start flex-wrap'>
        {
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
            <MyCourseCard
              key={v}
              course={{
                chapters: [],
                cover: 'https://static.runoob.com/images/demo/demo2.jpg',
                createAt: '',
                description: '',
                id: '1',
                name: 'C语言',
                orgName: '计算机学院',
                updateAt: '',
              }}
            />
          ))
        }
      </section>
    </div>
  )
}

export default MyCourses;
