import { CheckboxData } from '@/type/checkboxData';
import { usePopulationComposition } from './usePopulationComposition';
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { PopulationCompositionPerYearResponse } from '@/type/populationCompositionPerYearResponse';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const queryString = url.split('?')[1];
    const searchParams = new URLSearchParams(queryString);
    const prefCode = searchParams.get('prefCode');
    const response = getPopulationCompositionResponseFromPrefCode(prefCode);
    return Promise.resolve({
      json: () => Promise.resolve(response),
    });
  }) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('usePopulationComposition', () => {
  test('add 1data', async () => {
    const { result } = renderHook(() => usePopulationComposition());
    const [updateCheckState, _1] = result.current;
    act(() => {
      updateCheckState(1, checkboxData);
    });
    await waitFor(() => {
      const [_2, compositionList] = result.current;
      expect(compositionList?.length).toBe(1);
      const firstElement = compositionList?.[0];
      expect(firstElement?.boundaryYear).toBe(2020);
      expect(firstElement?.data[0].data[0].year).toBe(1960);
      expect(firstElement?.data[0].data[0].value).toBe(5039206);
    });
  });

  test('add and delete data', async () => {
    const { result } = renderHook(() => usePopulationComposition());
    const [updateCheckState, _1] = result.current;
    act(() => {
      updateCheckState(1, checkboxData);
      checkboxData[2].checked = true;
      updateCheckState(3, checkboxData);
    });
    await waitFor(() => {
      const [_2, compositionList] = result.current;
      expect(compositionList?.length).toBe(2);
      const secondElement = compositionList?.[1];
      expect(secondElement?.boundaryYear).toBe(2020);
      expect(secondElement?.data[0].data[1].year).toBe(1965);
      expect(secondElement?.data[0].data[1].value).toBe(1411118);
    });
    act(() => {
      checkboxData[2].checked = false;
      updateCheckState(1, checkboxData);
    });
    await waitFor(() => {
      const [_2, compositionList] = result.current;
      expect(compositionList?.length).toBe(1);
      const firstElement = compositionList?.[0];
      expect(firstElement?.boundaryYear).toBe(2020);
      expect(firstElement?.data[0].data[0].year).toBe(1960);
      expect(firstElement?.data[0].data[0].value).toBe(5039206);
    });
  });
});

const checkboxData: CheckboxData[] = [
  {
    prefCode: 1,
    prefName: '北海道',
    checked: true,
  },
  {
    prefCode: 2,
    prefName: '青森県',
    checked: false,
  },
  {
    prefCode: 3,
    prefName: '岩手県',
    checked: false,
  },
];

const getPopulationCompositionResponseFromPrefCode = (
  prefCode: string | null,
): PopulationCompositionPerYearResponse => {
  const prefCodeNumber = Number(prefCode);
  switch (prefCodeNumber) {
    case 1:
      return {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                {
                  year: 1960,
                  value: 5039206,
                },
                {
                  year: 1965,
                  value: 5171800,
                },
              ],
            },
          ],
        },
      };
    case 2:
      return {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                {
                  year: 1960,
                  value: 1426606,
                },
                {
                  year: 1965,
                  value: 1416591,
                },
              ],
            },
          ],
        },
      };
    case 3:
      return {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                {
                  year: 1960,
                  value: 1448517,
                },
                {
                  year: 1965,
                  value: 1411118,
                },
              ],
            },
          ],
        },
      };
    default:
      return {
        message: null,
        result: {
          boundaryYear: 9999,
          data: [
            {
              label: 'default',
              data: [
                {
                  year: -1,
                  value: -1,
                },
              ],
            },
          ],
        },
      };
  }
};
