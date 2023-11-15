import React from 'react';
import { Route, Switch } from  'react-router-dom';
import CompanyRegistration from './views/CompanyRegistration';

function App () {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={CompanyRegistration} />
      </Switch>
    </div>
  )
}

export default App;