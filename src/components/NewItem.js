import React from 'react';
import $ from 'jquery';
import Names from './inputSections/Names';
import Descriptions from './inputSections/Descriptions';
import Conditions from './inputSections/Conditions';
import Dropdowns from './inputSections/Dropdowns';
import Inventory from './inputSections/Inventory';
import styles from './Stylesheet.module.scss';
import { Form, Button } from 'react-bootstrap';

class NewItem extends React.Component {
  state = {
    botanicalName: '',
    variety: '',
    commonName: '',
    regionalName: '',
    description: '',
    notes: '',
    soilPH_acid: false,
    soilPH_neutral: false,
    soilPH_alkaline: false,
    soilType_clay: false,
    soilType_average: false,
    soilType_sand: false,
    waterLevel_dry: false,
    waterLevel_average: false,
    waterLevel_wet: false,
    sunlightLevel_full: false,
    sunlightLevel_partial: false,
    sunlightLevel_shade: false,
    foliage_evergreen: false,
    foliage_semiEvergreen: false,
    foliage_deciduous: false,
    category: '',
    lowZone: 0,
    highZone: 0,
    amount_container1Size: '',
    amount_container1Price: 0,
    amount_container2Size: '',
    amount_container2Price: 0,
    amount_container3Size: '',
    amount_container3Price: 0,
    purchaseNotes: '',
  };

  handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  handleCheck = (event) => {
    const field = event.target.name;
    this.setState((prevState) => ({
      [field]: !prevState[field],
    }));
  };

  alertConditions = () => {
    if (
      this.state.soilPH_acid === false &&
      this.state.soilPH_alkaline === false &&
      this.state.soilPH_neutral === false
    ) {
      alert('Please select at least one option for Soil pH');
    } else if (
      this.state.soilType_average === false &&
      this.state.soilType_clay === false &&
      this.state.soilType_sand === false
    ) {
      alert('Please select at least one option for Soil Type');
      return false;
    } else if (
      this.state.waterLevel_average === false &&
      this.state.waterLevel_dry === false &&
      this.state.waterLevel_wet === false
    ) {
      alert('Please select at least one option for Water');
      return false;
    } else if (
      this.state.sunlightLevel_full === false &&
      this.state.sunlightLevel_partial === false &&
      this.state.sunlightLevel_shade === false
    ) {
      alert('Please select at least one option for Sun');
      return false;
    } else if (
      this.state.foliage_deciduous === false &&
      this.state.foliage_evergreen === false &&
      this.state.foliage_semiEvergreen === false
    ) {
      alert('Please select at least one option for Foliage');
      return false;
    } else {
      $('#validate').hide();
      $('#addItemButton').show();
      this.addNewItem();
    }
  };
  addNewItem = () => {
    let purchaseSegment = [
      {
        containerSize: this.state.amount_container1Size,
        price: this.state.amount_container1Price,
      },
      {
        containerSize: this.state.amount_container2Size,
        price: this.state.amount_container2Price,
      },
      {
        containerSize: this.state.amount_container3Size,
        price: this.state.amount_container3Price,
      },
    ];
    let stateCopy = this.state;
    let stateArray = [];

    for (let [key, value] of Object.entries(stateCopy)) {
      const pushThis = `{${key}: ${value} }`;
      if (value) {
        stateArray.push(pushThis);
      }
    }
    console.log(stateArray);

    let form = {
      botanicalName: this.state.botanicalName,
      variety: this.state.variety,
      commonName: this.state.commonName,
      regionalName: this.state.regionalName,
      categoy: this.state.category,
      lowZone: this.state.lowZone,
      highZone: this.state.highZone,
      description: this.state.description,
      notes: this.state.notes,

      soilPh: [
        { acid: this.state.soilPH_acid },
        { neutral: this.state.soilPH_neutral },
        { alkaline: this.state.soilPH_alkaline },
      ],

      soilType: [
        { clay: this.state.soilType_clay },
        { average: this.state.soilType_average },
        { sand: this.state.soilType_sand },
      ],

      waterLevel: [
        { dry: this.state.waterLevel_dry },
        { average: this.state.waterLevel_average },
        { wet: this.state.waterLevel_wet },
      ],

      sunlightLevel: [
        { full: this.state.sunlightLevel_full },
        { partial: this.state.sunlightLevel_partial },
        { shade: this.state.sunlightLevel_shade },
      ],

      foliage: [
        { evergreen: this.state.foliage_evergreen },
        { semiEvergreen: this.state.foliage_semiEvergreen },
        { deciduous: this.state.foliage_deciduous },
      ],

      amount: [],
      purchaseNotes: this.state.purchaseNotes,
    };

    let filterAmount = purchaseSegment.filter((key) => {
      //gets rid of value = ''
      return key.containerSize !== '';
    });
    form.amount = [...filterAmount];

    // let filter;

    $.each(form, (key, value) => {
      if (value === '' || value === false || value === 0 || value === null) {
        delete form[key];
      }
    });

    console.log('form ', form);

    // let filterForm = form.amount.filter((price) => {
    //   //gets rid of value = ''
    //   return price.value !== 0;
    // });
    // let filteredArray = filter.filter((categories) => {
    //   //gets rid of value = ''
    //   return categories.value !== '';
    // });
    // let uncompiledArray = [];
    // let indexStr = '';
    // filteredArray.map((f) => {
    //   if (f.value === true) {
    //     indexStr = `"${f.name}" in ${f.array}`;
    //   } else if (f.name === 'category') {
    //     indexStr = `category == "${f.value}"`;
    //   } else if (f.name === 'zone') {
    //     indexStr = `lowZone <= ${f.value} && highZone >= ${f.value}`;
    //   }
    //   return uncompiledArray.push(indexStr);
    // });
    // filters = uncompiledArray.join(' && '); //turns array into string with conditions joined by "&&"
    // const query = `*[${filters}]`;
    // this.props.addItem(query);
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Form
          id="addForm"
          className={styles.wrapper}
          // onSubmit={(event) => this.addNewItem(event)}
          onSubmit={(event) => this.addNewItem(event)}
        >
          <Names
            handleChange={(e) => this.handleChange(e)}
            botanicalName={this.state.botanicalName}
            variety={this.state.variety}
            commonName={this.state.commonName}
            regionalName={this.state.regionalName}
          />

          <Descriptions
            handleChange={(e) => this.handleChange(e)}
            description={this.state.description}
            notes={this.state.notes}
          />

          <Conditions handleCheck={(e) => this.handleCheck(e)} />

          <Dropdowns
            handleChange={(e) => this.handleChange(e)}
            lowZone={this.state.lowZone}
            highZone={this.state.highZone}
            category={this.state.category}
          />

          <Inventory
            handleChange={(e) => this.handleChange(e)}
            unit1container={this.state.amount_container1Size}
            unit1price={this.state.amount_container1Price}
            unit2container={this.state.amount_container2Size}
            unit2price={this.state.amount_container2Price}
            unit3container={this.state.amount_container3Size}
            unit3price={this.state.amount_container3Price}
            purchaseNotes={this.state.purchaseNote}
          />
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              id="validate"
              variant="outline-danger"
              onClick={() => this.alertConditions()}
            >
              Check Entry
            </Button>

            <Button
              id="addItemButton"
              type="submit"
              onClick={() => this.alertConditions()}
              style={{ display: 'none' }}
            >
              Add Inventory Item
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default NewItem;
