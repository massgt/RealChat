import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Picker, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native';
import {Input} from 'react-native-elements'
import styles from './style.js';
import firebase from 'firebase';
// import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

class Register extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({errorMessage: error.message}))
            
        console.log('handleSignUp')
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>REGISTER</Text>
                </View>
                <View style={styles.formInput}>
                    <Input
                        inputContainerStyle={{height: 30}}
                        containerStyle={{marginBottom: 15, marginTop: 20}}
                        labelStyle={styles.labelEmail}
                        label="E-mail"
                        placeholder="Enter e-mail"
                        inputStyle={{fontSize: 12}}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        />
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
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        />
                </View>
                <View style={styles.parReg}>
                    <TouchableOpacity
                        style={[styles.regButton, {backgroundColor: '#128C7E'}]}
                        onPress = {() => this.handleSignUp()}>
                        <Text style={styles.textButton}>
                        Register
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{fontSize: 15, marginTop: 20}}>
                            Already have an account ? Login
                            </Text>
                    </TouchableOpacity>
                <View>
                    {this.state.errorMessage &&
                    ToastAndroid.showWithGravity(
                    this.state.errorMessage,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                    )}
                </View>
                </View>
                {/* <View style={styles.loading}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large" />
                </View> */}
                
            </View>
        );
    }
}

export default Register;