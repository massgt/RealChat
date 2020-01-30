import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase';
import styles from './style';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      trackViewChanges: true,
      userData: [],
      uid: '',
      isVisible: false,
      urlImage: '',
      friendName: '',
      friendGender: '',
      userUID: '',

      // mapRegion: null,
      // latitude: 0,
      // logitude: 0,
      // userList: [],

    };
    this.getAllUser();
  }


  getAllUser = () => {
    // const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/`);
    ref .on('value', async snapshot => {
      let data = [];
      await Object.keys(snapshot.val()).map(key => {
        data.push({
          uid: key,
          data: snapshot.val()[key],
        });
      });
      await this.setState({
        userData: data,
      });
        console.log('userData', this.state.userData);
        console.log('latitude', this.setState.userData[0].data.latitude)
      });
  }

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid
    this.setState({
      userUID: uid
    })
  }

  // handleProfile = async (url, uid) => {
  //   this.setState({
  //     isVisible: !this.state.isVisible,
  //     urlImage: url,
  //     uid
  //   })
  //   const ref = firebase.database().ref(`users/${uid}`)
  //   await ref.on('value', snapshot => {
  //     this.setState({
  //       friendName: snapshot.val().name,
  //       friendGender: snapshot.val().gender,
  //     });
  //   })
  // };




  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: -7.7584874,
            longitude: 110.3781121,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            {this.state.userData.map(data =>{
              {console.log('latitude', data.data.latitude)}
              return (
                <Marker
                onPress={() =>
                  this.props.navigation.push('FriendProfile', {
                    // userData: data.data.urlImage,
                    uid: data.data.uid
                  })}
                coordinate = {{
                  latitude: Number(data.data.latitude),
                  longitude: Number(data.data.longitude),
                }}
                title={data.data.name}
                description='offline'
                key={data.data.uid}>
                <View style={styles.marker}>
                <Image
                  source={{
                    uri: `${data.data.urlImage}`,
                  }}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    borderColor: 'white',
                    borderWidth: 1,
                  }}
                />
              </View>
                
                </Marker>
            )})}
          </MapView>
      </View>
    );
  }
}
