import { useAllQuestionsType, useUserQuestionsListAndScore } from "@/hooks/queries"
import { List } from "antd"
import { useNavigate } from "react-router-dom"
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";

function getEchartsOption(props: { originData: QuestionsAnalysis[] }) {
  const { originData } = props
  const seriesData = originData.map(item => item.score)
  const indicator = originData.map(item => ({
    name: item.qType,
    max: 100,
  }))

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    radar: [
      {
        indicator: indicator,
        center: ['25%', '40%'],
        radius: 80
      },
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {
          color: '#C6E5FF'
        },
        data: [
          {
            value: seriesData,
            name: '测评分数'
          }
        ]
      },
    ]
  };
  return option
}

const SelfTest: React.FC = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo') || '')
  const [allQuestionsType, { refetch: refetchAllQuestionsType }] = useAllQuestionsType({ uid: user.id })
  const [questionsAnalysis, { refetch }] = useUserQuestionsListAndScore({ uid: user.id })
  const [option, setOption] = useState({});

  useEffect(() => {
    if (questionsAnalysis) {
      setOption(getEchartsOption({ originData: questionsAnalysis }))
    }
  }, [questionsAnalysis])

  useEffect(() => {
    refetch()
    refetchAllQuestionsType()
  }, [])
  return (
    <>
      <div>
        <h3>能力雷达图</h3>
        <div className="flex justify-center">
          <div className="w-3/6">
            <ReactECharts option={option} />
          </div>
          <div className="w-1/6 mt-4 text-gray-400">
            {
              questionsAnalysis?.map(item => (
                <p key={item.qType}>{item.qType}: {item.score}分</p>
              ))
            }
          </div>
        </div>
      </div>
      <List
        bordered
        header={<h2>测试题目集</h2>}
        dataSource={allQuestionsType}
        renderItem={(item) => (
          <List.Item
            className="p-6 cursor-pointer nroad-clicked-ant-table-row"
            onClick={() => { navigate(`/self-test/${item}`) }}
          >
            <div className="flex justify-between w-full">
              <span>{item}-测试题</span>
              <a onClick={() => { navigate(`/self-test/${item}`) }}>查看详情 &gt;</a>
            </div>
          </List.Item>
        )
        }
        className="bg-white"
      />
    </>
  )
}

export default SelfTest