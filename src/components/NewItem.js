import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import Confirm from './popups/Confirm';
import ActionComplete from './popups/ActionComplete';
import Conditions from './inputSections/Conditions';
import Names from './inputSections/Names';
import Dropdowns from './inputSections/Dropdowns';
import Descriptions from './inputSections/Descriptions';
import Inventory from './inputSections/Inventory';
import UploadPhoto from './UploadPhoto';
import styles from './Stylesheet.module.scss';

let form = {};

class NewItem extends React.Component {
  state = {
    _type: 'plant',
    botanicalName: '',
    variety: '',
    commonName: '',
    regionalName: '',
    description: '',
    notes: '',
    category: '',
    lowZone: 0,
    highZone: 0,
    optionText: '',
    photoLink: '',
    soilType: [],
    soilPH: [],
    waterLevel: [],
    sunlightLevel: [],
    foliage: [],
    amount: [],
    container1Size: '',
    container1Price: 0,
    container2Size: '',
    container2Price: 0,
    container3Size: '',
    container3Price: 0,
    container4Size: '',
    container4Price: 0,
    purchaseNotes: '',
    form: {},
    redirect: false,
  };

  handleCheck = (id) => {
    const name = $(`#${id}`).attr('choice');
    const array = $(`#${id}`).attr('array');
    let pushThisArray = this.state[array];
    const alreadyIncludes = pushThisArray.includes(name);
    if (alreadyIncludes) {
      pushThisArray = pushThisArray.filter((word) => word !== name);
    } else {
      pushThisArray.push(name);
    }
    this.setState({ [array]: pushThisArray });
  };

  handleChange = (field, val) => {
    this.setState({ [field]: val });
  };

  addContainer = () => {
    const amountCopy = [...this.state.amount];
    const cNumber = this.state.amount.length + 1;
    const newContainer = {
      containerSize: '',
      price: 0,
      _key: `${cNumber}reniatnoC`,
      _type: 'amount',
    };
    amountCopy.push(newContainer);
    this.setState({ amount: [...amountCopy] });
  };
  alertConditions = () => {
    if (
      this.state.botanicalName === '' ||
      this.state.botanicalName === undefined
    ) {
      alert('Please fill in the Botanical Name field');
    }
    if (this.state.commonName === '' || this.state.commonName === undefined) {
      alert('Please fill in the Comman Name field');
    }
    if (this.state.description === '' || this.state.description === undefined) {
      alert('Please fill in the Description field');
    }
    if (this.state.soilPH.length === 0) {
      alert('Please select at least one option for Soil pH');
    } else if (this.state.soilType.lenth === 0) {
      alert('Please select at least one option for Soil Type');
    } else if (this.state.waterLevel.length === 0) {
      alert('Please select at least one option for Water');
    } else if (this.state.sunlightLevel.length === 0) {
      alert('Please select at least one option for Sun');
    } else if (this.state.foliage.length === 0) {
      alert('Please select at least one option for Foliage');
    } else if (Number(this.state.highZone) < Number(this.state.lowZone)) {
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
      $('#addItemButton').show();
      this.prepareForm();
    }
  };
  prepareForm = () => {
    let stateCopy = { ...this.state };

    //prepare the "amount" array with container/price
    stateCopy.amount = [];
    const amt1 = {
      _key: '1reniatoC',
      _type: 'amount',
      containerSize: stateCopy.container1Size,
      price: Number(stateCopy.container1Price),
    };

    const amt2 = {
      _key: '2reniatoC',
      _type: 'amount',
      containerSize: stateCopy.container2Size,
      price: Number(stateCopy.container2Price),
    };

    const amt3 = {
      _key: '3reniatoC',
      _type: 'amount',
      containerSize: stateCopy.container3Size,
      price: Number(stateCopy.container3Price),
    };
    const amt4 = {
      _key: '4reniatoC',
      _type: 'amount',
      containerSize: stateCopy.container4Size,
      price: Number(stateCopy.container4Price),
    };
    stateCopy.amount.push(amt1);
    stateCopy.amount.push(amt2);
    stateCopy.amount.push(amt3);
    stateCopy.amount.push(amt4);

    stateCopy.amount = stateCopy.amount.filter(
      (a) => a.containerSize !== undefined
    );
    stateCopy.amount = stateCopy.amount.filter((a) => a.containerSize !== '');

    //set placeholder image
    let imageSegment = {
      _type: 'image',
      asset: {
        _ref: 'image-a3d829ee02102d79da412cf8fe5f0fac1577254c-175x188-png',
        _type: 'reference',
      },
    };
    //set arrays
    stateCopy['soilPH'] = [...this.state.soilPH];
    stateCopy['soilType'] = [...this.state.soilType];
    stateCopy['waterLevel'] = [...this.state.waterLevel];
    stateCopy['sunlightLevel'] = [...this.state.sunlightLevel];
    stateCopy['foliage'] = [...this.state.foliage];
    stateCopy['name'] = stateCopy.commonName;
    stateCopy['image'] = imageSegment;
    stateCopy['_type'] = 'plant';

    form = { ...stateCopy };
    $('#confirm').css('display', 'flex');
    console.log('form...', form);
    alert('check form');
  };

