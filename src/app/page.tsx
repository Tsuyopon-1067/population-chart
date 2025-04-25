'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Prefecture } from '@/type/prefecture';
import { PrefecturesResponse } from '@/type/prefecturesResponse';
import { Checkboxes } from './components/Checkboxes';

export default function Home() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [checkStatus, setCheckStatus] = useState<boolean[]>([]);
  useEffect(() => {
    fetch('/api/v1/prefectures')
      .then((response) => response.json())
      .then((data) => {
        const response = data as PrefecturesResponse;
        setPrefectures(response.result);
        setCheckStatus(new Array(response.result.length).fill(false));
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
      />
    </div>
  );
}
