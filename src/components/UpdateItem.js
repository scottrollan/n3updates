import React from 'react';
import { Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import Conditions from './inputSections/Conditions';
import Names from './inputSections/Names';
import Dropdowns from './inputSections/Dropdowns';
import Descriptions from './inputSections/Descriptions';
import UploadPhoto from './UploadPhoto';
import styles from './Stylesheet.module.scss';

class UpdateItem extends React.Component {
  state = {
    item: {},
    id: this.props.match.params.id,
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
    purchaseNotes: '',
  };

  fetchItem = async () => {
    const sanityClient = require('@sanity/client');
    const client = sanityClient({
      projectId: 'ogg4t6rs',
      dataset: 'production',
      token: '',
      useCdn: true, // `false` if you want to ensure fresh data
    });
    const query = `*[_id == "${this.state.id}"]`;

    const response = await client.fetch(query);
    const res = await response[0];
    console.log(res);
    const idNum = await res._id;
    this.setState({ id: idNum });
    const bName = await res.botanicalName;
    this.setState({ botanicalName: bName });
    const vName = await res.variety;
    this.setState({ variety: vName });
    const cName = await res.commonName;
    this.setState({ commonName: cName });
    const rName = await res.regionalName;
    this.setState({ regionalName: rName });
    const lz = await res.lowZone;
    this.setState({ lowZone: lz });
    const hz = await res.highZone;
    this.setState({ highZone: hz });
    const cat = await res.category;
    this.setState({ category: cat });
    const desc = await res.description;
    this.setState({ description: desc });
    const nt = await res.notes;
    this.setState({ notes: nt });
    const opt = await res.category;
    const option = opt;
    this.setState({ optionText: option.charAt(0).toUpperCase() });
    this.setState({ category: option });
    const foto = await res.image.asset._ref;
    const photoArray = foto.split('-');
    const photoUrl = `https://cdn.sanity.io/images/ogg4t6rs/production/${photoArray[1]}-${photoArray[2]}.${photoArray[3]}`;
    this.setState({ photoLink: photoUrl });

    const soilTypeArray = await res.soilType;
    this.setState({ soilType: soilTypeArray });
    //ph
    const soilPHArray = await res.soilPH;
    this.setState({ soilPH: soilPHArray });
    //water
    const waterLevelArray = await res.waterLevel;
    this.setState({ waterLevel: waterLevelArray });
    //sun
    const sunlightLevelArray = await res.sunlightLevel;
    this.setState({ sunlightLevel: sunlightLevelArray });
    //foliage
    const foliageArray = await res.foliage;
    this.setState({ foliage: foliageArray });

    const amountArray = await res.amount;
    this.setState({ amount: [...amountArray] });
    this.setState({ container1Size: this.state.amount[0].containerSize });
    this.setState({ container1Price: this.state.amount[0].price });
    if (this.state.amount[1]) {
      this.setState({ container1Size: this.state.amount[1].containerSize });
      this.setState({ container1Price: this.state.amount[1].price });
    }
    if (this.state.amount[2]) {
      this.setState({ container1Size: this.state.amount[2].containerSize });
      this.setState({ container1Price: this.state.amount[2].price });
    }
    const pNotes = await res.purchaseNotes;
    this.setState({ purchaseNotes: pNotes });
  };

  handleCheck = (id) => {
    const name = $(`#${id}`).attr('name');
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
    setTimeout(() => console.log(this.state[array]), 1000);
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

  submitUpdate = () => {
    alert('Ima bust yo butt with dis dick, bitch.');
  };

  componentDidMount() {
    this.fetchItem();
  }

  render() {
    return (
      <React.Fragment>
        <h3>Update Inventory Item</h3>
        <Form
          // onSubmit={this.submitUpdate}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: '1vw',
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
          <Button onClick={() => console.log(this.state)}>console.log</Button>
          <Dropdowns
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            lowZone={this.state.lowZone}
            highZone={this.state.highZone}
            category={this.state.category}
          />
          <Descriptions
            handleChange={(e, field) =>
              this.setState({ [field]: e.target.value })
            }
            description={this.state.description}
            category={this.state.category}
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
              <UploadPhoto />
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
            foliage_semiEvergreen={this.state.foliage.includes('semiEvergreen')}
            foliage_deciduous={this.state.foliage.includes('deciduous')}
          />
          <Form.Group style={{ width: '100%' }} id="containerList">
            <hr />
            {this.state.amount.map((a, index) => {
              const cField = `container${index + 1}Size`;
              const pField = `container${index + 1}Price`;

              return (
                <div
                  className={styles.formGroup}
                  style={{ justifyContent: 'center' }}
                  key={a._key}
                >
                  <Form.Label>
                    {`Container ${index + 1} Size`}
                    <Form.Control
                      type="input"
                      name={`containerSize${index + 1}`}
                      id={`containerSize${index + 1}`}
                      value={this.state[cField]}
                      onChange={(e) =>
                        this.setState({ [cField]: e.target.value })
                      }
                    />
                  </Form.Label>
                  <Form.Label style={{ marginLeft: '2vw', marginRight: '2vw' }}>
                    Price
                    <Form.Control
                      type="number"
                      name={`price${index + 1}`}
                      value={this.state[pField]}
                      id={`containerPrice${index + 1}`}
                      onChange={(e) =>
                        this.setState({ [pField]: e.target.value })
                      }
                    />
                  </Form.Label>
                  <Form.Label>
                    <Button
                      variant="outline-dark"
                      onClick={() => this.addContainer()}
                    >
                      Add Another Container
                    </Button>
                  </Form.Label>
                </div>
              );
            })}
            <Form.Label>
              Purchase Notes
              <Form.Control
                style={{ width: '100%' }}
                rows="2"
                as="textarea"
                name="purchaseNotes"
                value={this.state.purchaseNotes}
                onChange={(e) =>
                  this.setState({ purchaseNotes: e.target.value })
                }
              />
            </Form.Label>
            <hr />
          </Form.Group>

          <hr />

          <div className={styles.formGroup}>
            <Button variant="warning" type="submit">
              Update This Item
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default UpdateItem;
