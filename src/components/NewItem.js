import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { Client } from '../constants/index';
import MissingField from './popups/MissingField';
import Confirm from './popups/Confirm';
import Thinking from './popups/Thinking';
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
    imageAssetRef: 'image-a3d829ee02102d79da412cf8fe5f0fac1577254c-175x188-png',
    optionText: '',
    photoLink:
      'https://cdn.sanity.io/images/ogg4t6rs/production/a3d829ee02102d79da412cf8fe5f0fac1577254c-175x188.png',
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
    selectedFile: null,
    redirect: false,
    missingField: '',
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
      this.setState({
        missingField: 'Please fill in the Botanical Name field',
      });
      $('#missingField').css('display', 'flex');
    }
    if (this.state.commonName === '' || this.state.commonName === undefined) {
      this.setState({ missingField: 'Please fill in the Comman Name field' });
      $('#missingField').css('display', 'flex');
    }
    if (this.state.description === '' || this.state.description === undefined) {
      this.setState({ missingField: 'Please fill in the Description field' });
      $('#missingField').css('display', 'flex');
    }
    if (this.state.soilPH.length === 0) {
      this.setState({
        missingField: 'Please select at least one option for Soil pH',
      });
      $('#missingField').css('display', 'flex');
    } else if (this.state.soilType.length === 0) {
      this.setState({
        missingField: 'Please select at least one option for Soil Type',
      });
      $('#missingField').css('display', 'flex');
    } else if (this.state.waterLevel.length === 0) {
      this.setState({
        missingField: 'Please select at least one option for Water',
      });
      $('#missingField').css('display', 'flex');
    } else if (this.state.sunlightLevel.length === 0) {
      this.setState({
        missingField: 'Please select at least one option for Sun',
      });
      $('#missingField').css('display', 'flex');
    } else if (this.state.foliage.length === 0) {
      this.setState({
        missingField: 'Please select at least one option for Foliage',
      });
      $('#missingField').css('display', 'flex');
    } else if (Number(this.state.highZone) < Number(this.state.lowZone)) {
      this.setState({
        missingField: '"To Zone" must be higher than or equal to "From Zone"',
      });
      $('#missingField').css('display', 'flex');
    } else if (
      Number(this.state.lowZone) === 0 ||
      Number(this.state.highZone) < Number(this.state.lowZone)
    ) {
      this.setState({
        missingField:
          'Check your zones. "From Zone" must be greater than 0, and "To Zone" must greater than or equal to "From Zone"',
      });
      $('#missingField').css('display', 'flex');
    } else if (this.state.category === '') {
      this.setState({ missingField: 'Please select a category.' });
      $('#missingField').css('display', 'flex');
    } else if (
      this.state.container1Size === undefined ||
      this.state.container1Size === ''
    ) {
      this.setState({
        missingField: 'Please enter at least one conatiner and price',
      });
      $('#missingField').css('display', 'flex');
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
        _ref: this.state.imageAssetRef,
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
  };

  doNotCreate = () => {
    $('#confirm').css('display', 'none');
  };

  doCreate = () => {
    $('#confirm').css('display', 'none');
    $('#thinking').css('display', 'flex');
    this.submitForm();
  };

  closeSuccess = () => {
    $('#success').css('display', 'none');
    this.setState({ redirect: true });
  };

  fileSelectHandler = (e) => {
    const sFile = e.target.files[0];
    this.setState({ selectedFile: sFile });
  };

  fileUploadHandler = async () => {
    $('#uploadButton').hide();
    $('#spinnerUpload').show();
    setTimeout(() => $('#spinnerUpload').hide(), 1200);
    setTimeout(() => $('#uploadButton').show(), 1500);
    let imageRes = await Client.assets.upload('image', this.state.selectedFile);
    this.setState({ photoLink: imageRes.url });
    this.setState({ imageAssetRef: imageRes._id });
  };

  submitForm = async () => {
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
    delete form.imageAssetRef;
    delete form.selectedFile;
    delete form.form;
    delete form.redirect;
    delete form.missingField;
    //convert string to number
    const fixLow = Number(form.lowZone);
    form.lowZone = fixLow;
    const fixHigh = Number(form.highZone);
    form.highZone = fixHigh;

    let response = await Client.create(form);
    console.log(response);
    if (response._createdAt) {
      setTimeout(() => $('#thinking').css('display', 'none'), 1400);
      setTimeout(() => $('#success').css('display', 'flex'), 1450);
    } else {
      alert('HTTP-Error: ' + response.status);
    }

    // $('#success').css('display', 'flex');
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <MissingField missingField={this.state.missingField} />
        <Confirm
          botanicalName={this.state.botanicalName}
          variety={this.state.variety}
          action="create"
          stopAction={() => this.doNotCreate()}
          doAction={() => this.doCreate()}
        />
        <Thinking variant="success" />
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
          <div className={styles.formGroup}>
            <img
              src={this.state.photoLink}
              alt=""
              style={{ maxHeight: '120px' }}
            />
            <UploadPhoto
              buttonText="New Image Upload"
              fileSelectHandler={(e) => this.fileSelectHandler(e)}
              fileUploadHandler={() => this.fileUploadHandler()}
              selectedFile={this.state.selectedFile}
              required={true}
            />
          </div>
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
