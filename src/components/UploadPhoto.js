import React from 'react';
import { Form } from 'react-bootstrap';

const UploadPhoto = () => {
  return (
    <React.Fragment>
      <Form.Group>
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
