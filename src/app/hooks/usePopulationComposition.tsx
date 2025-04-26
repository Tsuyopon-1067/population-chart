import { CheckboxData } from '@/type/checkboxData';
import { PopulationCompositionPerYear } from '@/type/populationCompositionPerYear';
import { PopulationCompositionPerYearResponse } from '@/type/populationCompositionPerYearResponse';
import { useState } from 'react';

export const usePopulationComposition = (): [
  (prefCode: number, checkboxData: CheckboxData[]) => Promise<void>,
  PopulationCompositionPerYear[] | undefined,
] => {
  const compositionCache = new Map<number, PopulationCompositionPerYear>();
  const [compositionList, setCompositionList] = useState<PopulationCompositionPerYear[]>();

  const fetchPopulationComposition = async (prefCode: number) => {
    fetch(`/api/v1/population/composition/perYear?prefCode=${prefCode}`)
      .then((response) => response.json())
      .then((data) => {
        const response = data as PopulationCompositionPerYearResponse;
        compositionCache.set(prefCode, response.result);
      })
      .catch((error) => console.error('Error fetching population composition data:', error));
  };

  const updateCache = async (prefCode: number) => {
    if (!compositionCache.has(prefCode)) {
      await fetchPopulationComposition(prefCode);
    }
  };

  const createNewCompositionList = (
    checkboxData: CheckboxData[],
  ): PopulationCompositionPerYear[] => {
    return checkboxData
      .map((data) => {
        if (data.checked) {
          const composition = compositionCache.get(data.prefCode);
          return composition as PopulationCompositionPerYear;
        }
      })
      .filter((item) => item !== null && item !== undefined);
  };

  const updateCheckState = async (prefCode: number, checkboxData: CheckboxData[]) => {
    await updateCache(prefCode);
    const newCompositionList = createNewCompositionList(checkboxData);
    setCompositionList(newCompositionList);
  };

  return [updateCheckState, compositionList];
};
