import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './Stylesheet.module.scss';

const ConfirmDelete = (props) => {
  return (
    <div className={styles.confirmDelete} id="confirm">
      <div className={styles.deleteButtonWrapper}>
        <h5>
          Are you sure you want to delete{' '}
          <em>
            {props.botanicalName} {props.variety}
          </em>{' '}
          for good?
        </h5>
        <Button variant="danger" onClick={props.goDelete}>
          Yes, I'm really sure. Delete this forever.
        </Button>
        <Button variant="secondary" onClick={props.stopDelete}>
          Meh. Let me think about it a little more.
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
