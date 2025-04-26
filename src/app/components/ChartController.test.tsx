import { compositionMapMock } from '../mock/compositionMapMock';
import { CheckboxData } from '../type/checkboxData';
import {
  createSelectedCompositionDataList,
  createSelectedLabelLineData,
  createSelectedPrefNameList,
} from './ChartController';

describe('ChartController', () => {
  test('createSelectedPrefNameList', async () => {
    const actual = createSelectedPrefNameList([1, 3], checkboxData);
    expect(compareArrays(actual, ['北海道', '岩手県'])).toBe(true);
  });

  test('createSelectedCompositionDataList', async () => {
    const actual = createSelectedCompositionDataList('年少人口', [1, 3], compositionMapMock);
    expect(actual[0][0].value).toBe(1681479);
    expect(actual[0][1].value).toBe(1462123);
    expect(actual[1][0].value).toBe(501782);
    expect(actual[1][1].value).toBe(429521);
  });

  test('createSelectedLabelLineData', async () => {
    const actual = createSelectedLabelLineData(
      '年少人口',
      [1, 3],
      compositionMapMock,
      checkboxData,
    );
    expect(actual[0]['year']).toBe('1960');
    expect(actual[0]['北海道']).toBe(1681479);
    expect(actual[0]['岩手県']).toBe(501782);
    expect(actual[1]['year']).toBe('1965');
    expect(actual[1]['北海道']).toBe(1462123);
    expect(actual[1]['岩手県']).toBe(429521);
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

const compareArrays = <T,>(a: T[], b: T[]) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};
