import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../Stylesheet.module.scss';

const ActionComplete = (props) => {
  return (
    <div className={styles.confirm} id="success">
      <div className={styles.confirmButtonWrapper}>
        <h6>
          Item{' '}
          <i>
            {props.botanicalName} {props.variety}
          </i>{' '}
          was successfully {props.action}
          <Button onClick={() => props.closeMe()}>Close</Button>
        </h6>
      </div>
    </div>
  );
};

export default ActionComplete;
