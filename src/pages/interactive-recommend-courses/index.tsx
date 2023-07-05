import { getInteractiveRecommendCourses, getRecommendCourses } from "@/api/courses";
import NProTable from "@/components/n-pro-table"
import { CoursesType } from "@/constants";
import { useCourseDependence, usePathCourse } from "@/hooks/queries";
import { ActionType, ProColumns, ProFormInstance, ProTableProps } from "@ant-design/pro-components";
import { Badge } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PathDiagram from "../self-test/PathDiagram";

const InteractiveRecommendCourses: React.FC = () => {
  const actions = useRef<ActionType>()
  const formRef = useRef<ProFormInstance>()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [labelArr, setLabelArr] = useState<string[]>()
  const [pathCourse] = usePathCourse({ uid: user.id })
  const [courseDependence] = useCourseDependence()

  useEffect(() => {
    let arr: string[] = []
    Object.keys(CoursesType).map((key: string) => {
      return (
        arr.push(...CoursesType[key].map(item => item))
      )
    })
    setLabelArr(arr)
  }, [CoursesType])

  const fetchFn: ProTableProps<CourseDetail, PaginationRequest>['request'] = async (params) => {
    const { cName, ...rest } = params;
    const res = await getInteractiveRecommendCourses({
      cName,
      uid: user.id,
      ...rest
    })
    if (res) {
      return {
        data: res.data.content,
        success: true,
        total: res.data.totalElements
      };
    }
    return {
      data: [],
      success: false,
      total: 0,
    }
  }

  const columns: ProColumns<CourseDetail>[] = [
    {
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '学科领域',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: labelArr?.map(item => ({
          value: item,
          label: item
        })),
        onChange: () => {
          formRef.current?.submit()
        }
      }
    },
    {
      title: '开课学校',
      dataIndex: 'org',
      hideInSearch: true,
    },
    {
      title: '课程评分',
      dataIndex: 'score',
      hideInSearch: true,
    },
    {
      title: '参与人数',
      dataIndex: 'students',
      hideInSearch: true,
    },
    {
      title: '开课周期',
      dataIndex: 'period_schedule'
    },
    {
      title: '推荐分数',
      dataIndex: 'rating',
      hideInSearch: true,
    },
  ]

  return (
    <>
      <div>
        <h3>学习路径推荐</h3>
        <div className="flex justify-between">
          <PathDiagram pathCourse={pathCourse} courseDependence={courseDependence} />
          <div className="flex-1">
            <p><Badge count=' ' color='#ffc2c2' />课程测试题分数在 0~59</p>
            <p><Badge count=' ' color='#ffdab6' />课程测试题分数在 60~74</p>
            <p><Badge count=' ' color='#fff3c4' />课程测试题分数在 75~89</p>
            <p><Badge count=' ' color='#c7fccd' />课程测试题分数在 90~100</p>
            <p><Badge count=' ' color='#c4e3ff' />未测试</p>
          </div>
        </div>
      </div>
      <NProTable<CourseDetail>
        actionRef={actions}
        request={fetchFn}
        formRef={formRef}
        rowKey="id"
        search={false}
        columns={columns}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`/course-detail/${record.id}`)
          }
        }}
      />
    </>
  )
}

export default InteractiveRecommendCourses