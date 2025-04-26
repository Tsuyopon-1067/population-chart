'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Prefecture } from '@/app/type/prefecture';
import { PrefecturesResponse } from '@/app/type/prefecturesResponse';
import { Checkboxes } from './components/Checkboxes';
import { CheckboxData } from '@/app/type/checkboxData';
import { usePopulationComposition } from './hooks/usePopulationComposition';
import { GraphArea } from './components/GraphArea';

export default function Home() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [checkStatus, setCheckStatus] = useState<CheckboxData[]>([]);
  const [updateCheckState, compositionMap, checkedPrefCodeList] = usePopulationComposition();

  useEffect(() => {
    fetch('/api/v1/prefectures')
      .then((response) => response.json())
      .then((data) => {
        const response = data as PrefecturesResponse;
        setPrefectures(response.result);
        const checkboxData: CheckboxData[] = response.result.map((prefecture) => ({
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          checked: false,
        }));
        setCheckStatus(checkboxData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className={styles.mainDiv}>
      <h2>都道府県</h2>
      <Checkboxes
        prefectures={prefectures}
        checkStatus={checkStatus}
        setCheckStatus={setCheckStatus}
        updateCheckState={updateCheckState}
      />
      <GraphArea
        checkboxData={checkStatus}
        compositionMap={compositionMap}
        checkedPrefCodeList={checkedPrefCodeList}
      />
    </div>
  );
}
