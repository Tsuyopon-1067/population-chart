'use client';

import { Prefecture } from '@/type/prefecture';
import styles from './Checkboxes.module.css';

interface CheckboxesProps {
  prefectures?: Prefecture[];
}

export const Checkboxes = ({ prefectures }: CheckboxesProps) => {
  if (!prefectures) {
    return <div>Loading...</div>;
  }
  console.log('Prefectures:', prefectures);
  return (
    <div className={styles.mainDiv}>
      {prefectures.map((prefecture, key) => (
        <form className={styles.form} key={key}>
          <input className={styles.checkbox} type='checkbox' value={prefecture.prefCode} />
          <label>{prefecture.prefName}</label>
        </form>
      ))}
    </div>
  );
};
