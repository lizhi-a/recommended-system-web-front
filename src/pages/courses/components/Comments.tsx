import { addComment, getComments } from "@/api/comments";
import { ActionType, ProList, ProListProps } from "@ant-design/pro-components";
import { Button, Form, Image, Input, notification, Rate, Space, Tag } from "antd"
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import userImg from '@/assets/user.jpg'
import { FormInstance, useForm } from "antd/lib/form/Form";


const Comments: React.FC = () => {
  const { id: courseId } = useParams<{ id: string; }>()
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const actions = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchFn: ProListProps<CommentData.Comment, PaginationRequest>['request'] = async (params) => {
    const { current = 1, pageSize = 20, ...rest } = params
    setLoading(true)
    const res = await getComments({
      page: current - 1,
      size: pageSize,
      cid: courseId,
      ...rest
    })
    setLoading(false)
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

  const handleFinish = (values: { score: number, description: string }) => {
    if (courseId && user.id) {
      setLoading(true)
      return addComment({
        cid: courseId,
        uid: user.id,
        userName: user.userName,
        startAt: dayjs().unix(),
        ...values
      }).then(() => {
        actions.current?.reload()
        formRef.current?.resetFields()
        setLoading(false)
        notification.success({
          message: '评论发表成功'
        })
      })
    }
    return Promise.resolve()
  }

  return (
    <div className="w-11/12 my-6 m-auto">
      <Form
        name="评价"
        onFinish={handleFinish}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          name="score"
          label="评分"
          rules={[{ required: true, message: '请选择评分' }]}
        >
          <Rate allowHalf />
        </Form.Item>
        <Form.Item
          label="内容"
          name="description"
          rules={[
            { required: true, message: '请填写评论内容' },
            { min: 5, max: 500 }
          ]}
        >
          <Input.TextArea showCount />
        </Form.Item>
        <Form.Item className="flex flex-row-reverse">
          <Button type="primary" htmlType="submit">
            提交评价
          </Button>
        </Form.Item>
      </Form>

      <ProList<CommentData.Comment>
        rowKey="id"
        tooltip="基础列表的配置"
        request={fetchFn}
        actionRef={actions}
        showActions="hover"
        showExtra="hover"
        pagination={{
          pageSize: 10,
          className: 'text-center'
        }}
        loading={loading}
        metas={{
          title: {
            dataIndex: 'userName',
          },
          avatar: {
            render: () => {
              return (
                <Image
                  style={{ height: 57, borderRadius: '50%' }}
                  src={userImg}
                />
              )
            }
          },
          description: {
            dataIndex: 'description',
            render: (_, record) => {
              return (
                <>
                  <p>{record.description}</p>
                  <p className="m-0">{dayjs.unix(record.startAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                </>
              )
            },
          },
          subTitle: {
            render: (_, record) => {
              return (
                <Space size={0}>
                  <Rate disabled allowHalf value={record.score} />
                </Space>
              );
            },
          },
          actions: {
            render: (text, record) => [
              record.uid === user?.id && <a target="_blank" rel="noopener noreferrer" key="link">
                删除
              </a>,
            ],
          },
        }}
      />
    </div>
  )
}

export default Comments