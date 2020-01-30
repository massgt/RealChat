import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEdit from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import firebase from 'firebase';
import Photo from '../../../Images/image.jpg';

class Profile extends Component {
    // state = { currentUser: null }

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
        //   dob: '',
          number: '',
          uploadURL:'',
        //   avatarSource: null
    
        //   latitude: '',
        //   longitude: '',
        //   lastPosition: ''
        };
        this.getImage();
        this.getUser();
      }

      getImage = async () => {
        const uid = await firebase.auth().currentUser.uid;
        const ref = await firebase
            .storage()
            .ref(`images/profile-photos`)
            .child(`${uid}.jpg`);
        const url = await ref.getDownloadURL();
        console.log('uirl', url);
        this.setState({
            uri: url,
        });
        console.log('this uri', this.state.uri);
    };

    getUser = async () => {
        const uid = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref(`/users/${uid}`);
        // const snapshot = await ref.once('value')
        // console.log(snapshot.val())
        ref
            .on('value', snapshot => {
                this.setState({
                spesificData: snapshot.val(),
                name: snapshot.val() != null ?  snapshot.val().name : '',
                email: snapshot.val() != null ?  snapshot.val().email : '',
                number: snapshot.val() != null ? snapshot.val().number : '',
                gender: snapshot.val() != null ? snapshot.val().gender : '',
                });
            })
            .catch(err => {
                console.log(err)  
            })
        }

    
    handleLogOut = () => {
        firebase.auth().signOut()
        .then (() => this.props.navigation.navigate('Register'))
    }
    
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.getImage()
        this.getUser()
    }


    render() {
        const {name, number, gender,} = this.state.spesificData || this.state
        const {email} = this.state;
        // const {currentUser} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection:'row', paddingTop: 8, paddingHorizontal: 15, justifyContent: 'space-between'}}>    
                        <Text style={{fontSize: 25,fontWeight: 'bold', color: 'white'}}>
                            Profile
                        </Text>
                        <TouchableOpacity
                        onPress={() => this.handleLogOut()}>
                            <Icon name='logout' size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 63, paddingRight: 85, alignSelf: 'flex-end'}}>
                        <TouchableOpacity
                        onPress = {() => this.props.navigation.navigate('editProfile')}>
                            <IconEdit name='edit' size={25} color='grey' color='white'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.headPic}>
                    <Image source={{uri:`${this.state.uri}` }} style={styles.picUser}/>
                </View>
                <View style={{top: 65, alignItems: 'center'}}>
                    <Text style={{fontSize:22, fontWeight: 'bold'}}>
                        {name ? name : name}
                    </Text>
                </View>
                <View style={{flexDirection: 'column', paddingHorizontal: 14, top: 130, alignItems: 'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 15}}>
                            Name :
                        </Text>
                        <Text style={{fontSize: 15, paddingLeft: 10}}>
                            {name ? name : name}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 7}}>
                        <Text style={{fontSize: 15}}>
                            Email :
                        </Text>
                        <Text style={{fontSize: 15, paddingLeft: 10}}>
                            {email ? email : email}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 7}}>
                        <Text style={{fontSize: 15}}>
                            Phone :
                        </Text>
                        <Text style={{fontSize: 15, paddingLeft: 10}}>
                            {number ? number : number}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 7}}>
                        <Text style={{fontSize: 15}}>
                            Gender :
                        </Text>
                        <Text style={{fontSize: 15, paddingLeft: 10}}>
                            {gender ? gender : gender}
                        </Text>
                    </View>
                </View>


                {/* <TouchableOpacity onPress={() => this.handleLogOut()}>
                    <Text style={{fontSize: 15, marginTop: 20}}>
                        Logout
                    </Text>
                </TouchableOpacity> */}
            </View>
            
        )
    }
}

export default Profile;