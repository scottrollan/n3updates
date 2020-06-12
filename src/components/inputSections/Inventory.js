import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Inputs.module.scss';

const Inventory = (props) => {
  const amountOptions = [
    {
      title: 'unit1',
      containerField: 'amount_container1Size',
      container: 'unit1container',
      priceField: 'amount_container1Price',
      price: 'unit1price',
      required: true,
    },
    {
      title: 'unit2',
      containerField: 'amount_container2Size',
      container: 'unit2container',
      priceField: 'amount_container2Price',
      price: 'unit2price',
    },
    {
      title: 'unit3',
      containerField: 'amount_container3Size',
      container: 'unit3container',
      priceField: 'amount_container3Price',
      price: 'unit3price',
    },
  ];
  return (
    <Form.Group
      className={styles.formGroup}
      style={{
        flexDirection: 'column',
      }}
    >
      {amountOptions.map((a, index) => {
        return (
          <div
            className={styles.formGroup}
            style={{ justifyContent: 'center' }}
            key={a.title}
          >
            <Form.Label style={{ margin: '1vw' }}>
              Container {index + 1} Size
              <Form.Control
                type="text"
                name={a.containerField}
                value={props[a.container]}
                onChange={props.handleChange}
                required={a.required ? true : false}
              />
            </Form.Label>
            <Form.Label style={{ margin: '1vw' }}>
              Container {index + 1} Price
              <Form.Control
                type="number"
                name={a.priceField}
                value={props[a.price]}
                onChange={props.handleChange}
                required={a.required ? true : false}
              />
            </Form.Label>
          </div>
        );
      })}
      <Form.Label style={{ width: '70%', alignSelf: 'center' }}>
        Purchase Notes
        <Form.Control
          as="textarea"
          rows="1"
          placeholder="notes about availability, price variances, etc."
          name="purchaseNotes"
          value={props.purchaseNotes}
          onChange={props.handleChange}
        />
      </Form.Label>
    </Form.Group>
  );
};

export default Inventory;
