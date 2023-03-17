import { AppstoreFilled } from "@ant-design/icons";
import { Space, Typography } from "antd"
interface DescriptionItemProps {
  title?: string;
  children?: React.ReactNode;
}

const DescriptionItem: React.FC<DescriptionItemProps> = (props) => {
  const { title, children } = props

  return (
    <div className="mb-6">
      <Typography.Title level={3}>
        <Space>
          <AppstoreFilled className="text-emerald-400" />
          {title}
        </Space>
      </Typography.Title>
      <div className="text-gray-500" style={{ textIndent: '2rem' }}>
        {children}
      </div>
    </div>
  )
}

export default DescriptionItem