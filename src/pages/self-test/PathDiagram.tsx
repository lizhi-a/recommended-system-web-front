import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import { G6GraphEvent } from '@antv/g6';
import { useNavigate } from 'react-router-dom';

interface PathDiagramProps {
  pathCourse?: CoursePath[];
  courseDependence?: CourseDependence[];
}

export default function PathDiagram(props: PathDiagramProps) {
  const ref = React.useRef(null);
  const { pathCourse, courseDependence } = props
  const navigate = useNavigate()
  const data = useMemo(() => ({
    nodes: pathCourse?.map(item => ({
      id: item.cid,
      label: item.description,
      info: item.label,
      score: item.score,
      style: null,
    })),
    edges: courseDependence
  }), [pathCourse, courseDependence])
  let graph: any = null

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 1200,
        height: 500,
        fitView: true,
        animate: true,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'UL',
          controlPoints: true,
          nodesepFunc: () => 1,
          ranksepFunc: () => 1,
        },
        defaultNode: {
          type: 'ellipse',
          size: [120, 50],
          // size: '',
          style: {
            lineWidth: 2,
            stroke: '#c4e3ff',
            fill: '#C6E5FF',
          },
          labelCfg: {           // 标签配置属性
            positions: 'center',// 标签的属性，标签在元素中的位置
            style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
              fontSize: 14      // 标签的样式属性，文字字体大小
              // ...            // 标签的其他样式属性
            }
          }
        },
        defaultEdge: {
          type: 'polyline',
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2',
            },
            radius: 20,
          },
        },
      });

      graph.on('node:click', (e: G6GraphEvent) => {
        if (e?.item?._cfg?.model?.info) {
          navigate(`/course-detail/${e?.item?._cfg?.model?.id}`)
        }
      });
      const nodes: any = data.nodes;
      nodes?.forEach((node) => {
        if (!node.style) {
          node.style = {};
        }
        if (node.score === -1) {
          node.style.fill = '#C6E5FF'
          node.style.stroke = '#C6E5FF'
        }
        else if (node.score >= 0 && node.score < 60) {
          node.style.fill = '#ffc2c2'
          node.style.stroke = '#ffc2c2'
        }
        else if (node.score >= 60 && node.score < 75) {
          node.style.fill = '#ffdab6'
          node.style.stroke = '#ffdab6'
        }
        else if (node.score >= 75 && node.score < 90) {
          node.style.fill = '#fff3c4'
          node.style.stroke = '#fff3c4'
        }
        else if (node.score >= 90) {
          node.style.fill = '#c7fccd'
          node.style.stroke = '#c7fccd'
        }
        else {
          node.style.fill = '#e4e4e4'
          node.style.stroke = '#e4e4e4'
        }

      })
      graph.data(data)
      graph.render()
    }
    return () => {
      graph.destroy()
      graph = null
    }
  }, [data])

  return <div ref={ref}></div>;
}