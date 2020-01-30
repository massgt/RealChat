import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Picker, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements'
import firebase from 'firebase';
import styles from './style.js';
import {ToastAndroid} from 'react-native';

// import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

class Login extends Component {
    state = {
        email:'',
        password:'',
        errorMessage: null
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('editProfile'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>LOGIN</Text>
                </View>
                <View style={{alignContent: 'center', paddingHorizontal: 40, paddingTop: 100}}>
                    <Input
                        inputContainerStyle={{height: 30}}
                        containerStyle={{marginBottom: 15, marginTop: 20}}
                        labelStyle={{
                        fontSize: 15,
                        color: 'grey'}}
                        label="E-mail"
                        placeholder="Enter e-mail"
                        inputStyle={{fontSize: 12}}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}/>
                    <Input
                        inputContainerStyle={{height: 30}}
                        containerStyle={{marginBottom: 15, marginTop: 9}}
                        labelStyle={{
                        fontSize: 15,
                        color: 'grey'}}
                        label="Password"
                        secureTextEntry={true}
                        placeholder="Enter password"
                        inputStyle={{fontSize: 12}}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}/>
                </View>
                <View style={styles.parReg}>
                    <TouchableOpacity
                        style={[styles.regButton, {backgroundColor: '#128C7E'}]}
                        onPress={() => this.handleLogin()}>
                        <Text style={styles.textButton}>
                        Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{fontSize: 15, marginTop: 20}}>
                        Don't have an account ? Register
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {this.state.errorMessage &&
                    ToastAndroid.showWithGravity(
                    this.state.errorMessage,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                    )}
                </View>
            </View>
        );
    }
}

export default Login;