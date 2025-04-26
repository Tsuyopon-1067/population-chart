import { PopulationCompositionPerYearResponse } from '../type/populationCompositionPerYearResponse';
import { PrefecturesResponse } from '../type/prefecturesResponse';

export const fetchHelper = async (
  resource: string,
): Promise<PopulationCompositionPerYearResponse | PrefecturesResponse> => {
  const API_KEY = process.env.NEXT_PUBLIC_YUMEMI_API_KEY;
  const BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app';

  return await fetch(`${BASE_URL}${resource}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY || '',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(`Error fetching data from ${resource}:`, error);
      throw error;
    });
};
