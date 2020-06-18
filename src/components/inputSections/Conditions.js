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
          choiceLabel: 'acid',
          array: 'soilPH',
          arrayLabel: 'ph',
        },
        {
          choice: 'soilPH_neutral',
          choiceLabel: 'neutral',
          array: 'soilPH',
          arrayLabel: 'ph',
        },
        {
          choice: 'soilPH_alkaline',
          choiceLabel: 'alkaline',
          array: 'soilPH',
          arrayLabel: 'ph',
        },
      ],
    },
    {
      title: 'Soil Type',
      choices: [
        {
          choice: 'soilType_clay',
          choiceLabel: 'clay',
          array: 'soilType',
          arrayLabel: 'type',
        },
        {
          choice: 'soilType_average',
          choiceLabel: 'average',
          array: 'soilType',
          arrayLabel: 'type',
        },
        {
          choice: 'soilType_sand',
          choiceLabel: 'sand',
          array: 'soilType',
          arrayLabel: 'type',
        },
      ],
    },
    {
      title: 'Water',
      choices: [
        {
          choice: 'waterLevel_dry',
          choiceLabel: 'dry',
          array: 'waterLevel',
          arrayLabel: 'water',
        },
        {
          choice: 'waterLevel_average',
          choiceLabel: 'average',
          array: 'waterLevel',
          arrayLabel: 'water',
        },
        {
          choice: 'waterLevel_wet',
          choiceLabel: 'wet',
          array: 'waterLevel',
          arrayLabel: 'water',
        },
      ],
    },
    {
      title: 'Sun',
      choices: [
        {
          choice: 'sunlightLevel_full',
          choiceLabel: 'full',
          array: 'sunlightLevel',
          arrayLabel: 'sun',
        },
        {
          choice: 'sunlightLevel_partial',
          choiceLabel: 'partial',
          array: 'sunlightLevel',
          arrayLabel: 'sun',
        },
        {
          choice: 'sunlightLevel_shade',
          choiceLabel: 'shade',
          array: 'sunlightLevel',
          arrayLabel: 'sun',
        },
      ],
    },
    {
      title: 'Foliage',
      choices: [
        {
          choice: 'foliage_evergreen',
          choiceLabel: 'evergreen',
          array: 'foliage',
          arrayLabel: 'foliage',
        },
        {
          choice: 'foliage_semiEvergreen',
          choiceLabel: 'semi-evergreen',
          array: 'foliage',
          arrayLabel: 'foliage',
        },
        {
          choice: 'foliage_deciduous',
          choiceLabel: 'deciduous',
          array: 'foliage',
          arrayLabel: 'foliage',
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
                      choice={x.choiceLabel}
                      label={x.choiceLabel}
                      arraylabel={x.arrayLabel}
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
