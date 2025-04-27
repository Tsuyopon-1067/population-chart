'use client';

import styles from './Checkboxes.module.css';
import { CheckboxData } from '@/app/type/checkboxData';

interface CheckboxesProps {
  checkStatus?: CheckboxData[];
  setCheckStatus: (status: CheckboxData[]) => void;
  updateCheckState(prefCode: number, checkboxData: CheckboxData[]): void;
}

export const Checkboxes = ({ checkStatus, setCheckStatus, updateCheckState }: CheckboxesProps) => {
  if (!checkStatus || checkStatus.length === 0) {
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
        {checkStatus.map((state, key) => (
          <form className={styles.form} key={key}>
            <input
              className={styles.checkbox}
              type='checkbox'
              value={state.prefCode}
              checked={state.checked}
              onChange={() => {
                const newCheckStatus = [...checkStatus];
                newCheckStatus[key].checked = !newCheckStatus[key].checked;
                setCheckStatus(newCheckStatus);
                updateCheckState(state.prefCode, newCheckStatus);
              }}
            />
            <label>{state.prefName}</label>
          </form>
        ))}
      </div>
    </div>
  );
};
