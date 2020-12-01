import React, {useState} from 'react';
import {Button, Caption, Checkbox, Text, TextInput, Title} from 'react-native-paper';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Link} from 'react-router-native';

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'space-between',
    },
    page: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
    },
    text: {
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    input: {
        marginBottom: 10,
        borderRadius: 5,
    },
    btn: {
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

function Register() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [check, setCheck] = useState(false);

    return (
        <ScrollView contentContainerStyle={{...styles.page, ...styles.scroll}}>
            <View style={styles.container}>
                <Text style={{...styles.text, color: '#6200EE'}}>lover</Text>
                <View>
                    <Title style={styles.text}>Sign up</Title>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        underlineColor="transparent"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Password"
                        underlineColor="transparent"
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={(text) => setPass(text)}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Checkbox
                            status={check ? 'checked' : 'unchecked'}
                            onPress={() => setCheck((prev) => !prev)}
                            color={'blue'}
                        />
                        <Text onPress={() => setCheck((prev) => !prev)}>I agree with rights and terms</Text>
                    </View>
                </View>
                <View>
                    <Button style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
                        Continue
                    </Button>
                    <Link component={TouchableOpacity} to="/login">
                        <Caption style={styles.text}>I already have an account</Caption>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}

export default Register;