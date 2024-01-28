import React from 'react';
import { Route, Switch } from 'react-router';
import './App.scss';
import Main from './components/Main/Main';
import Character from './components/Character/Character';

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/characters/:id" render={() => <Character />} />
                <Route path="/" render={() => <Main />} />
            </Switch>
        </div>
    );
};

export default App;
