import { AllCoursesType } from "@/constants";
import regs from "@/utils/reg";
import { ProForm, ProFormRadio, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Form, Modal } from "antd";
import React, { useImperativeHandle, useRef, useState } from "react"

export type AddUserModalValuesType = UserData.User

type RefType = {
  show: (filledValue?: AddUserModalValuesType) => void
}

interface UserModalProps {
  btnText?: string;
  modalTitle?: string;
  isUpdate?: boolean;
  onShow?: () => void;
  onClose?: () => void;
  onOk?: (values: UserParams.Update) => Promise<any>;
  onDelete?: (values: AddUserModalValuesType) => Promise<any>;
}

export function useUserModal() {
  const ref = useRef<RefType>({
    show: () => { }
  });
  return ref
}

const UserModal = React.forwardRef<RefType, UserModalProps>((props, ref) => {
  const {
    onShow, onClose, onOk, modalTitle, isUpdate,
  } = props
  const [form] = Form.useForm()
  const [visible, toggleVisible] = useState<boolean>(false)
  const [okLoading, setOkLoading] = useState(false)

  const handleFinish = async (formValue: AddUserModalValuesType) => {
    const { label, ...rest } = formValue

    setOkLoading(true)
    onOk?.({
      label: label.join('、'),
      ...rest
    }).then(() => {
      form.resetFields()
      toggleVisible(false)
    }).finally(() => setOkLoading(false))
  }


  const handleClick = (filledValue?: AddUserModalValuesType) => {
    onShow?.()
    if (filledValue) {
      form.setFieldsValue({
        ...filledValue
      })
    }
    toggleVisible(true)
  }

  const handleCancel = () => {
    onClose?.();
    toggleVisible(false);
    form.resetFields();
  }

  const handleOk = () => {
    form.submit();
  }


  useImperativeHandle(ref, () => ({
    show: (filledValue?: AddUserModalValuesType) => {
      handleClick(filledValue)
    }
  }))

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      title={modalTitle || 'modalTitle'}
      okButtonProps={{
        loading: okLoading
      }}
      width={600}
    >
      <ProForm<AddUserModalValuesType>
        form={form}
        onFinish={handleFinish}
        submitter={false}
        layout="horizontal"
        labelAlign="right"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <ProFormText name="id" hidden />
        <ProFormText
          label="账号"
          name="userName"
          disabled
        />
        <ProFormText
          label="密码"
          name="password"
          disabled
        />
        <ProFormText
          label="姓名"
          name="name"
          rules={[
            { required: true },
          ]}
        />
        <ProFormRadio.Group
          label="性别"
          name="gender"
          rules={[
            { required: true },
          ]}
          options={[
            {
              label: '男',
              value: '男',
            },
            {
              label: '女',
              value: '女',
            },
          ]}
        />
        <ProFormText
          label="专业"
          name="major"
          rules={[
            { required: true },
          ]}
        />
        <ProFormSelect
          label="标签"
          name="label"
          mode="multiple"
          options={AllCoursesType.map(item => ({
            label: item,
            value: item,
          }))}
        />
      </ProForm>
    </Modal>
  )
})

export default UserModal