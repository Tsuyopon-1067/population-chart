import { CheckboxData } from '@/type/checkboxData';
import { usePopulationComposition } from './usePopulationComposition';
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(populationCompositionResponseHokaido),
    }),
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('usePopulationComposition', () => {
  test('check and add data', async () => {
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
    checked: true,
  },
];

const populationCompositionResponseHokaido = {
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
