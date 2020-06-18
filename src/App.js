import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditMain from './components/EditMain';
import Create from './components/Create';
import Update from './components/Update';
import UpdateItem from './components/UpdateItem';
import Delete from './components/Delete';
import DeleteItem from './components/DeleteItem';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Update N3 Database</h1>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={EditMain}></Route>
          <Route path="/create" exact component={Create}></Route>
          <Route path="/update" exact component={Update}></Route>
          <Route path="/update/:id" component={UpdateItem}></Route>
          <Route path="/delete" exact component={Delete}></Route>
          <Route path="/delete/:id" component={DeleteItem}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
