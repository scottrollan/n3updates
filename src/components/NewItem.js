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
    let stateCopy = this.state;

    console.log('pre clean: ', stateCopy);
    alert('check state copy before clean');
    Object.keys(stateCopy).map((key, index) => {
      if (
        stateCopy[key] === 0 ||
        stateCopy[key] == '' ||
        stateCopy[key] === null ||
        stateCopy[key] === undefined ||
        stateCopy[key] === false
      ) {
        delete stateCopy[key];
      }
    });

    let purchaseSegment = [
      {
        containerSize: stateCopy.amount_container1Size,
        price: stateCopy.amount_container1Price,
      },
    ];
    if (stateCopy.amount_container2Size) {
      purchaseSegment.push({
        containerSize: stateCopy.amount_container2Size,
        price: stateCopy.amount_container2Price,
      });
    }

    if (this.state.amount_container3Size) {
      purchaseSegment.push({
        containerSize: stateCopy.amount_container3Size,
        price: stateCopy.amount_container3Price,
      });
    }

    let phSegment = [];
    if (stateCopy.soilPH_acid) {
      phSegment.push('acid');
    }
    if (stateCopy.soilPH_neutral) {
      phSegment.push('neutral');
    }
    if (stateCopy.soilPH_alkaline) {
      phSegment.push('alkaline');
    }

    let typeSegment = [];
    if (stateCopy.soilType_clay) {
      typeSegment.push('clay');
    }
    if (stateCopy.soilType_average) {
      typeSegment.push('average');
    }
    if (stateCopy.soilType_sand) {
      typeSegment.push('sand');
    }

    let waterSegment = [];
    if (stateCopy.waterLevel_dry) {
      waterSegment.push('dry');
    }
    if (stateCopy.waterLevel_average) {
      waterSegment.push('average');
    }
    if (stateCopy.waterLevel_wet) {
      waterSegment.push('wet');
    }

    let sunSegment = [];
    if (stateCopy.sunlightLevel_full) {
      sunSegment.push('full');
    }
    if (stateCopy.sunlightLevel_partial) {
      sunSegment.push('partial');
    }
    if (stateCopy.sunlightLevel_shade) {
      sunSegment.push('shade');
    }

    let foliageSegment = [];
    if (stateCopy.foliage_evergreen) {
      foliageSegment.push('evergreen');
    }
    if (stateCopy.foliage_semiEvergreen) {
      foliageSegment.push('semi-evergreen');
    }
    if (stateCopy.foliage_deciduous) {
      foliageSegment.push('deciduous');
    }

    delete stateCopy.amount_container1Size;
    delete stateCopy.amount_container1Price;
    delete stateCopy.amount_container2Size;
    delete stateCopy.amount_container2Price;
    delete stateCopy.amount_container3Size;
    delete stateCopy.amount_container3Price;
    delete stateCopy.soilPH_acid;
    delete stateCopy.soilPH_neutral;
    delete stateCopy.soilPH_alkaline;
    delete stateCopy.soilType_clay;
    delete stateCopy.soilType_average;
    delete stateCopy.soilType_sand;
    delete stateCopy.waterLevel_average;
    delete stateCopy.waterLevel_dry;
    delete stateCopy.waterLevel_wet;
    delete stateCopy.sunlightLevel_partial;
    delete stateCopy.sunlightLevel_full;
    delete stateCopy.sunlightLevel_shade;
    delete stateCopy.foliage_evergreen;
    delete stateCopy.foliage_deciduous;
    delete stateCopy.foliage_semiEvergreen;

    stateCopy['amount'] = purchaseSegment;
    stateCopy['soilPH'] = phSegment;
    stateCopy['soilType'] = typeSegment;
    stateCopy['waterLevel'] = waterSegment;
    stateCopy['sunlightLevel'] = sunSegment;
    stateCopy['foliage'] = foliageSegment;

    console.log('post clean: ', stateCopy);
    alert('check state copy after clean');

    let form = stateCopy;

    console.log('form ', form);
    alert('check form');
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
