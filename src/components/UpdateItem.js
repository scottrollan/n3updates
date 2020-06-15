import React from 'react';
import { Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import Conditions from './inputSections/Conditions';
import UploadPhoto from './UploadPhoto';
import styles from './Stylesheet.module.scss';

class UpdateItem extends React.Component {
  state = {
    item: {},
    matchId: this.props.match.params.id,
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
    purchaseNotes: '',
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
  fetchItem = async () => {
    const sanityClient = require('@sanity/client');
    const client = sanityClient({
      projectId: 'ogg4t6rs',
      dataset: 'production',
      token: '',
      useCdn: true, // `false` if you want to ensure fresh data
    });
    const query = `*[_id == "${this.state.matchId}"]`;

    const response = await client.fetch(query);
    const res = await response[0];
    console.log(res);
    const bName = await res.botanicalName;
    this.setState({ botanicalName: bName });
    const vName = await res.variety;
    this.setState({ variety: vName });
    const cName = await res.commonName;
    this.setState({ commonName: cName });
    const rName = await res.regionalName;
    this.setState({ regionalName: rName });
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
    this.setState({ amount: amountArray });
    const pNotes = await res.purchaseNotes;
    this.setState({ purchaseNotes: pNotes });
  };

  containerSize = (value, number) => {
    const fString = `setAmount_Container${number}Size(${value})`;
    return fString;
  };
  containerPricee = (value, number) => {
    const fString = `setAmount_Container${number}Price(${value})`;
    return fString;
  };

  addContainer = () => {
    $('#containerList').append(
      "<div class='Stylesheet_amountDiv__2DYND'><label class='form-label'>New Container Size<input class='form-control' type='input' name='containerNew' /></label><label class='form-label'>New Container Price<input class='form-control' type='number' name='priceNew' /></label></div>"
    );
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.fetchItem();
  }

  render() {
    return (
      <React.Fragment>
        <h3>Update Inventory Item</h3>
        <Form
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: '1vw',
          }}
        >
          <Form.Group>
            <Form.Label>
              Botanical Name
              <Form.Control
                type="text"
                name="botanicalName"
                value={this.state.botanicalName}
                onChange={(e) =>
                  this.setState({ botanicalName: e.target.value })
                }
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Variety (if any)
              <Form.Control
                type="text"
                name="variety"
                value={this.state.variety}
                onChange={(e) => this.setState({ variety: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Common Name
              <Form.Control
                type="text"
                name="commonName"
                value={this.state.commonName}
                onChange={(e) => this.setState({ commonName: e.target.value })}
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Regional Name
              <Form.Control
                type="text"
                name="regionalName"
                value={this.state.regionalName}
                onChange={(e) =>
                  this.setState({ regionalName: e.target.value })
                }
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Category
              <Form.Control
                as="select"
                required
                value={this.state.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              >
                <option value={this.state.category}>
                  {this.state.optionText}
                </option>
                <option value="shrubs">Shrubs</option>
                <option value="trees">Trees</option>
                <option value="palms">Palms</option>
                <option value="opuntia">Opuntia</option>
                <option value="perennials">Perennials</option>
                <option value="grasses">Grasses</option>
                <option value="ferns">Ferns</option>
                <option value="vines">Vines</option>
                <option value="seeds">Seeds</option>
                <option value="yucca">Yucca</option>
              </Form.Control>
            </Form.Label>
          </Form.Group>
          <Form.Group
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Form.Label style={{ marginRight: '2vw' }}>
              From Zone
              <Form.Control
                as="select"
                required
                onChange={(e) => this.setState({ lowZone: e.target.value })}
              >
                <option value={this.state.lowZone}>{this.state.lowZone}</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
              </Form.Control>
            </Form.Label>
            <Form.Label>
              To Zone
              <Form.Control
                as="select"
                required
                onChange={(e) => this.setState({ highZone: e.target.value })}
              >
                <option value={this.state.highZone}>
                  {this.state.highZone}
                </option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option vale={12}>12</option>
              </Form.Control>
            </Form.Label>
          </Form.Group>
          <Form.Group className={styles.descrPhoto}>
            <Form.Label className={styles.largeSection}>
              Description
              <Form.Control
                style={{ width: '100%' }}
                rows="8"
                as="textarea"
                name="description"
                value={this.state.typedescription}
                onChange={(e) => this.setState({ description: e.target.value })}
                required
              />
            </Form.Label>
            <Form.Label className={styles.smallSection}>
              Notes
              <Form.Control
                style={{ width: '100%' }}
                rows="2"
                as="textarea"
                name="notes"
                value={this.state.notes}
                onChange={(e) => this.setState({ notes: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
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
            {this.state.amount.map((a, index) => (
              <div className={styles.amountDiv} key={a._key}>
                <Form.Label>
                  {`Container ${index + 1} Size`}
                  <Form.Control
                    type="input"
                    name={`containerSize${index + 1}`}
                    value={a.containerSize}
                    onChange={(e) =>
                      this.containerSize(e.target.value, index + 1)
                    }
                  />
                </Form.Label>
                <Form.Label>
                  Price
                  <Form.Control
                    type="number"
                    name={`price${index + 1}`}
                    value={a.price}
                    onChange={(e) =>
                      this.containerPrice(e.target.value, index + 1)
                    }
                  />
                </Form.Label>
              </div>
            ))}
          </Form.Group>
          <Button onClick={() => this.addContainer()}>Add Container</Button>
          <Form.Group style={{ width: '100%' }}>
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
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}

export default UpdateItem;
