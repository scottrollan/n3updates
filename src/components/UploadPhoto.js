import React from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './Stylesheet.module.scss';

const UploadPhoto = (props) => {
  return (
    <React.Fragment>
      <Form.Group className={styles.formGroup}>
        <Form.File
          className="position-relative"
          required={props.required}
          name="image"
          label="Select Image"
          onChange={(e) => props.fileSelectHandler(e)}
          id="upload"
        />
        <Button onClick={() => props.fileUploadHandler()}>Upload Now</Button>
      </Form.Group>
    </React.Fragment>
  );
};

export default UploadPhoto;
