import React from 'react';
import NewItem from './NewItem';

class Create extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>Create New Inventory Item</h3>
        <NewItem />
      </React.Fragment>
    );
  }
}

export default Create;
