import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Stylesheet.module.scss';

const UploadPhoto = () => {
  return (
    <React.Fragment>
      <Form.Group className={styles.formGroup}>
        <Form.File
          label="Upload New Photo"
          lang="en"
          custom
          style={{ textAlign: 'left', fontSize: '1.7vw' }}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default UploadPhoto;
