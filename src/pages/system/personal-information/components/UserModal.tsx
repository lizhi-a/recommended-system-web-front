import regs from "@/utils/reg";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Form, Modal } from "antd";
import React, { useImperativeHandle, useRef, useState } from "react"

export type AddAdminModalValuesType = AdminParams.Create

type RefType = {
  show: (filledValue?: AddAdminModalValuesType) => void
}

interface AdminModalProps {
  btnText?: string;
  modalTitle?: string;
  isUpdate?: boolean;
  onShow?: () => void;
  onClose?: () => void;
  onOk?: (values: AddAdminModalValuesType) => Promise<any>;
  onDelete?: (values: AddAdminModalValuesType) => Promise<any>;
}

export function useAdminModal() {
  const ref = useRef<RefType>({
    show: () => { }
  });
  return ref
}

const AdminModal = React.forwardRef<RefType, AdminModalProps>((props, ref) => {
  const {
    onShow, onClose, onOk, modalTitle, isUpdate,
  } = props
  const [form] = Form.useForm()
  const [visible, toggleVisible] = useState<boolean>(false)
  const [okLoading, setOkLoading] = useState(false)

  const handleFinish = async (formValue: AddAdminModalValuesType) => {
    setOkLoading(true)
    onOk?.({
      ...formValue
    }).then(() => {
      form.resetFields()
      toggleVisible(false)
    }).finally(() => setOkLoading(false))
  }


  const handleClick = (filledValue?: AddAdminModalValuesType) => {
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
    show: (filledValue?: AddAdminModalValuesType) => {
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
      <ProForm<AddAdminModalValuesType>
        form={form}
        onFinish={handleFinish}
        submitter={false}
        layout="horizontal"
        labelAlign="right"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <ProFormText name="id" hidden />
        {
          !isUpdate && (
            <>
              <ProFormText
                label="账号"
                name="username"
                rules={[
                  { required: true },
                ]}
              />
              <ProFormText
                label="密码"
                name="pwd"
                rules={[
                  { required: true },
                  { min: 6, max: 16 },
                  { pattern: regs.onlyEnglishAndNumber, message: '仅支持英文字母或数字' }
                ]}
                placeholder="由6-16位英文字母、数字、字母+数字组成"
              />
            </>
          )
        }
        <ProFormText
          label="姓名"
          name="name"
          rules={[
            { required: true },
          ]}
        />
        <ProFormText
          label="联系方式"
          name="phone"
          rules={[
            { required: true },
            { pattern: regs.phone, message: '请输入正确的手机号' }
          ]}
        />
      </ProForm>
    </Modal>
  )
})

export default AdminModal