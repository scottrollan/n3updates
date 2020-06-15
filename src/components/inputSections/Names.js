import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Inputs.module.scss';

const Names = (props) => {
  const nameOptions = [
    {
      title: 'Botanical Name',
      field: 'botanicalName',
    },
    {
      title: 'Vaiety',
      field: 'variety',
    },
    {
      title: 'Common Name',
      field: 'commonName',
    },
    {
      title: 'Regional Name',
      field: 'regionalName',
    },
  ];

  return (
    <Form.Group className={styles.formGroup}>
      {nameOptions.map((n) => {
        return (
          <Form.Label key={n.title}>
            {n.title}
            <Form.Control
              type="text"
              name={n.field}
              // value={props[n.field]}
              onChange={props.handleChange}
              required={
                n.field === 'botanicalName' || n.field === 'commonName'
                  ? true
                  : false
              }
            />
          </Form.Label>
        );
      })}
    </Form.Group>
  );
};

export default Names;
