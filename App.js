import React from 'react';
import {NativeRouter, Route, Switch} from 'react-router-native';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import PasswordRecover from './components/auth/PasswordRecover';
import Create from './components/room/Create';
import Profil from './components/userProf/UserProf';

function App() {
    return (
        <NativeRouter>
            {/* isAuth ? Redirect to home : Login */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Register} />
                <Route exact path="/password_recover" component={PasswordRecover} />
                <Route exact path="/room/create" component={Create} />
                <Route exact path="/userProf/UserProf" component={Profil} />
            </Switch>
        </NativeRouter>
    );
}

export default App;
