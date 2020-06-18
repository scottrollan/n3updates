import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../Stylesheet.module.scss';

const ConfirmDelete = (props) => {
  return (
    <div className={styles.confirm} id="confirm">
      <div className={styles.confirmButtonWrapper}>
        <h5>
          Are you sure you want to {props.action}
          <em>
            {' '}
            {props.botanicalName} {props.variety}
          </em>{' '}
          ?
        </h5>
        <Button variant="danger" onClick={props.doAction}>
          Yes, {props.action.toUpperCase()} this inventory item.
        </Button>
        <Button variant="secondary" onClick={props.stopAction}>
          Meh. Let me think about it a little more.
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
