import React, {useState} from 'react';
import {Text, Title, TextInput, Button, Caption} from 'react-native-paper';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Link, useHistory} from 'react-router-native';
import auth from '@react-native-firebase/auth';

import {
  fixedBtn,
  input,
  page,
  flexContainer,
  container,
  colors,
} from '../../styles/index';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('zaxovaiko@gmail.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState({error: false, msg: ''});

  async function login() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        history.push('/');
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          setError({error: true, msg: 'User was not found.'});
        }

        if (err.code === 'auth/wrong-password') {
          setError({error: true, msg: 'Wrong password.'});
        }

        if (err.code === 'auth/invalid-email') {
          setError({error: true, msg: 'Invalid email.'});
        }

        console.error(err);
      });
  }

  return (
    <ScrollView contentContainerStyle={{...styles.container, ...styles.page}}>
      <View style={styles.flexContainer}>
        <Text style={{...styles.text, ...styles.color}}>lover</Text>
        <View>
          <Title style={styles.text}>Log in</Title>
          {error.error && <Text style={styles.error}>{error.msg}</Text>}
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            underlineColor="transparent"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry={true}
            value={password}
            underlineColor="transparent"
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.floatRight}>
            <Link component={TouchableOpacity} to="/password_recover">
              <Caption>Forgot password?</Caption>
            </Link>
          </View>
        </View>
        <View>
          <Button
            style={styles.fixedBtn}
            mode="contained"
            onPress={() => login()}>
            Log in
          </Button>
          <Link component={TouchableOpacity} to="/register">
            <Caption style={styles.text}>Sign up</Caption>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page,
  flexContainer,
  container,
  text: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  input,
  fixedBtn,
  floatRight: {
    alignItems: 'flex-end',
  },
  color: colors.primary,
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
