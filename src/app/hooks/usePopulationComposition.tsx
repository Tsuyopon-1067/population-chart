'use client';

import { CheckboxData } from '@/app/type/checkboxData';
import { PopulationCompositionPerYear } from '@/app/type/populationCompositionPerYear';
import { PopulationCompositionPerYearResponse } from '@/app/type/populationCompositionPerYearResponse';
import { useState } from 'react';
import { fetchHelper } from '../lib/fetchHelper';

type UsePopulationCompositionReturnType = [
  (prefCode: number, checkboxData: CheckboxData[]) => Promise<void>,
  Map<number, PopulationCompositionPerYear>,
  number[],
];

export const usePopulationComposition = (): UsePopulationCompositionReturnType => {
  const [compositionMap, setCompositionMap] = useState<Map<number, PopulationCompositionPerYear>>(
    () => new Map<number, PopulationCompositionPerYear>(),
  );
  const [checkedPrefCodeList, setCheckedPrefCodeList] = useState<number[]>([]);

  const fetchPopulationComposition = async (
    prefCode: number,
  ): Promise<PopulationCompositionPerYear> => {
    return fetchHelper(`/api/v1/population/composition/perYear?prefCode=${prefCode}`)
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
