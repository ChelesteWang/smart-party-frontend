// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import data from './data'
import './style.css'
// eslint-disable-next-line func-names
import Ring from './Ring'
import Score from './score'
import Detail from './detail'
import { Card } from 'antd';
export default function () {
  const ref = React.useRef(null)
  let graph = null
  G6.registerNode(
    'icon-node',
    {
      options: {
        size: [60, 20],
        stroke: '#ff7875',
        fill: '#ff7875',
      },
      draw(cfg, group) {
        const styles = this.getShapeStyle(cfg);
        const { labelCfg = {} } = cfg;

        const w = styles.width;
        const h = styles.height;

        const keyShape = group.addShape('rect', {
          attrs: {
            ...styles,
            x: -w / 2,
            y: -h / 2,
          },
        });

        // eslint-disable-next-line no-console
        console.log('cfg.leftIcon', cfg.leftIcon);
        if (cfg.leftIcon) {
          const { style } = cfg.leftIcon;
          group.addShape('rect', {
            attrs: {
              x: 1 - w / 2,
              y: 1 - h / 2,
              width: 38,
              height: styles.height - 2,
              fill: '#8c8c8c',
              ...style,
            },
          });

        }

        if (cfg.label) {
          group.addShape('text', {
            attrs: {
              ...labelCfg.style,
              text: cfg.label,
              x: 10 - w / 2,
              y: 25 - h / 2,
            },
          });
        }

        return keyShape;
      },
      update: undefined,
    },
    'rect',
  );

  G6.registerEdge('flow-line', {
    draw(cfg, group) {
      const { startPoint } = cfg;
      const { endPoint } = cfg;

      const { style } = cfg;
      const shape = group.addShape('path', {
        attrs: {
          stroke: style.stroke,
          endArrow: style.endArrow,
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, endPoint.y],
          ],
        },
      });

      return shape;
    },
  });

  const defaultStateStyles = {
    hover: {
      stroke: '#1890ff',
      lineWidth: 2,
    },
  };

  const defaultNodeStyle = {
    fill: '#ff7875',
    stroke: '#ff7875',
    radius: 5,
  };

  const defaultEdgeStyle = {
    stroke: '#ff7875',
    endArrow: {
      path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
      fill: '#ff7875',
      d: -20,
    },
  };

  const defaultLayout = {
    type: 'compactBox',
    direction: 'TB',
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 40;
    },
    getHGap: function getHGap() {
      return 70;
    },
  };

  const defaultLabelCfg = {
    style: {
      fill: '#000',
      fontSize: 12,
    },
  };

  const width = 650;
  const height = 300;

  // const minimap = new G6.Minimap({
  //   size: [150, 100],
  // });
  useEffect(() => {
    if (!graph) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.TreeGraph({
        container: ref.current,
        width,
        height,
        linkCenter: true,
        // plugins: [minimap],
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          type: 'icon-node',
          size: [120, 40],
          style: defaultNodeStyle,
          labelCfg: defaultLabelCfg,
        },
        defaultEdge: {
          type: 'flow-line',
          style: defaultEdgeStyle,
        },
        nodeStateStyles: defaultStateStyles,
        edgeStateStyles: defaultStateStyles,
        layout: defaultLayout,
      });
    }
    graph.data(data)
    graph.render()
    graph.fitView();
  }, [])

  const myData = [
    { type: "正式党员", percent: 0.56 },
    { type: "预备党员", percent: 0.3334 },
  ];

  const renderContent = (value) => {
    if (value !== undefined && value != null) {
      const scale = `${((Math.round((value * 10000))) / 100.00).toFixed(2)}%`;
      return scale;
    }
    return false
  };

  const myContent = {
    siteCode: "党员概况",
    title: "转正率",
    percent: renderContent(myData[0].percent),
  };

  const myData1 = [
    { type: "教师党员", percent: 0.26 },
    { type: "预备党员", percent: 0.74 },
  ];

  const myContent1 = {
    siteCode: "党员概况",
    title: "师生党员占比",
    percent: renderContent(myData1[0].percent)
  };

  return (
    <div>
      <div className='ring'><p className='title'>转正率</p><Ring
        data={myData}
        content={myContent}
      />
      </div>
      <div className='ring' style={{ marginLeft: 100 }}><p className='title'>师生党员占比</p><Ring
        data={myData1}
        content={myContent1}
        intervalConfig={{
          style: { fillOpacity: 0.6 },
          size: [
            "type",
            (type) => {
              return type === "已完成" ? 12 : 6;
            },
          ],
        }}
      />
      </div>
      <Detail></Detail>
      <br style={{ clear: 'both', }} />
      <div className='score'><p className='title'>积分统计图</p><Score></Score></div>
      <div ><p className='title'>党组织结构图</p>
        <div className='g6' ref={ref} /></div>
    </div>
  );
}

