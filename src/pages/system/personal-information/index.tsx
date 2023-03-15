import { useGlobal } from "@/contexts/global";
import { useUserInfo } from "@/hooks/queries";
import { Button, Descriptions, Tag } from "antd";

const personalInformation: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [userInfo, { refetch }] = useUserInfo({ id: user?.id })

  return (
    <div className="w-10/12 m-auto h-full p-6 bg-white">
      <div className="flex w-full justify-end">
        <Button type="primary">修改信息</Button>
      </div>
      <Descriptions title="个人信息" bordered contentStyle={{ maxWidth: 300 }}>
        <Descriptions.Item label="用户名">{userInfo?.userName}</Descriptions.Item>
        <Descriptions.Item label="密码">{userInfo?.password}</Descriptions.Item>
        <Descriptions.Item label="姓名">{userInfo?.name}</Descriptions.Item>
        <Descriptions.Item label="性别">{userInfo?.gender}</Descriptions.Item>
        <Descriptions.Item label="专业">{userInfo?.major}</Descriptions.Item>
        <Descriptions.Item label="标签">
          {
            userInfo?.label?.map(item => (
              <Tag>{item}</Tag>
            ))
          }
        </Descriptions.Item>
      </Descriptions>
    </div >
  )
}

export default personalInformation