import { logout } from '@/api/login';
import { removeToken } from '@/http/token';
import { PoweroffOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';

interface ProfileDropDownProps {
  userInfo?: UserInfo;
} 
const ProfileDropDown: React.FC<ProfileDropDownProps> = (props) => {
  const { userInfo } = props;
  return (
    <Dropdown
      key='avatar'
      menu={{
        items: [
          {
            label: '退出登录',
            onClick: () => {
              if (userInfo?.username) {
                logout({ userName: userInfo.username}).finally(() => {
                  removeToken();
                  window.location.replace('/login')
                })
              }
            },
            key: 'logout',
            icon: <PoweroffOutlined />
          }
        ]
      }}
    >
      <Space>
        <Avatar className='cursor-pointer' src={userInfo?.photo} />
        <span className='text-white cursor-pointer'>{userInfo?.realName}</span>
      </Space>
    </Dropdown>
  )
}

export default ProfileDropDown;