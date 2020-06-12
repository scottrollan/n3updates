import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditMain from './components/EditMain';
import Create from './components/Create';
import Update from './components/Update';
import UpdateItem from './components/UpdateItem';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Update N3 Database</h1>
      <Router>
        <Switch>
          <Route path="/" exact component={EditMain}></Route>
          <Route path="/create" exact component={Create}></Route>
          <Route path="/update" exact component={Update}></Route>
          <Route path="/update/:id" component={UpdateItem}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
