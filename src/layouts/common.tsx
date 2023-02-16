import { useMe } from '@/hooks/queries';
import { removeToken } from '@/http/token';
import { PoweroffOutlined } from '@ant-design/icons';
import { ProLayoutProps } from '@ant-design/pro-components';
import { Dropdown, Space } from 'antd';
export const actions: ProLayoutProps['actionsRender'] = properties => {
  const [myInfo] = useMe()
  return [
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
        <span>{myInfo?.username}</span>
      </Space>
    </Dropdown>
  ]
}
