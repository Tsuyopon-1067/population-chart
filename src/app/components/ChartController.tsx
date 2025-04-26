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

const PopulationCompositionLabel = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const;

export const ChartController = ({
  checkboxData,
  compositionMap,
  checkedPrefCodeList,
}: ChartControllerProps) => {
  const [selectedLabel, setSelectedLabel] =
    useState<(typeof PopulationCompositionLabel)[number]>('総人口');

  const isDisabled = !checkboxData || !compositionMap || checkedPrefCodeList.length === 0;

  const { selectedLabelLineData, selectedPrefNameList } = createSelectedLabelLineData(
    selectedLabel,
    checkedPrefCodeList,
    compositionMap,
    checkboxData,
  );

  return (
    <div className={styles.mainDiv}>
      <div className={styles.buttonArea}>
        {PopulationCompositionLabel.map((label, key) => (
          <button
            className={styles.button}
            key={key}
            onClick={() => setSelectedLabel(label)}
            disabled={isDisabled}
          >
            {label}
          </button>
        ))}
      </div>
      <DynamicChart data={selectedLabelLineData} prefNameList={selectedPrefNameList} />
    </div>
  );
};

export const createSelectedPrefNameList = (
  checkedPrefCodeList: number[],
  checkboxData: CheckboxData[],
): string[] => {
  return checkedPrefCodeList.map((prefCode) => {
    const prefName = checkboxData.find((item) => item.prefCode === prefCode)?.prefName || '';
    return prefName;
  });
};

export const createSelectedCompositionDataList = (
  selectedLabel: (typeof PopulationCompositionLabel)[number],
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

export const createSelectedLabelLineData = (
  selectedLabel: (typeof PopulationCompositionLabel)[number],
  checkedPrefCodeList: number[],
  compositionMap: Map<number, PopulationCompositionPerYear>,
  checkboxData: CheckboxData[],
): { selectedLabelLineData: LineChartData[]; selectedPrefNameList: string[] } => {
  if (checkedPrefCodeList.length === 0) {
    return { selectedLabelLineData: [], selectedPrefNameList: [] };
  }
  const selectedPrefNameList = createSelectedPrefNameList(checkedPrefCodeList, checkboxData);
  const selectedCompositionDataList = createSelectedCompositionDataList(
    selectedLabel,
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
  return { selectedLabelLineData, selectedPrefNameList };
};
