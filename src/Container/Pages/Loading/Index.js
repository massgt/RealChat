import React, {Component} from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';
import styles from './style.js'

class Loading extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Profile' : 'Register')
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

export default Loading;