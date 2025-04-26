'use client';

import { Prefecture } from '@/app/type/prefecture';
import styles from './Checkboxes.module.css';
import { CheckboxData } from '@/app/type/checkboxData';

interface CheckboxesProps {
  prefectures?: Prefecture[];
  checkStatus?: CheckboxData[];
  setCheckStatus: (status: CheckboxData[]) => void;
  updateCheckState(prefCode: number, checkboxData: CheckboxData[]): void;
}

export const Checkboxes = ({
  prefectures,
  checkStatus,
  setCheckStatus,
  updateCheckState,
}: CheckboxesProps) => {
  console.log(prefectures, checkStatus);
  if (!prefectures || !checkStatus || prefectures.length === 0) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className={styles.mainDiv}>
      <h2>都道府県</h2>
      <div className={styles.checkboxArea}>
        {prefectures.map((prefecture, key) => (
          <form className={styles.form} key={key}>
            <input
              className={styles.checkbox}
              type='checkbox'
              value={prefecture.prefCode}
              checked={checkStatus[key].checked}
              onChange={() => {
                const newCheckStatus = [...checkStatus];
                newCheckStatus[key].checked = !newCheckStatus[key].checked;
                setCheckStatus(newCheckStatus);
                updateCheckState(prefecture.prefCode, newCheckStatus);
              }}
            />
            <label>{prefecture.prefName}</label>
          </form>
        ))}
      </div>
    </div>
  );
};
