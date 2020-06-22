import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

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
    <React.Fragment>
      <Form.Group>
        <Form.File
          className="position-relative"
          required={props.required}
          name="image"
          onChange={(e) => handleChange(e)}
          id="upload"
        />
        <div
          style={{
            height: '75px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            id="uploadButton"
            onClick={() => handleLoader()}
            style={{ marginTop: '1rem' }}
            disabled={disable}
          >
            Upload Image
          </Button>
          <Spinner
            id="spinnerUpload"
            animation="grow"
            variant="success"
            style={{ display: 'none' }}
          />
        </div>
      </Form.Group>
    </React.Fragment>
  );
};

export default UploadPhoto;
