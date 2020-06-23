import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import styles from './Stylesheet.module.scss';

const UploadPhoto = (props) => {
  const [disable, setDisable] = useState(true);

  const handleChange = (event) => {
    props.fileSelectHandler(event);
    setDisable(false);
  };

  const handleLoader = () => {
    props.fileUploadHandler();
    setDisable(true);
  };
  return (
    <div>
      <Form.File
        required={props.required}
        style={{ paddingLeft: '10%', marginBottom: '1rem' }}
        name="image"
        onChange={(e) => handleChange(e)}
        id="upload"
      />

      <Button
        id="uploadButton"
        onClick={() => handleLoader()}
        disabled={disable}
      >
        {props.buttonText}
      </Button>
      <Spinner
        id="spinnerUpload"
        animation="grow"
        variant="success"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadPhoto;
