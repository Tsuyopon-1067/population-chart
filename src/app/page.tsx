'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { PrefecturesResponse } from '@/app/type/prefecturesResponse';
import { Checkboxes } from './components/Checkboxes';
import { CheckboxData } from '@/app/type/checkboxData';
import { usePopulationComposition } from './hooks/usePopulationComposition';
import { ChartController } from './components/ChartController';
import { fetchHelper } from './lib/fetchHelper';

export default function Home() {
  const [checkStatus, setCheckStatus] = useState<CheckboxData[]>([]);
  const [updateCheckState, compositionMap, checkedPrefCodeList] = usePopulationComposition();

  useEffect(() => {
    fetchHelper('/api/v1/prefectures')
      .then((data) => {
        const response = data as PrefecturesResponse;
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
      <Checkboxes
        checkStatus={checkStatus}
        setCheckStatus={setCheckStatus}
        updateCheckState={updateCheckState}
      />
      <ChartController
        checkboxData={checkStatus}
        compositionMap={compositionMap}
        checkedPrefCodeList={checkedPrefCodeList}
      />
    </div>
  );
}
