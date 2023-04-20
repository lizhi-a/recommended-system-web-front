import { getInteractiveRecommendCourses, getRecommendCourses } from "@/api/courses";
import NProTable from "@/components/n-pro-table"
import { CoursesType } from "@/constants";
import { ActionType, ProColumns, ProFormInstance, ProTableProps } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const InteractiveRecommendCourses: React.FC = () => {
  const actions = useRef<ActionType>()
  const formRef = useRef<ProFormInstance>()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [labelArr, setLabelArr] = useState<string[]>()

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
      title: '推荐分数',
      dataIndex: 'rating',
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
  ]

  return (
    <>
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