'use client';

import styles from './ChartController.module.css';
import { CheckboxData } from '@/app/type/checkboxData';
import { PopulationCompositionEntry } from '@/app/type/populationCompositionEntry';
import { PopulationCompositionPerYear } from '@/app/type/populationCompositionPerYear';
import { useState } from 'react';
import { DynamicChart } from './DynamicChart';
import { LineChartData } from '../type/lineChartData';
import { Prefecture } from '../type/prefecture';

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

  const { selectedLabelLineData, selectedPrefList } = createSelectedLabelLineData(
    selectedLabel,
    checkedPrefCodeList,
    compositionMap,
    checkboxData,
  );

  const getButtonClass = (label: string, selectedLabel: string, isDisabled: boolean) => {
    const isAvailable = !isDisabled;
    if (label === selectedLabel && isAvailable) {
      return `${styles.selectedButton} ${styles.button}`;
    }
    return `${styles.button}`;
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.buttonArea}>
        {PopulationCompositionLabel.map((label, key) => (
          <button
            className={getButtonClass(label, selectedLabel, isDisabled)}
            key={key}
            onClick={() => setSelectedLabel(label)}
            disabled={isDisabled}
          >
            {label}
          </button>
        ))}
      </div>
      <DynamicChart data={selectedLabelLineData} prefList={selectedPrefList} />
    </div>
  );
};

export const createSelectedPrefList = (
  checkedPrefCodeList: number[],
  checkboxData: CheckboxData[],
): Prefecture[] => {
  return checkedPrefCodeList.map((prefCode) => {
    const prefName = checkboxData.find((item) => item.prefCode === prefCode)?.prefName || '';
    return { prefName: prefName, prefCode };
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
): { selectedLabelLineData: LineChartData[]; selectedPrefList: Prefecture[] } => {
  if (checkedPrefCodeList.length === 0) {
    return { selectedLabelLineData: [], selectedPrefList: [] };
  }
  const selectedPrefList = createSelectedPrefList(checkedPrefCodeList, checkboxData);
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

    selectedPrefList.forEach((pref, prefIndex) => {
      const entry = selectedCompositionDataList[prefIndex][yearIndex];
      oneYearSelectedLabelLineData[pref.prefName] = entry.value;
    });
    return oneYearSelectedLabelLineData;
  });
  return { selectedLabelLineData, selectedPrefList };
};
