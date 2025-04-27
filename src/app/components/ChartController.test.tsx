import { compositionMapMock } from '../mock/compositionMapMock';
import { CheckboxData } from '../type/checkboxData';
import {
  createSelectedCompositionDataList,
  createSelectedLabelLineData,
  createSelectedPrefList,
} from './ChartController';

describe('ChartController', () => {
  test('createSelectedPrefList', async () => {
    const actual = createSelectedPrefList([1, 3], checkboxData);
    expect(actual[0].prefName).toBe('北海道');
    expect(actual[1].prefName).toBe('岩手県');
    expect(actual[0].prefCode).toBe(1);
    expect(actual[1].prefCode).toBe(3);
  });

  test('createSelectedCompositionDataList', async () => {
    const actual = createSelectedCompositionDataList('年少人口', [1, 3], compositionMapMock);
    expect(actual[0][0].value).toBe(1681479);
    expect(actual[0][1].value).toBe(1462123);
    expect(actual[1][0].value).toBe(501782);
    expect(actual[1][1].value).toBe(429521);
  });

  test('createSelectedLabelLineData', async () => {
    const { selectedLabelLineData, selectedPrefList } = createSelectedLabelLineData(
      '年少人口',
      [1, 3],
      compositionMapMock,
      checkboxData,
    );
    expect(selectedLabelLineData[0]['year']).toBe('1960');
    expect(selectedLabelLineData[0]['北海道']).toBe(1681479);
    expect(selectedLabelLineData[0]['岩手県']).toBe(501782);
    expect(selectedLabelLineData[1]['year']).toBe('1965');
    expect(selectedLabelLineData[1]['北海道']).toBe(1462123);
    expect(selectedLabelLineData[1]['岩手県']).toBe(429521);
    expect(selectedPrefList[0].prefName).toBe('北海道');
    expect(selectedPrefList[1].prefName).toBe('岩手県');
    expect(selectedPrefList[0].prefCode).toBe(1);
    expect(selectedPrefList[1].prefCode).toBe(3);
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
