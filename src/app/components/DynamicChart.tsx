'use client';

import styles from './DynamicChart.module.css';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { LineChartData } from '@/app/type/lineChartData';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';

interface DynamicChartProps {
  data: LineChartData[];
  prefNameList: string[];
}

export const DynamicChart = ({ data, prefNameList }: DynamicChartProps) => {
  const windowWidth = useWindowWidth();
  if (prefNameList.length === 0) {
    return;
  }

  interface LegendLayout {
    align: 'left' | 'right';
    layout: 'horizontal' | 'vertical';
    verticalAlign: 'top' | 'bottom';
  }

  const getLegendLayout = (): LegendLayout => {
    if (windowWidth < 480 || data.length >= 11) {
      return { align: 'left', layout: 'horizontal', verticalAlign: 'bottom' };
    }
    return { align: 'right', layout: 'vertical', verticalAlign: 'top' };
  };

  const createColors = () => {
    const colors1 = [...Array(16)].map((_, i) => {
      const hue = (i / 16) * 360;
      return `hsl(${hue}, 90%, 40%)`;
    });
    const colors2 = [...Array(16)].map((_, i) => {
      const hue = (i / 16) * 360;
      return `hsl(${hue}, 30%, 50%)`;
    });
    const colors3 = [...Array(16)].map((_, i) => {
      const hue = (i / 16) * 360;
      return `hsl(${hue}, 100%, 30%)`;
    });
    return [...colors1, ...colors2, ...colors3];
  };

  const legendLayout = getLegendLayout();
  const colors = createColors();
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year' />
        <YAxis />
        <Tooltip />
        <Legend
          className={styles.legend}
          align={legendLayout.align}
          layout={legendLayout.layout}
          verticalAlign={legendLayout.verticalAlign}
        />
        {prefNameList.map((name, key) => {
          return <Line key={key} type='monotone' dataKey={name} stroke={colors[key]} />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
