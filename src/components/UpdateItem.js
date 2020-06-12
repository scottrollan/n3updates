import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import UploadPhoto from './UploadPhoto';
import styles from './Stylesheet.module.scss';

const UpdateItem = ({ match }) => {
  useEffect(() => {
    fetchItem();
  }, [match]);

  const [item, setItem] = useState({});
  const [botanicalName, setBotanicalName] = useState('');
  const [variety, setVariety] = useState('');
  const [commonName, setCommonName] = useState('');
  const [regionalName, setRegionalName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [lowZone, setLowZone] = useState(0);
  const [highZone, setHighZone] = useState(0);
  const [optionText, setOptionText] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [soilType, setSoilType] = useState([]);
  const [soilPH, setSoilPH] = useState([]);
  const [waterLevel, setWaterLevel] = useState([]);
  const [sunlightLevel, setSunlightLevel] = useState([]);
  const [foliage, setFoliage] = useState([]);
  const [amount, setAmount] = useState([]);
  const [purchaseNotes, setPurchaseNotes] = useState('');

  const fetchItem = async () => {
    const sanityClient = require('@sanity/client');
    const client = sanityClient({
      projectId: 'ogg4t6rs',
      dataset: 'production',
      token: '',
      useCdn: true, // `false` if you want to ensure fresh data
    });
    const query = `*[_id == "${match.params.id}"]`;

    const response = await client.fetch(query);
    const res = await response[0];
    setItem(res);
    const bName = await res.botanicalName;
    setBotanicalName(bName);
    const vName = await res.variety;
    setVariety(vName);
    const cName = await res.commonName;
    setCommonName(cName);
    const rName = await res.regionalName;
    setRegionalName(rName);
    const desc = await res.description;
    setDescription(desc);
    const nt = await res.notes;
    setNotes(nt);
    const opt = await res.category;
    const option = opt.substr(0, 1).toUpperCase() + opt.substr(1);
    setOptionText(option);
    setCategory(option);
    const foto = await res.image.asset._ref;
    console.log(foto);
    const photoArray = foto.split('-');
    const photoUrl = `https://cdn.sanity.io/images/ogg4t6rs/production/${photoArray[1]}-${photoArray[2]}.${photoArray[3]}`;
    setPhotoLink(photoUrl);
    const soilTypeArray = await res.soilType;
    setSoilType(soilTypeArray);
    const soilPHArray = await res.soilPH;
    setSoilPH(soilPHArray);
    const waterLevelArray = await res.waterLevel;
    setWaterLevel(waterLevelArray);
    const sunlightLevelArray = await res.sunlightLevel;
    setSunlightLevel(sunlightLevelArray);
    const foliageArray = await res.foliage;
    setFoliage(foliageArray);
    const amountArray = await res.amount;
    setAmount(amountArray);
    const pNotes = await res.purchaseNotes;
    setPurchaseNotes(pNotes);
  };

  const addContainer = () => {
    $('#containerList').append(
      "<div class='Stylesheet_amountDiv__2DYND'><label class='form-label'>New Container Size<input class='form-control' type='input' name='containerNew' /></label><label class='form-label'>New Container Price<input class='form-control' type='number' name='priceNew' /></label></div>"
    );
  };

  return (
    <React.Fragment>
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
              value={botanicalName}
              onChange={(e) => setBotanicalName(e.target.value)}
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
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Common Name
            <Form.Control
              type="text"
              name="commonName"
              value={commonName}
              onChange={(e) => setCommonName(e.target.value)}
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
              value={regionalName}
              onChange={(e) => setRegionalName(e.target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Category
            <Form.Control
              as="select"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={category}>{optionText}</option>
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
            <Form.Control as="select" required>
              <option value={item.lowZone}>{item.lowZone}</option>
              <option vale="1">1</option>
              <option vale="2">2</option>
              <option vale="3">3</option>
              <option vale="4">4</option>
              <option vale="5">5</option>
              <option vale="6">6</option>
              <option vale="7">7</option>
              <option vale="8">8</option>
              <option vale="9">9</option>
              <option vale="10">10</option>
              <option vale="11">11</option>
            </Form.Control>
          </Form.Label>
          <Form.Label>
            To Zone
            <Form.Control as="select" required>
              <option value={item.highZone}>{item.highZone}</option>
              <option vale="2">2</option>
              <option vale="3">3</option>
              <option vale="4">4</option>
              <option vale="5">5</option>
              <option vale="6">6</option>
              <option vale="7">7</option>
              <option vale="8">8</option>
              <option vale="9">9</option>
              <option vale="10">10</option>
              <option vale="11">11</option>
              <option vale="12">12</option>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              src={photoLink}
              alt="none"
              style={{ width: '100%', height: 'auto' }}
            />
          </Form.Label>
          <span className={styles.smallSection} style={{ alignSelf: 'center' }}>
            <UploadPhoto />
          </span>
        </Form.Group>
        <Form.Group>
          <div className={[`mb-3 ${styles.checkGroup}`]}>
            Soil Type
            <Form.Check
              type="checkbox"
              checked={soilType.includes('clay')}
              id={`soilTypeClay`}
              label="clay"
            />
            <Form.Check
              type="checkbox"
              checked={soilType.includes('average')}
              id={`soilTypeAverage`}
              label="average"
            />
            <Form.Check
              type="checkbox"
              checked={soilType.includes('sand')}
              id={`soilTypeSand`}
              label="sand"
            />
          </div>
        </Form.Group>{' '}
        <Form.Group>
          <div className={[`mb-3 ${styles.checkGroup}`]}>
            Soil pH
            <Form.Check
              type="checkbox"
              checked={soilPH.includes('acid')}
              id={`soilPHAcid`}
              label="acid"
            />
            <Form.Check
              type="checkbox"
              checked={soilPH.includes('neutral')}
              id={`soilPHNeutral`}
              label="neutral"
            />
            <Form.Check
              type="checkbox"
              checked={soilPH.includes('alkaline')}
              id={`soilPHAlkaline`}
              label="alkaline"
            />
          </div>
        </Form.Group>{' '}
        <Form.Group>
          <div className={[`mb-3 ${styles.checkGroup}`]}>
            Water Level
            <Form.Check
              type="checkbox"
              checked={waterLevel.includes('dry')}
              id={`waterLevelDry`}
              label="dry"
            />
            <Form.Check
              type="checkbox"
              checked={waterLevel.includes('average')}
              id={`waterLevelAverage`}
              label="average"
            />
            <Form.Check
              type="checkbox"
              checked={waterLevel.includes('wet')}
              id={`waterLevelWet`}
              label="wet"
            />
          </div>
        </Form.Group>{' '}
        <Form.Group>
          <div className={[`mb-3 ${styles.checkGroup}`]}>
            Sun Exposure
            <Form.Check
              type="checkbox"
              checked={sunlightLevel.includes('full')}
              id={`sunlightLevelFull`}
              label="full"
            />
            <Form.Check
              type="checkbox"
              checked={sunlightLevel.includes('partial')}
              id={`sunlightLevelPartial`}
              label="partial"
            />
            <Form.Check
              type="checkbox"
              checked={sunlightLevel.includes('shade')}
              id={`sunlightLevelShade`}
              label="shade"
            />
          </div>
        </Form.Group>{' '}
        <Form.Group>
          <div className={[`mb-3 ${styles.checkGroup}`]}>
            Foliage
            <Form.Check
              type="checkbox"
              checked={foliage.includes('evergreen')}
              id={`foliageEvergreen`}
              label="evergreen"
            />
            <Form.Check
              type="checkbox"
              checked={foliage.includes('semi-evergreen')}
              id={`foliageSemi-evergreen`}
              label="semi-evergreen"
            />
            <Form.Check
              type="checkbox"
              checked={foliage.includes('deciduous')}
              id={`foliageDeciduous`}
              label="deciduous"
            />
          </div>
        </Form.Group>
        <Form.Group style={{ width: '100%' }} id="containerList">
          {amount.map((a, index) => (
            <div className={styles.amountDiv} key={a._key}>
              <Form.Label>
                {`Container ${index + 1} Size`}
                <Form.Control
                  type="input"
                  name={`containerSize${index + 1}`}
                  value={a.containerSize}
                />
              </Form.Label>
              <Form.Label>
                Price
                <Form.Control
                  type="number"
                  name={`price${index + 1}`}
                  value={a.price}
                />
              </Form.Label>
            </div>
          ))}
        </Form.Group>
        <Button onClick={() => addContainer()}>Add Container</Button>
        <Form.Group style={{ width: '100%' }}>
          <Form.Label>
            Purchase Notes
            <Form.Control
              style={{ width: '100%' }}
              rows="2"
              as="textarea"
              name="purchaseNotes"
              value={purchaseNotes}
              onChange={(e) => setPurchaseNotes(e.target.value)}
            />
          </Form.Label>
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};

export default UpdateItem;
