import { useCourseQuestions, useLastCourseRecord } from "@/hooks/queries";
import { ProForm, ProFormRadio } from "@ant-design/pro-components";
import { Button, Form, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CourseQuestionsProps {
  onOk: (values: Record<number, string>) => Promise<any>
}

const CourseQuestions: React.FC<CourseQuestionsProps> = (props) => {
  const { onOk } = props
  const { id: cid } = useParams<{ id: string }>()
  const [form] = Form.useForm()
  const [courseQuestions] = useCourseQuestions(cid)
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [courseRecord, { refetch: refetchCourseRecord }] = useLastCourseRecord({ cid, uid: user.id })
  const [isDisable, setIsDisable] = useState<boolean>(false)

  const handleFinish = async (formValue: Record<number, string>) => {
    onOk?.(formValue).then(() => {
      notification.success({
        message: '题目提交成功'
      })
      setIsDisable(true)
      refetchCourseRecord()
    })
  }

  const handleFillAgain = () => {
    setIsDisable(false)
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(courseRecord?.last_answer)
    setIsDisable(true)
  }, [courseRecord])

  return (
    <div className="w-10/12 my-6 m-auto">
      <div className="flex justify-between">
        <span>上次测试分数：{courseRecord?.last_score || '暂无测试分数'}</span>
        <Button onClick={handleFillAgain} type='primary' className="mb-6">开始测试</Button>
      </div>
      {
        courseQuestions ? (
          <ProForm
            form={form}
            onFinish={handleFinish}
            disabled={isDisable}
          >
            {
              courseQuestions?.map((item, index) => (
                <ProFormRadio.Group
                  key={item.question_id}
                  name={item.question_id}
                  label={`${index + 1}.${item.question_info}`}
                  options={item.question_options.map((i, k) => ({
                    label: i,
                    value: i
                  }))
                  }
                />
              ))
            }
          </ProForm>
        ) : '暂未发布测试题'
      }
      <Typography.Text type="danger" className="block mt-6">
        本次提交分数：{courseRecord?.score || '暂无测试分数'}
      </Typography.Text>
    </div>
  )
}

export default CourseQuestions