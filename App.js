import React, {useState, useEffect} from 'react';
import {NativeRouter, Route, BackButton} from 'react-router-native';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import {getUserById} from './api/user';
import AppContext from './contexts/AppContext';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PassRecover from './components/auth/password/Recover';
import PassChange from './components/auth/password/Change';
import Settings from './components/user/Settings';
import Setup from './components/user/Setup';

import Main from './components/Main';
import Profile from './components/user/Profile';
import Nearby from './components/Nearby';
import Liked from './components/Liked';

import CreateRoom from './components/room/Create';

import Groups from './components/chats/Groups';
import MainChat from './components/chats/MainChats';
import GroupChats from './components/chats/GroupChats';
import Correspondence from './components/chats/Correspondence';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [complete, setComplete] = useState(false);

  function onAuthStateChanged(usr) {
    setUser(usr);

    if (usr) {
      getUserById(usr.uid)
        .then((doc) => setComplete(doc.complete))
        .catch((err) => console.log(err, 'App onAuthStateChange error'));
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <AppContext.Provider value={{user, complete, setUser, setComplete}}>
      <PaperProvider>
        <NativeRouter>
          <BackButton>
            {user && !complete && (
              <>
                <Route exact path={['/', '/setup']} component={Setup} />
              </>
            )}
            {user && complete && (
              <>
                <Route exact path="/" component={Main} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/nearby" component={Nearby} />
                <Route exact path="/setup" component={Setup} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/password/change" component={PassChange} />
                <Route exact path="/chats/groups" component={Groups} />
                <Route exact path="/room/create" component={CreateRoom} />
                <Route exact path="/chats" component={MainChat} />
                <Route exact path="/chats/group" component={GroupChats} />
                <Route exact path="/chats/unique" component={Correspondence} />
                <Route exact path="/liked" component={Liked} />
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
    </AppContext.Provider>
  );
}

export default App;