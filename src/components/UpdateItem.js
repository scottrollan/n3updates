import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { Client } from '../constants/index';
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

class UpdateItem extends React.Component {
  state = {
    _id: this.props.match.params.id,
    _type: 'plant',
    botanicalName: '',
    variety: '',
    commonName: '',
    regionalName: '',
    description: '',
    notes: '',
    imageAssetRef: 'image-a3d829ee02102d79da412cf8fe5f0fac1577254c-175x188-png',
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
    selectedFile: '',
  };

  fetchItem = async () => {
    const query = `*[_id == "${this.state._id}"]`;

    const response = await Client.fetch(query);
    const res = await response[0];
    const bName = await res.botanicalName;
    this.setState({ botanicalName: bName });
    const vName = await res.variety;
    this.setState({ variety: vName });
    const cName = await res.commonName;
    this.setState({ commonName: cName });
    const rName = await res.regionalName;
    this.setState({ regionalName: rName });
    const lz = await res.lowZone;
    this.setState({ lowZone: Number(lz) });
    const hz = await res.highZone;
    this.setState({ highZone: Number(hz) });
    const cat = await res.category;
    this.setState({ category: cat });
    const desc = await res.description;
    this.setState({ description: desc });
    const nt = await res.notes;
    this.setState({ notes: nt });
    const opt = await res.category;
    this.setState({ optionText: opt.charAt(0).toUpperCase() });
    this.setState({ category: opt });
    const foto = await res.image.asset._ref;
    const photoArray = foto.split('-');
    const photoUrl = `https://cdn.sanity.io/images/ogg4t6rs/production/${photoArray[1]}-${photoArray[2]}.${photoArray[3]}`;
    this.setState({ photoLink: photoUrl });

    const soilTypeArray = await [...res.soilType];
    this.setState({ soilType: [...soilTypeArray] });
    //ph
    const soilPHArray = await [...res.soilPH];
    this.setState({ soilPH: [...soilPHArray] });
    //water
    const waterLevelArray = await [...res.waterLevel];
    this.setState({ waterLevel: [...waterLevelArray] });
    //sun
    const sunlightLevelArray = await [...res.sunlightLevel];
    this.setState({ sunlightLevel: [...sunlightLevelArray] });
    //foliage
    const foliageArray = await [...res.foliage];
    this.setState({ foliage: [...foliageArray] });

    const amountArray = await [...res.amount];
    this.setState({ amount: [...amountArray] });
    this.setState({ container1Size: amountArray[0].containerSize });
    this.setState({ container1Price: amountArray[0].price });
    if (amountArray[1]) {
      this.setState({ container2Size: amountArray[1].containerSize });
      this.setState({ container2Price: amountArray[1].price });
    }
    if (amountArray[2]) {
      this.setState({ container3Size: amountArray[2].containerSize });
      this.setState({ container3Price: amountArray[2].price });
    }
    if (amountArray[3]) {
      this.setState({ container4Size: amountArray[2].containerSize });
      this.setState({ container4Price: amountArray[2].price });
    }
    const pNotes = await res.purchaseNotes;
    this.setState({ purchaseNotes: pNotes });
  };

  handleCheck = (id) => {
    const name = $(`#${id}`).attr('choice');
    const array = $(`#${id}`).attr('array');
    let pushThisArray = this.state[array];
    const alreadyIncludes = pushThisArray.includes(name);
    console.log(name, array);
    if (alreadyIncludes) {
      pushThisArray = pushThisArray.filter((word) => word !== name);
    } else {
      pushThisArray.push(name);
    }
    this.setState({ [array]: pushThisArray });
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
      this.prepareForm();
    }
  };
  prepareForm = () => {
    let stateCopy = this.state;

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

    //set image
    let imageSegment = {
      _type: 'image',
      asset: {
        _ref: this.state.imageAssetRef,
        _type: 'reference',
      },
    };
    //set nested elements
    stateCopy['amount'] = [...this.state.amount];
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

  doNotUpdate = () => {
    $('#confirm').css('display', 'none');
  };

  doUpdate = () => {
    $('#confirm').css('display', 'none');
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
    let imageRes = await Client.assets.upload('image', this.state.selectedFile);
    this.setState({ photoLink: imageRes.url });
    this.setState({ imageAssetRef: imageRes._id });
  };

  submitForm = () => {
    //delete all state key/value pairs not used in plant schema
    delete form.optionText;
    delete form.container1Size;
    delete form.container1Price;
    delete form.container2Size;
    delete form.container2Price;
    delete form.container3Size;
    delete form.container3Price;
    delete form.container4Size;
    delete form.container4Price;
    delete form.imageAssetRef;
    delete form.photoLink;
    delete form.form;
    delete form.selectedFile;
    delete form.redirect;

    Client.createOrReplace(form).catch((err) => {
      console.error('Oh no, the update failed: ', err.message);
    });

    $('#success').css('display', 'flex');
  };

  componentDidMount() {
    this.fetchItem();
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <Confirm
          botanicalName={this.state.botanicalName}
          variety={this.state.variety}
          action="update"
          stopAction={() => this.doNotUpdate()}
          doAction={() => this.doUpdate()}
        />
        <ActionComplete
          botanicalName={this.state.botanicalName}
          variety={this.state.variety}
          action="updated"
          closeMe={() => this.closeSuccess()}
        />

        <h3>Update Inventory Item</h3>
        <Form
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: '1vw 1vw 8vw 1vw',
          }}
        >
          <Names
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            botanicalName={this.state.botanicalName}
            variety={this.state.variety}
            commonName={this.state.commonName}
            regionalName={this.state.regionalName}
          />
          <Dropdowns
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            lowZone={Number(this.state.lowZone)}
            highZone={Number(this.state.highZone)}
            category={this.state.category}
          />
          <Descriptions
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            description={this.state.description}
            notes={this.state.notes}
          />
          <Form.Group className={styles.descrPhoto}>
            <Form.Label
              className={styles.largeSection}
              style={{ padding: '0 20%' }}
            >
              Photo
              <img
                src={this.state.photoLink}
                alt="none"
                style={{ width: '100%', height: 'auto' }}
              />
            </Form.Label>
            <span
              className={styles.smallSection}
              style={{ alignSelf: 'center' }}
            >
              <UploadPhoto
                fileSelectHandler={(e) => this.fileSelectHandler(e)}
                fileUploadHandler={() => this.fileUploadHandler()}
                selectedFile={this.state.selectedFile}
                required={false}
              />
            </span>
          </Form.Group>

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
              this.setState({ [field]: e.target.value })
            }
            addContainer={this.addContainer}
            addOption={'Add Another Container'}
            purchaseNotes={this.state.purchaseNotes}
          />

          <div className={styles.formGroup}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                id="updateItemButton"
                variant="outline-warning"
                // onClick={() => $('#confirm').css('display', 'flex')}
                onClick={() => this.alertConditions()}
              >
                Update Inventory Item
              </Button>
              <Spinner
                id="spinnerU"
                animation="grow"
                variant="success"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default UpdateItem;
