import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './Inputs.module.scss';

const Conditions = (props) => {
  const checkboxOptions = [
    {
      title: 'Soil Ph',
      choices: [
        { choice: 'soilPH_acid', name: 'ph', choiceName: 'acid' },
        { choice: 'soilPH_neutral', name: 'ph', choiceName: 'neutral' },
        { choice: 'soilPH_alkaline', name: 'ph', choiceName: 'alkaline' },
      ],
    },
    {
      title: 'Soil Type',
      choices: [
        { choice: 'soilType_clay', name: 'type', choiceName: 'clay' },
        { choice: 'soilType_average', name: 'type', choiceName: 'average' },
        { choice: 'soilType_sand', name: 'type', choiceName: 'sand' },
      ],
    },
    {
      title: 'Water',
      choices: [
        { choice: 'waterLevel_dry', name: 'water', choiceName: 'dry' },
        { choice: 'waterLevel_average', name: 'water', choiceName: 'average' },
        { choice: 'waterLevel_wet', name: 'water', choiceName: 'wet' },
      ],
    },
    {
      title: 'Sun',
      choices: [
        { choice: 'sunlightLevel_full', name: 'sun', choiceName: 'full' },
        { choice: 'sunlightLevel_partial', name: 'sun', choiceName: 'partial' },
        { choice: 'sunlightLevel_shade', name: 'sun', choiceName: 'shade' },
      ],
    },
    {
      title: 'Foliage',
      choices: [
        {
          choice: 'foliage_evergreen',
          name: 'foliage',
          choiceName: 'evergreen',
        },
        {
          choice: 'foliage_semiEvergreen',
          name: 'foliage',
          choiceName: 'semiEvergreen',
        },
        {
          choice: 'foliage_deciduous',
          name: 'foliage',
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
                      name={x.choice}
                      id={x.choice}
                      value={`props.${x.choice}`}
                      onChange={props.handleCheck}
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
