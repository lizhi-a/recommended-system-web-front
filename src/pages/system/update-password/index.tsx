import { updatePassword } from '@/api/updatePwd';
import { useUserInfo } from '@/hooks/queries';
import { removeToken } from '@/http/token';
import regs from '@/utils/reg';
import { Button, Form, Input, notification, Typography } from 'antd';
import React from 'react';

const UpdatePwd: React.FC = () => {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [userInfo] = useUserInfo({ id: user?.id })

  const handleFinish = (values: UpdatePasswordParams.Update) => {
    if (userInfo) {
      return updatePassword({
        ...values,
        id: userInfo?.id,
      }).then(() => {
        notification.success({
          duration: 1,
          message: '修改成功，请重新登录',
          onClose: () => {
            removeToken();
            window.location.replace('/login')
          }
        })
      })
    }
  }

  return (
    <div className='mx-auto flex flex-col justify-center items-center' style={{ width: 400 }}>
      <Typography.Title level={4}>修改密码</Typography.Title>
      <Form
        layout='vertical'
        onFinish={handleFinish}
        labelAlign="left"
        className="w-full"
        form={form}
      >
        <Form.Item
          label="旧密码"
          name="oldPwd"
          required
        >
          <Input.Password className='w-full' />
        </Form.Item>
        <Form.Item
          name="newPwd"
          label="新密码"
          validateFirst
          rules={[
            { required: true },
            { min: 6, max: 16, message: '密码必须在6-16位之间' },
            { pattern: regs.onlyEnglishAndNumber, message: '由英文字母、数字、字母+数字组成' },
            {
              async validator(_, val) {
                if (val === form.getFieldValue('confirmPassword')) {
                  return true
                } else {
                  throw new Error('两次密码不一致')
                }
              },
            }
          ]}
        >
          <Input.Password
            autoComplete="new-password"
            placeholder="新密码"
            maxLength={16}
            onChange={() => form.validateFields()}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认密码"
          validateFirst
          rules={[
            {
              required: true,
            },
            {
              async validator(_, val) {
                if (val === form.getFieldValue('newPwd')) {
                  return true
                } else {
                  throw new Error('两次密码不一致')
                }
              }
            }
          ]}
        >
          <Input.Password
            autoComplete="cfm-password"
            placeholder="确认密码"
            maxLength={16}
            onChange={() => form.validateFields()}
          />
        </Form.Item>
        <Form.Item
        >
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdatePwd;
