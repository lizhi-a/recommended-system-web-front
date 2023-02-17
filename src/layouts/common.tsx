import { removeToken } from '@/http/token';
import { PoweroffOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

interface ProfileDropDownProps {
  username?: string;
} 
export const ProfileDropDown: React.FC<ProfileDropDownProps> = ({ username }) => {
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
        <span>{username}</span>
      </Space>
    </Dropdown>
  )
}

export default {};
