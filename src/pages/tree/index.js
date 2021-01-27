// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import data from './data'
// eslint-disable-next-line func-names
export default function () {
  const ref = React.useRef(null)
  let graph = null
  G6.registerNode(
    'icon-node',
    {
      options: {
        size: [60, 20],
        stroke: '#91d5ff',
        fill: '#91d5ff',
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
    fill: '#91d5ff',
    stroke: '#40a9ff',
    radius: 5,
  };

  const defaultEdgeStyle = {
    stroke: '#91d5ff',
    endArrow: {
      path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
      fill: '#91d5ff',
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

  const width = 1000;
  const height = 500;

  const minimap = new G6.Minimap({
    size: [150, 100],
  });
  useEffect(() => {
    if (!graph) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.TreeGraph({
        container: ref.current,
        width,
        height,
        linkCenter: true,
        plugins: [minimap],
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

  return (
    <div ref={ref}></div>
  );
}