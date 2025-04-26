'use client';

import styles from './ChartController.module.css';
import { CheckboxData } from '@/app/type/checkboxData';
import { PopulationCompositionEntry } from '@/app/type/populationCompositionEntry';
import { PopulationCompositionPerYear } from '@/app/type/populationCompositionPerYear';
import { useState } from 'react';
import { DynamicChart } from './DynamicChart';
import { LineChartData } from '../type/lineChartData';

interface ChartControllerProps {
  checkboxData: CheckboxData[];
  compositionMap: Map<number, PopulationCompositionPerYear>;
  checkedPrefCodeList: number[];
}

export const ChartController = ({
  checkboxData,
  compositionMap,
  checkedPrefCodeList,
}: ChartControllerProps) => {
  const PopulationCompositionLabel = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const;
  const [selectedLabel, setSelectedLabel] =
    useState<(typeof PopulationCompositionLabel)[number]>('総人口');

  if (!checkboxData || !compositionMap) {
    return <div>Loading...</div>;
  }

  const createSelectedPrefNameList = (
    checkedPrefCodeList: number[],
    checkboxData: CheckboxData[],
  ): string[] => {
    return checkedPrefCodeList.map((prefCode) => {
      const prefName = checkboxData.find((item) => item.prefCode === prefCode)?.prefName || '';
      return prefName;
    });
  };

  const createSelectedCompositionDataList = (
    checkedPrefCodeList: number[],
    compositionMap: Map<number, PopulationCompositionPerYear>,
  ): PopulationCompositionEntry[][] => {
    return checkedPrefCodeList.map((prefCode) => {
      const compositionData = compositionMap.get(prefCode) as PopulationCompositionPerYear;
      const selectedLabelCompositionData = compositionData.data.find(
        (item) => item.label === selectedLabel,
      )?.data as PopulationCompositionEntry[];
      return selectedLabelCompositionData;
    });
  };

  const createSelectedLabelLineData = (
    checkboxData: CheckboxData[],
    compositionMap: Map<number, PopulationCompositionPerYear>,
    checkedPrefCodeList: number[],
  ) => {
    if (checkedPrefCodeList.length === 0) {
      return [];
    }
    const selectedPrefNameList = createSelectedPrefNameList(checkedPrefCodeList, checkboxData);
    const selectedCompositionDataList = createSelectedCompositionDataList(
      checkedPrefCodeList,
      compositionMap,
    );
    const years = selectedCompositionDataList[0].map((entry) => entry.year);

    const selectedLabelLineData = years.map((year, yearIndex) => {
      const oneYearSelectedLabelLineData: LineChartData = {};
      const xAxisLabel = year.toString();
      oneYearSelectedLabelLineData['year'] = xAxisLabel;

      selectedPrefNameList.forEach((prefName, prefIndex) => {
        const entry = selectedCompositionDataList[prefIndex][yearIndex];
        oneYearSelectedLabelLineData[prefName] = entry.value;
      });
      return oneYearSelectedLabelLineData;
    });
    return selectedLabelLineData;
  };

  const selectedLabelLineData = createSelectedLabelLineData(
    checkboxData,
    compositionMap,
    checkedPrefCodeList,
  );

  return (
    <div className={styles.mainDiv}>
      <div className={styles.buttonArea}>
        {PopulationCompositionLabel.map((label, key) => (
          <button className={styles.button} key={key} onClick={() => setSelectedLabel(label)}>
            {label}
          </button>
        ))}
      </div>
      <DynamicChart data={selectedLabelLineData} />
    </div>
  );
};
