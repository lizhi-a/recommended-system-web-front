import { Typography } from "antd"

const DescriptionItem: React.FC = (props) => {
  const { title, }
  return (
    <div>
      <Typography.Title level={2}>{props.title}</Typography.Title>
      <div>
        {dom}
      </div>
    </div>
  )
}

export default DescriptionItem