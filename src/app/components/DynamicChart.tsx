'use client';

import { GraphPopulationCompositionData } from '@/type/graphPopulationCompositionData';
import { LineChartData } from '@/type/lineChartData';
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
  data: GraphPopulationCompositionData[];
}

export const DynamicChart = ({ data }: DynamicChartProps) => {
  const getSelectedYearValue = (entry: GraphPopulationCompositionData, year: number) => {
    const selectedYearCompositionEntries = entry.data;
    const selectedYearCompositionEntry = selectedYearCompositionEntries.find(
      (compositionEntry) => compositionEntry.year === year,
    );
    return selectedYearCompositionEntry?.value;
  };

  const convertToGraphData = (data: GraphPopulationCompositionData[]) => {
    if (!data || data.length === 0) {
      return [];
    }
    const years = data[0].data.map((entry) => entry.year);
    return years.map((year) => {
      const oneYearData: LineChartData = {};

      const xAxisLabel = year.toString();
      oneYearData['year'] = xAxisLabel;

      data.forEach((entry) => {
        const prefName = entry.name;
        const value = getSelectedYearValue(entry, year);
        oneYearData[prefName] = value;
      });
      return oneYearData;
    });
  };

  const convertedData = convertToGraphData(data);
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={convertedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year' />
        <YAxis />
        <Tooltip />
        <Legend align='left' layout='horizontal' />
        {data.map((entry, key) => {
          const name = entry.name;
          const hue = (key / data.length) * 360;
          const color = 'hsl(' + hue + ', 100%, 50%)';
          return <Line key={key} type='monotone' dataKey={name} stroke={color} />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