  doNotCreate = () => {
    $('#confirm').css('display', 'none');
  };

  doCreate = () => {
    $('#confirm').css('display', 'none');
    this.submitForm();
  };

  closeSuccess = () => {
    $('#success').css('display', 'none');
    this.setState({ redirect: true });
  };

  submitForm = () => {
    //delete all state key/value pairs used to create the above arrays
    delete form.container1Size;
    delete form.container1Price;
    delete form.container2Size;
    delete form.container2Price;
    delete form.container3Size;
    delete form.container3Price;
    delete form.container4Size;
    delete form.container4Price;
    delete form.optionText;
    delete form.photoLink;
    delete form.form;
    delete form.redirect;
    //convert string to number
    const fixLow = Number(form.lowZone);
    form.lowZone = fixLow;
    const fixHigh = Number(form.highZone);
    form.highZone = fixHigh;

    const sanityClient = require('@sanity/client');
    const client = sanityClient({
      projectId: 'ogg4t6rs',
      dataset: 'production',
      token:
        'sktPD2r791blYmo8n26ZCurNfamiwCJ2KfgbdmPsIYPFGywjAK4roSijSwqTsH83LYiPvFIfDmOH1JL5jtzjGdpADZoEVIaKxzv8vJyD4Wj8lX04qNqzLEbVDN3uLAoEFRNWgLJga6t6LCSV6JGMOiiXG9MtjWVXdyxgHmQfWik5siHH65dt',
      useCdn: false, // `false` if you want to ensure fresh data
    });
    client.create(form).catch((err) => {
      console.error('Oh no, create failed: ', err.message);
    });

    $('#success').css('display', 'flex');
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Confirm
          botanicalName={this.state.botanicalName}
          variety={this.state.variety}
          action="create"
          stopAction={() => this.doNotCreate()}
          doAction={() => this.doCreate()}
        />
        <ActionComplete
          botanicalName={this.state.botanicalName}
          variety={this.state.variety}
          action="created"
          closeMe={() => this.closeSuccess()}
        />
        <Form id="addForm" className={styles.wrapper}>
          <Names
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            botanicalName={this.state.botanicalName}
            variety={this.state.variety}
            commonName={this.state.commonName}
            regionalName={this.state.regionalName}
          />

          <Descriptions
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            description={this.state.description}
            notes={this.state.notes}
          />

          <UploadPhoto />

          <Conditions
            handleCheck={(id) => this.handleCheck(id)}
            soilType={this.state.soilType}
            soilType_clay={this.state.soilType.includes('clay')}
            soilType_average={this.state.soilType.includes('average')}
            soilType_sand={this.state.soilType.includes('sand')}
            soilPH={this.state.soilPH}
            soilPH_acid={this.state.soilPH.includes('acid')}
            soilPH_neutral={this.state.soilPH.includes('neutral')}
            soilPH_alkaline={this.state.soilPH.includes('alkaline')}
            waterLevel={this.state.waterLevel}
            waterLevel_wet={this.state.waterLevel.includes('wet')}
            waterLevel_average={this.state.waterLevel.includes('average')}
            waterLevel_dry={this.state.waterLevel.includes('dry')}
            sunlightLevel={this.state.sunlightLevel}
            sunlightLevel_full={this.state.sunlightLevel.includes('full')}
            sunlightLevel_partial={this.state.sunlightLevel.includes('partial')}
            sunlightLevel_shade={this.state.sunlightLevel.includes('shade')}
            foliage={this.state.foliage}
            foliage_evergreen={this.state.foliage.includes('evergreen')}
            foliage_semiEvergreen={this.state.foliage.includes(
              'semi-evergreen'
            )}
            foliage_deciduous={this.state.foliage.includes('deciduous')}
          />

          <Dropdowns
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            lowZone={this.state.lowZone}
            highZone={this.state.highZone}
            category={this.state.category}
          />

          <Inventory
            amountMapArray={this.state.amount}
            container1Size={this.state.container1Size}
            container2Size={this.state.container2Size}
            container3Size={this.state.container3Size}
            container4Size={this.state.container4Size}
            container1Price={this.state.container1Price}
            container2Price={this.state.container2Price}
            container3Price={this.state.container3Price}
            container4Price={this.state.container4Price}
            handleChange={(field, e) =>
              this.handleChange([field], e.target.value)
            }
            addContainer={this.addContainer}
            addOption={
              this.state.amount.length === 0
                ? 'Add at least one container'
                : 'Add Another Container'
            }
            purchaseNotes={this.state.purchaseNotes}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '12vh',
            }}
          >
            <Button
              id="addItemButton"
              variant="outline-success"
              onClick={() => this.alertConditions()}
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
