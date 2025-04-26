'use client';

import { Prefecture } from '@/type/prefecture';
import styles from './Checkboxes.module.css';
import { CheckboxData } from '@/type/checkboxData';

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
  if (!prefectures || !checkStatus) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.mainDiv}>
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
  );
};
