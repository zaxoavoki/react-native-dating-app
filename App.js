import React, {useState, useEffect} from 'react';
import {NativeRouter, Route, BackButton} from 'react-router-native';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PassRecover from './components/auth/password/Recover';
import PassChange from './components/auth/password/Change';
import Settings from './components/user/Settings';
import Setup from './components/user/Setup';

import Main from './components/Main';
import Profile from './components/user/Profile';
import Nearby from './components/Nearby';

import CreateRoom from './components/room/Create';
import Chats from './components/chats/Chats';
import Groups from './components/chats/Groups';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    console.log(auth().currentUser);
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <PaperProvider>
      <NativeRouter>
        <BackButton>
          {user && (
            <>
              <Route exact path="/" component={Main} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/nearby" component={Nearby} />
              <Route exact path="/setup" component={Setup} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/password/change" component={PassChange} />
              <Route exact path="/chats" component={Chats} />
              <Route exact path="/rooms" component={Groups} />
              <Route exact path="/rooms/create" component={CreateRoom} />
            </>
          )}
          {!user && (
            <>
              <Route exact path={['/', '/login']} component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/password/recover" component={PassRecover} />
            </>
          )}
        </BackButton>
      </NativeRouter>
    </PaperProvider>
  );
}

export default App;
