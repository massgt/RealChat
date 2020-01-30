import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEdit from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import firebase from 'firebase';
import Photo from '../../../Images/image.jpg';

class FriendProfile extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          uri: '',
          email: '',
          data: {},
          currentUser: null,
          spesificData: {},
    
          gender: '',
          name: '',
          number: '',
          uploadURL:'',
        //   avatarSource: null
    
        //   latitude: '',
        //   longitude: '',
        //   lastPosition: ''
        };
        this.getUser();
      }
    
    getUser = async () => {
        const uid = await this.props.navigation.getParam('uid')
        const ref = firebase.database().ref(`/users/${uid}`);
        ref
            .on('value', snapshot => {
                this.setState({
                spesificData: snapshot.val(),
                name: snapshot.val() != null ?  snapshot.val().name : '',
                email: snapshot.val() != null ?  snapshot.val().email : '',
                number: snapshot.val() != null ? snapshot.val().number : '',
                gender: snapshot.val() != null ? snapshot.val().gender : '',
                uri: snapshot.val() != null ? snapshot.val().urlImage: '',
                });
            })
      }

      componentDidMount(){
          this.getUser()
      }




    render() {
        const {name, number, gender,} = this.state.spesificData || this.state
        const {email} = this.state;
        // const {currentUser} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text
                        style={{
                        fontSize: 23,
                        top: 30,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        }}>
                        {name ? name : name}
                        {/* Sigit Wijaya */}
                    </Text>
                </View>
                <View style={styles.headPic}>
                    <Image source={{uri:`${this.state.uri}` }} style={styles.picUser}/>
                    {/* <Image source={Photo} style={styles.picUser}/> */}
                </View>
                <View style={{flexDirection: 'column', paddingHorizontal: 14, top: 130, alignItems: 'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 17}}>
                            Name :
                        </Text>
                        <Text style={{fontSize: 17, paddingLeft: 10}}>
                            {name ? name : name}
                            {/* Sigit Wijaya */}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 7}}>
                        <Text style={{fontSize: 17}}>
                            Email :
                        </Text>
                        <Text style={{fontSize: 17, paddingLeft: 10}}>
                            {email ? email : email}
                            {/* massgt@gmail.com */}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 7}}>
                        <Text style={{fontSize: 17}}>
                            Phone :
                        </Text>
                        <Text style={{fontSize: 17, paddingLeft: 10}}>
                            {number ? number : number}
                            {/* 081369988935 */}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 7}}>
                        <Text style={{fontSize: 17}}>
                            Gender :
                        </Text>
                        <Text style={{fontSize: 17, paddingLeft: 10}}>
                            {gender ? gender : gender}
                            {/* Male */}
                        </Text>
                    </View>
                </View>
                <View style={styles.parReg}>
                    <TouchableOpacity
                        style={[styles.regButton, {backgroundColor: '#128C7E'}]}
                        onPress ={() => this.props.navigation.push('Chat', {
                            uid: this.state.spesificData.uid
                        })}>
                        <Text style={styles.textButton}>Chat</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}

export default FriendProfile;