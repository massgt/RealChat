import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconPhoto from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import fire from '../../../Config/firebase';
import ImagePicker from 'react-native-image-picker';
import styles from './style';
import Photo from '../../../Images/image.jpg';
import Geolocation from 'react-native-geolocation-service';

const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = async (uri, mime = 'application/octet-stream') => {
  const uid = await firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageRef = storage.ref('images/profile-photos').child(`${uid}.jpg`);

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });
};

class editProfile extends Component {
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
      uploadURL: '',

      latitude: '',
      longitude: '',
      lastPosition: '',
    };
    this.getImage();
  }

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/${uid}`);
    // const snapshot = await ref.once('value')
    // console.log(snapshot.val())
    ref
      .on('value', snapshot => {
        this.setState({
          spesificData: snapshot.val(),
          name: snapshot.val() != null ? snapshot.val().name : '',
          number: snapshot.val() != null ? snapshot.val().number : '',
          gender: snapshot.val() != null ? snapshot.val().gender : '',
        });
      })
      .then(res => {
        res
          ? console.log('statedaataa', this.state.spesificData)
          : ToastAndroid.showWithGravity(
              `Insert Your Data`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
      })
      .catch(err => {
        console.log(err);
      });
  };

  insertData = async () => {
    const {name, gender, number, uri, latitude, longitude} = this.state;
    const uid = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;
    const ref = firebase.database().ref(`/users/${uid}`);
    await ref.set({
      email,
      uid,
      name,
      gender,
      number,
      latitude,
      longitude,
      urlImage: uri,
      date: new Date().getTime(),
    });
    this.getUser();
  };

  _pickImage() {
    this.setState({uploadURL: ''});

    ImagePicker.showImagePicker({}, response => {
      uploadImage(response.uri)
        .then(url => this.setState({uploadURL: url}))
        .then(response => this.getImage())
        .catch(error => console.log(error))
        .catch(error => console.log(error));
    });
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

  async componentDidMount() {
      console.log('error gak ya')
    //Location
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location ',
      },
    );
      console.log('error gak nih')
    if (granted) {
      console.log('FIRST');
      Geolocation.getCurrentPosition(
        position => {
        //   console.log('My current location', JSON.stringify(position));
          // console.log('POSITION', position);
          this.setState({
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            });
            console.log('Position', position);
        //   console.log('Latitude', this.state.latitude);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
      this.watchID = Geolocation.watchPosition(lastPosition => {
        this.setState({lastPosition});
      });
    }

    let data = await firebase.auth().currentUser;
    console.log('aaa', data);
    await this.setState({
      data: data,
      email: data.email,
      // });
      // await this.getUser();
    });

    this.getUser();
    this.getImage();
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  render() {
    const {name} = this.state.spesificData || this.state;
    const {email} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 23,
              top: 40,
              fontWeight: 'bold',
              alignSelf: 'center',
              color: 'white'
            }}>
            {name ? name : name}
          </Text>
        </View>
        <View style={styles.headPic}>
          {this.state.uri == '' ? (
            <>
              <Image source={Photo} style={styles.picUser} />
              <TouchableOpacity
                onPress={() => this._pickImage()}
                style={{left: 50, top: 30}}>
                <IconPhoto name="add-a-photo" size={25} color="grey" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                source={{uri: `${this.state.uri}`}}
                style={styles.picUser}
              />
              <TouchableOpacity
                onPress={() => this._pickImage()}
                style={{left: 50, top: 30}}>
                <IconPhoto name="add-a-photo" size={25} color="grey" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={{
            alignContent: 'center',
            paddingHorizontal: 40,
            paddingTop: 80,
          }}>
          <Input
            inputContainerStyle={{height: 30}}
            containerStyle={{marginBottom: 10}}
            labelStyle={{
              fontSize: 15,
              color: 'grey',
            }}
            label="Name"
            placeholder="Enter name"
            inputStyle={{fontSize: 12}}
            value={this.state.name}
            onChangeText={(itemValue, itemIndex) => {
              this.setState({name: itemValue});
            }}
          />
          <Input
            editable={false}
            value={email}
            inputContainerStyle={{height: 30}}
            containerStyle={{marginBottom: 10}}
            labelStyle={{
              fontSize: 15,
              color: 'grey',
            }}
            label="Email"
            placeholder="Enter email"
            inputStyle={{fontSize: 12}}
          />
          <Input
            value={this.state.number}
            inputContainerStyle={{height: 30}}
            containerStyle={{marginBottom: 3}}
            labelStyle={{
              fontSize: 15,
              color: 'grey',
            }}
            label="Phone"
            placeholder="Enter Phone"
            inputStyle={{fontSize: 12}}
            onChangeText={(itemValue, itemIndex) => {
              this.setState({number: itemValue});
            }}
          />
          <Picker
            selectedValue={this.state.gender}
            style={{
              height: 50,
              width: '100%',
              color: 'grey',
              fontWeight: 'bold',
            }}
            mode={'dropdown'}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }>
            <Picker.Item label="- Gender -" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        <View style={styles.parReg}>
          <TouchableOpacity
            style={[styles.regButton, {backgroundColor: '#128C7E'}]}
            onPress={() => this.insertData()}
            // onPress ={() => this.props.navigation.navigate('Profile')}
          >
            <Text style={styles.textButton}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default editProfile;
