import React from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './Inputs.module.scss';

const Inventory = (props) => {
  return (
    <Form.Group style={{ width: '100%' }} id="containerList">
      <hr />
      {props.amountMapArray.map((a, index) => {
        const cField = `container${index + 1}Size`;
        const pField = `container${index + 1}Price`;

        return (
          <div
            className={styles.formGroup}
            style={{ justifyContent: 'center' }}
            key={a._key}
          >
            <Form.Label>
              {`Container ${index + 1} Size`}
              <Form.Control
                type="input"
                name={`containerSize${index + 1}`}
                id={`containerSize${index + 1}`}
                value={props[cField]}
                onChange={(e) => props.handleChange(cField, e)} //...eChange('container1Size', 'quart)
              />
            </Form.Label>
            <Form.Label style={{ marginLeft: '2vw', marginRight: '2vw' }}>
              Price
              <Form.Control
                type="number"
                name={`price${index + 1}`}
                value={props[pField]}
                id={`containerPrice${index + 1}`}
                onChange={(e) => props.handleChange(pField, e)}
              />
            </Form.Label>
          </div>
        );
      })}
      <Button variant="outline-dark" onClick={() => props.addContainer()}>
        Add Another Container
      </Button>
      <Form.Group>
        <Form.Label>
          Purchase Notes
          <Form.Control
            style={{ width: '100%' }}
            rows="2"
            as="textarea"
            name="purchaseNotes"
            value={props.purchaseNotes}
            onChange={(e) => props.handleChange('purchaseNotes', e)}
          />
        </Form.Label>
      </Form.Group>
      <hr />
    </Form.Group>
  );
};

export default Inventory;
