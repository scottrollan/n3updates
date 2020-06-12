import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Inputs.module.scss';

const Descriptions = (props) => {
  return (
    <Form.Group className={styles.formGroup}>
      <Form.Label style={{ width: '70%' }}>
        Description
        <Form.Control
          as="textarea"
          rows="5"
          placeholder="This is where the plant's main desciption would go"
          name="description"
          value={props.description}
          onChange={props.handleChange}
          required
        />
      </Form.Label>
      <Form.Label style={{ width: '70%' }}>
        Notes
        <Form.Control
          as="textarea"
          rows="1"
          placeholder="Optional additional notes, e.g. fertilizing, transplanting instructions, etc."
          name="notes"
          value={props.notes}
          onChange={props.handleChange}
        />
      </Form.Label>
    </Form.Group>
  );
};

export default Descriptions;
