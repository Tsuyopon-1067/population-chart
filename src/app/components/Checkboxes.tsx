'use client';

import { Prefecture } from '@/type/prefecture';
import styles from './Checkboxes.module.css';

interface CheckboxesProps {
  prefectures?: Prefecture[];
  checkStatus?: boolean[];
  setCheckStatus: (status: boolean[]) => void;
}

export const Checkboxes = ({ prefectures, checkStatus, setCheckStatus }: CheckboxesProps) => {
  if (!prefectures || !checkStatus) {
    return <div>Loading...</div>;
  }
  console.log('Prefectures:', prefectures);
  return (
    <div className={styles.mainDiv}>
      {prefectures.map((prefecture, key) => (
        <form className={styles.form} key={key}>
          <input
            className={styles.checkbox}
            type='checkbox'
            value={prefecture.prefCode}
            checked={checkStatus[key]}
            onClick={() => {
              const newCheckStatus = [...checkStatus];
              newCheckStatus[key] = !newCheckStatus[key];
              setCheckStatus(newCheckStatus);
            }}
          />
          <label>{prefecture.prefName}</label>
        </form>
      ))}
    </div>
  );
};
