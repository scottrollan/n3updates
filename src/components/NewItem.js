import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import Names from './inputSections/Names';
import Descriptions from './inputSections/Descriptions';
import Conditions from './inputSections/Conditions';
import Dropdowns from './inputSections/Dropdowns';
import Inventory from './inputSections/Inventory';
import styles from './Stylesheet.module.scss';

class NewItem extends React.Component {
  state = {
    _type: 'plant',
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
    form: {},
    redirect: false,
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
    } else if (
      this.state.waterLevel_average === false &&
      this.state.waterLevel_dry === false &&
      this.state.waterLevel_wet === false
    ) {
      alert('Please select at least one option for Water');
    } else if (
      this.state.sunlightLevel_full === false &&
      this.state.sunlightLevel_partial === false &&
      this.state.sunlightLevel_shade === false
    ) {
      alert('Please select at least one option for Sun');
    } else if (
      this.state.foliage_deciduous === false &&
      this.state.foliage_evergreen === false &&
      this.state.foliage_semiEvergreen === false
    ) {
      alert('Please select at least one option for Foliage');
    } else if (Number(this.state.highZone) < Number(this.state.lowZone)) {
      console.log(
        'lowZone: ',
        this.state.lowZone,
        '  highZone: ',
        this.state.highZone
      );
      alert('"To Zone" must be higher than or equal to "From Zone"');
    } else if (
      Number(this.state.lowZone) === 0 ||
      Number(this.state.highZone) < Number(this.state.lowZone)
    ) {
      alert(
        'Check your zones. "From Zone" must be greater than 0, and "To Zone" must greater than or equal to "From Zone"'
      );
    } else if (this.state.category === '') {
      alert('Please select a category.');
    } else {
      $('#validate').hide();
      $('#addItemButton').show();
      this.prepareForm();
    }
  };
  prepareForm = () => {
    let stateCopy = this.state;

    Object.keys(stateCopy).forEach((key) => {
      if (
        stateCopy[key] === 0 ||
        stateCopy[key] === '' ||
        stateCopy[key] === null ||
        stateCopy[key] === undefined ||
        stateCopy[key] === false
      ) {
        delete stateCopy[key];
      }
    });

    let purchaseSegment = [
      {
        _type: 'amount',
        _key: '1reniatnoC',
        containerSize: stateCopy.amount_container1Size,
        price: Number(stateCopy.amount_container1Price),
      },
    ];
    if (stateCopy.amount_container2Size) {
      purchaseSegment.push({
        _type: 'amount',
        _key: '2reniatnoC',
        containerSize: stateCopy.amount_container2Size,
        price: Number(stateCopy.amount_container2Price),
      });
    }

    if (stateCopy.amount_container3Size) {
      purchaseSegment.push({
        _type: 'amount',
        _key: '3reniatnoC',
        containerSize: stateCopy.amount_container3Size,
        price: Number(stateCopy.amount_container3Price),
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

    let imageSegment = {
      _type: 'image',
      asset: {
        _ref: 'image-a3d829ee02102d79da412cf8fe5f0fac1577254c-175x188-png',
        _type: 'reference',
      },
    };

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
    stateCopy['name'] = stateCopy.commonName;
    stateCopy['image'] = imageSegment;

    this.setState({ form: stateCopy });
  };

  submitForm = () => {
    $('#addItemButton').hide();
    $('#spinner').show();
    const form = this.state.form;
    form.lowZone = Number(form.lowZone);
    form.highZone = Number(form.highZone);
    delete form.form;
    delete form.redirect;

    const sanityClient = require('@sanity/client');
    const client = sanityClient({
      projectId: 'ogg4t6rs',
      dataset: 'production',
      token:
        'sktPD2r791blYmo8n26ZCurNfamiwCJ2KfgbdmPsIYPFGywjAK4roSijSwqTsH83LYiPvFIfDmOH1JL5jtzjGdpADZoEVIaKxzv8vJyD4Wj8lX04qNqzLEbVDN3uLAoEFRNWgLJga6t6LCSV6JGMOiiXG9MtjWVXdyxgHmQfWik5siHH65dt',
      useCdn: false, // `false` if you want to ensure fresh data
    });
    client.create(form);

    alert(`${form.botanicalName} was created`);
    $('#validate').show();
    $('#spinner').hide();
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Form
          id="addForm"
          className={styles.wrapper}
          // onSubmit={(event) => this.addNewItem(event)}
          onSubmit={() => this.submitForm()}
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
              style={{ display: 'none' }}
            >
              Add Inventory Item
            </Button>
            <Spinner
              id="spinner"
              animation="grow"
              variant="success"
              style={{ display: 'none' }}
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default NewItem;
