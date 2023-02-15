import { removeToken } from '@/http/token';
import { PoweroffOutlined } from '@ant-design/icons';
import { ProLayoutProps } from '@ant-design/pro-components';
import { Dropdown, Space } from 'antd';
export const actions: ProLayoutProps['actionsRender'] = properties => {
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
        <span>用户名</span>
      </Space>
    </Dropdown>
  ]
}
