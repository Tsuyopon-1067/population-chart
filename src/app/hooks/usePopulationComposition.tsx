'use client';

import { CheckboxData } from '@/type/checkboxData';
import { PopulationCompositionPerYear } from '@/type/populationCompositionPerYear';
import { PopulationCompositionPerYearResponse } from '@/type/populationCompositionPerYearResponse';
import { useState } from 'react';

export const usePopulationComposition = (): [
  (prefCode: number, checkboxData: CheckboxData[]) => Promise<void>,
  Map<number, PopulationCompositionPerYear>,
  number[],
] => {
  const [compositionMap, setCompositionMap] = useState<Map<number, PopulationCompositionPerYear>>(
    () => new Map<number, PopulationCompositionPerYear>(),
  );
  const [checkedPrefCodeList, setCheckedPrefCodeList] = useState<number[]>([]);

  const fetchPopulationComposition = async (
    prefCode: number,
  ): Promise<PopulationCompositionPerYear> => {
    return fetch(`/api/v1/population/composition/perYear?prefCode=${prefCode}`)
      .then((response) => response.json())
      .then((data) => {
        const response = data as PopulationCompositionPerYearResponse;
        return response.result;
      })
      .catch((error) => {
        console.error('Error fetching population composition data:', error);
        throw error;
      });
  };

  const updateCompositionMap = async (prefCode: number) => {
    if (compositionMap.has(prefCode)) {
      return;
    }
    await fetchPopulationComposition(prefCode).then((response) => {
      const newCompositionMap = new Map(compositionMap);
      newCompositionMap.set(prefCode, response);
      setCompositionMap(newCompositionMap);
    });
  };

  const updateCheckedPrefCodeList = async (checkboxData: CheckboxData[]) => {
    const newCheckedPrefCodeList = checkboxData
      .map((data) => {
        if (data.checked) {
          return data.prefCode;
        }
      })
      .filter((item) => item !== null && item !== undefined);
    setCheckedPrefCodeList(newCheckedPrefCodeList);
  };

  const updateCheckState = async (prefCode: number, checkboxData: CheckboxData[]) => {
    await updateCompositionMap(prefCode);
    updateCheckedPrefCodeList(checkboxData);
  };

  return [updateCheckState, compositionMap, checkedPrefCodeList];
};
