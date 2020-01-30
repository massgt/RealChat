import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'firebase';
import styles from './style';
import Photo from '../../../Images/image.jpg';

class chatList extends Component {

  constructor() {
    super();
    this.state = {
      userData: [],
      uid: '',
      urlImage: '',
      friendName: '',
    };
    this.getAllUser();
  }

  getAllUser = () => {
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
        // console.log('userData', this.state.userData);
      });
  }

  componentDidMount() {
    this.getAllUser()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'White',
            height: 58,
            paddingLeft: 16,
            // borderBottomWidth: 1,
            borderColor: '#ACADAF',
            justifyContent: 'center',
            marginBottom: 3,
            elevation: 2,
          }}>
          <Text style={{fontSize: 26, fontWeight: 'bold'}}>Chats</Text>
        </View>
        <ScrollView>
          {this.state.userData.map(data => {
            return(
          <TouchableOpacity
          onPress = {() => this.props.navigation.push('Chat', {
            uid: data.data.uid
          })}>
              <View
            style={{
              backgroundColor: '',
            //   borderTopWidth: 1,
              marginTop: 3,
              borderBottomWidth: 1,
              borderColor: '#ACADAF',
              height: 85,
              paddingLeft: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: `${data.data.urlImage}`}}
              style={{width: 70, height: 70, borderRadius: 100}}/>
            <View style={{paddingLeft: 15}}>
              <Text style={{fontSize: 19}}>
                {data.data.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
            )
          })}
        </ScrollView>
        {/* <TouchableOpacity>
          <View
            style={{
              backgroundColor: '',
            //   borderTopWidth: 1,
              marginTop: 3,
              borderBottomWidth: 1,
              borderColor: '#ACADAF',
              paddingLeft: 16,
              height: 85,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Photo}
              style={{width: 70, height: 70, borderRadius: 100}}/>
            <View style={{paddingLeft: 15}}>
              <Text style={{fontSize: 19}}>Sigit Wijaya</Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default chatList;
