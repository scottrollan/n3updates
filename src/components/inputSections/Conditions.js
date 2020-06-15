import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Inputs.module.scss';

const Conditions = (props) => {
  const checkboxOptions = [
    {
      title: 'Soil Ph',
      choices: [
        {
          choice: 'soilPH_acid',
          name: 'ph',
          array: 'soilPH',
          choiceName: 'acid',
        },
        {
          choice: 'soilPH_neutral',
          name: 'ph',
          array: 'soilPH',
          choiceName: 'neutral',
        },
        {
          choice: 'soilPH_alkaline',
          name: 'ph',
          array: 'soilPH',
          choiceName: 'alkaline',
        },
      ],
    },
    {
      title: 'Soil Type',
      choices: [
        {
          choice: 'soilType_clay',
          name: 'type',
          array: 'soilType',
          choiceName: 'clay',
        },
        {
          choice: 'soilType_average',
          name: 'type',
          array: 'soilType',
          choiceName: 'average',
        },
        {
          choice: 'soilType_sand',
          name: 'type',
          array: 'soilType',
          choiceName: 'sand',
        },
      ],
    },
    {
      title: 'Water',
      choices: [
        {
          choice: 'waterLevel_dry',
          name: 'water',
          array: 'waterLevel',
          choiceName: 'dry',
        },
        {
          choice: 'waterLevel_average',
          name: 'water',
          array: 'waterLevel',
          choiceName: 'average',
        },
        {
          choice: 'waterLevel_wet',
          name: 'water',
          array: 'waterLevel',
          choiceName: 'wet',
        },
      ],
    },
    {
      title: 'Sun',
      choices: [
        {
          choice: 'sunlightLevel_full',
          name: 'sun',
          array: 'sunlightLevel',
          choiceName: 'full',
        },
        {
          choice: 'sunlightLevel_partial',
          name: 'sun',
          array: 'sunlightLevel',
          choiceName: 'partial',
        },
        {
          choice: 'sunlightLevel_shade',
          name: 'sun',
          array: 'sunlightLevel',
          choiceName: 'shade',
        },
      ],
    },
    {
      title: 'Foliage',
      choices: [
        {
          choice: 'foliage_evergreen',
          name: 'foliage',
          array: 'foliage',
          choiceName: 'evergreen',
        },
        {
          choice: 'foliage_semiEvergreen',
          name: 'foliage',
          array: 'foliage',
          choiceName: 'semiEvergreen',
        },
        {
          choice: 'foliage_deciduous',
          name: 'foliage',
          array: 'foliage',
          choiceName: 'deciduous',
        },
      ],
    },
  ];
  return (
    <Form.Group className={styles.formGroup}>
      {checkboxOptions.map((c) => {
        const choiceList = c.choices;
        return (
          <div key={c.title}>
            {' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Form.Label style={{ textDecoration: 'underline' }} required>
                {c.title}
                {choiceList.map((x) => {
                  return (
                    <Form.Check
                      key={x.choice}
                      label={x.choiceName}
                      name={x.choiceName}
                      id={x.choice}
                      value={props[x.choice]}
                      checked={props[x.choice]}
                      array={x.array}
                      onChange={() => props.handleCheck(x.choice)}
                    />
                  );
                })}{' '}
              </Form.Label>
            </div>
          </div>
        );
      })}
    </Form.Group>
  );
};

export default Conditions;
