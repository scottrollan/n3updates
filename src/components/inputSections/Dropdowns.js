import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Inputs.module.scss';

const Dropdowns = (props) => {
  const dropdownOptions = [
    {
      title: 'From Zone',
      field: 'lowZone',
      select: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      title: 'To Zone',
      field: 'highZone',
      select: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      title: 'Category',
      field: 'category',
      select: [
        'shrubs',
        'trees',
        'palms',
        'opuntia',
        'perennials',
        'grasses',
        'ferns',
        'vines',
        'seeds',
        'yucca',
      ],
    },
  ];

  return (
    <Form.Group
      className={styles.formGroup}
      style={{ justifyContent: 'center' }}
    >
      {dropdownOptions.map((d) => (
        <Form.Label
          htmlFor="category"
          key={d.title}
          style={{ margin: d.title === 'Category' ? '1vw 1vw 1vw 5vw' : '1vw' }}
        >
          {d.title}
          <div>
            <Form.Control
              as="select"
              name={d.field}
              value={props[d.field]}
              onChange={(e) => props.handleChange(e, d.field)}
            >
              <option value={null}></option>
              {d.select.map((s) => (
                <option value={d.field !== 'category' ? Number(s) : s} key={s}>
                  {s}
                </option>
              ))}
            </Form.Control>
          </div>
        </Form.Label>
      ))}
    </Form.Group>
  );
};

export default Dropdowns;
