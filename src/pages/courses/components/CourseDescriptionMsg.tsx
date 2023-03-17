import DescriptionItem from "@/components/DescriptionItem"

interface CourseDetailPropsType {
  courseDetail: CourseDetail
}

const CourseDescriptionMsg: React.FC<CourseDetailPropsType> = (props) => {
  const { courseDetail } = props

  return (
    <>
      <DescriptionItem title="概述" key='overview'>
        {courseDetail.course_overview || '暂无内容'}
      </DescriptionItem>
      <DescriptionItem title="授课目标">
        {
          courseDetail.course_objective?.split('#').map(item => {
            return <p key={item} className="m-0">{item}</p>
          }) || '暂无内容'
        }
      </DescriptionItem>
      <DescriptionItem title="预备知识">
        {
          courseDetail.propaedeutics?.split('#').map(item => {
            return <p key={item} className="m-0">{item}</p>
          }) || '暂无内容'
        }
      </DescriptionItem>
      <DescriptionItem title="证书要求">
        {
          courseDetail.certificate_requirement?.split('#').map(item => {
            return <p key={item} className="m-0">{item}</p>
          }) || '暂无内容'
        }
      </DescriptionItem>
      <DescriptionItem title="参考资料">
        {
          courseDetail.reference_data?.split('#').map(item => {
            return <p key={item} className="m-0">{item}</p>
          }) || '暂无内容'
        }
      </DescriptionItem>
      <DescriptionItem title="FAQ">
        {
          courseDetail.faq?.split('#').map(item => {
            return <p key={item} className="m-0">{item}</p>
          }) || '暂无内容'
        }
      </DescriptionItem>
    </>
  )
}

export default CourseDescriptionMsg