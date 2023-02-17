import { removeToken } from '@/http/token';
import { PoweroffOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';

interface ProfileDropDownProps {
  userInfo?: UserInfo;
} 
export const ProfileDropDown: React.FC<ProfileDropDownProps> = (props) => {
  const { userInfo } = props;
  return (
    <Dropdown
      key='avatar'
      menu={{
        items: [
          {
            label: '退出登录',
            onClick: () => {
              removeToken();
              window.location.replace('/login')
            },
            key: 'logout',
            icon: <PoweroffOutlined />
          }
        ]
      }}
    >
      <Space>
        <Avatar src={userInfo?.photo} />
        <span>{userInfo?.realName}</span>
      </Space>
    </Dropdown>
  )
}

export default {};
