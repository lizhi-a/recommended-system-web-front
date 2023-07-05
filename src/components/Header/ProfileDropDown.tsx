import { logout } from '@/api/login';
import { removeToken } from '@/http/token';
import { PoweroffOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ProfileDropDownProps {
  userInfo?: UserData.User;
}
const ProfileDropDown: React.FC<ProfileDropDownProps> = (props) => {
  // const { userInfo } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || "")
  const navigate = useNavigate()

  return (
    <Dropdown
      key='avatar'
      menu={{
        items: [
          {
            key: 'information',
            label: '个人信息',
            icon: <UserOutlined />,
            onClick: () => {
              navigate('/system/personal-imformation')
            }
          },
          {
            key: 'update-password',
            label: '修改密码',
            icon: <UnlockOutlined />,
            onClick: () => {
              navigate('/system/update-password')
            }
          },
          {
            key: 'logout',
            label: '退出登录',
            icon: <PoweroffOutlined />,
            onClick: () => {
              if (userInfo?.userName) {
                logout({ userName: userInfo.userName }).finally(() => {
                  removeToken();
                  window.location.replace('/login')
                })
              }
            },
          }
        ]
      }}
    >
      <Space>
        <Avatar className='cursor-pointer' />
        <span className='text-white cursor-pointer'>{userInfo?.userName}</span>
      </Space>
    </Dropdown>
  )
}

export default ProfileDropDown;