import { submitSelfTest } from "@/api/questions";
import { useQuestionsByType } from "@/hooks/queries";
import { ProForm, ProFormRadio } from "@ant-design/pro-components";
import { Button, Form, notification, Space, Typography } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SelfTestQuestions: React.FC = () => {
  const [form] = Form.useForm()
  const { type } = useParams<{ type: string }>()
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [questionsList, lastScore, { refetch }] = useQuestionsByType({ type, uid: user.id })
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [score, setScore] = useState<number>()


  const handleFinish = async (formValue: Record<number, string>) => {
    submitSelfTest?.({
      uid: user.id,
      questions: formValue,
      qType: type,
    }).then((res) => {
      notification.success({
        message: `题目提交成功，本次得分${res.data.score}`
      })
      setScore(res.data.score)
      setIsDisable(true)
      refetch()
    })
  }

  const handleFillAgain = () => {
    setIsDisable(false)
    form.resetFields()
  }

  return (
    <div className="w-10/12 my-6 m-auto">
      <div className="flex justify-between">
        <Button onClick={handleFillAgain} type='primary' className="mb-6">开始测试</Button>
        {
          <Typography.Text >测试分数：{lastScore}</Typography.Text>
        }
        {/* {
          score && <Typography.Text type="danger">测试分数：{score}</Typography.Text>
        } */}
      </div>
      <ProForm
        form={form}
        onFinish={handleFinish}
        disabled={isDisable}
      >
        {
          questionsList?.map((item, index) => (
            <ProFormRadio.Group
              layout="vertical"
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
    </div>
  )
}

export default SelfTestQuestions