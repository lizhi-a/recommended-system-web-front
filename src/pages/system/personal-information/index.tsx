import { updateUserInfo } from "@/api/system";
import { useUserInfo } from "@/hooks/queries";
import { Button, Descriptions, notification, Tag } from "antd";
import UserModal, { useUserModal } from "./components/UserModal";

const personalInformation: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [userInfo, { refetch }] = useUserInfo({ id: user?.id })
  const updateUserModalRef = useUserModal()

  const handleUserModalOk = (values: UserParams.Update) => {
    return updateUserInfo(values).then(() => {
      notification.success({
        message: '修改成功'
      })
      refetch()
    })
  }

  return (
    <>
      <div className="w-10/12 m-auto h-full p-6 bg-white">
        <div className="flex w-full justify-end">
          <Button type="primary" onClick={() => updateUserModalRef.current.show(userInfo)}>修改信息</Button>
        </div>
        <Descriptions title="个人信息" bordered contentStyle={{ maxWidth: 300 }}>
          <Descriptions.Item label="用户名">{userInfo?.userName}</Descriptions.Item>
          <Descriptions.Item label="密码">{userInfo?.password}</Descriptions.Item>
          <Descriptions.Item label="姓名">{userInfo?.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{userInfo?.gender}</Descriptions.Item>
          <Descriptions.Item label="专业">{userInfo?.major}</Descriptions.Item>
          <Descriptions.Item label="学科领域">
            {
              userInfo?.label?.map(item => (
                <Tag key={item}>{item}</Tag>
              ))
            }
          </Descriptions.Item>
          <Descriptions.Item label="兴趣标签">
            {
              userInfo?.custom_label?.map(item => (
                <Tag key={item}>{item}</Tag>
              ))
            }
          </Descriptions.Item>
        </Descriptions>
      </div >

      <UserModal modalTitle="更新用户信息" ref={updateUserModalRef} onOk={handleUserModalOk} />
    </>
  )
}

export default personalInformation