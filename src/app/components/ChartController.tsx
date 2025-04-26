'use client';

import styles from './ChartController.module.css';
import { CheckboxData } from '@/app/type/checkboxData';
import { GraphPopulationCompositionData } from '@/app/type/graphPopulationCompositionData';
import { PopulationCompositionEntry } from '@/app/type/populationCompositionEntry';
import { PopulationCompositionLabel } from '@/app/type/populationCompositionLabel';
import { PopulationCompositionPerYear } from '@/app/type/populationCompositionPerYear';
import { useState } from 'react';
import { DynamicChart } from './DynamicChart';

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

  const extractSelectedLabelData = (
    prefCode: number,
    selectedLabel: PopulationCompositionLabel,
  ): PopulationCompositionEntry[] => {
    const compositionData = compositionMap.get(prefCode) as PopulationCompositionPerYear;
    const selectedLabelData = compositionData.data.find((item) => item.label === selectedLabel)
      ?.data as PopulationCompositionEntry[];
    return selectedLabelData;
  };

  const displayedData: GraphPopulationCompositionData[] = checkedPrefCodeList.map((prefCode) => {
    const prefName = checkboxData.find((item) => item.prefCode === prefCode)?.prefName || '';
    const selectedLabelData = extractSelectedLabelData(prefCode, selectedLabel);
    return {
      name: prefName,
      data: selectedLabelData,
    };
  });

  return (
    <div className={styles.mainDiv}>
      <div className={styles.buttonArea}>
        {PopulationCompositionLabel.map((label, key) => (
          <button className={styles.button} key={key} onClick={() => setSelectedLabel(label)}>
            {label}
          </button>
        ))}
      </div>
      <DynamicChart data={displayedData} />
    </div>
  );
};
