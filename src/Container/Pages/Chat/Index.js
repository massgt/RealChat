import React, {Component} from 'react';
import {GiftedChat, Send, Bubble} from 'react-native-gifted-chat';
import firebase from 'firebase';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import fire from '../../../Config/firebase';
import styles from './style';

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      name: '',
      uid: '',
      url: '',

      friendName: '',
      friendUID: '',
      friendUrl: '',
      friendStatus: '',
      // lastSeen: '',
    };
    this.getUser();
    this.getChat();
  }

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/${uid}`);
    ref.on('value', snapshot => {
      this.setState({
        name: snapshot.val().name,
        uid: snapshot.val().uid,
        url: snapshot.val().urlImage,
      });
      console.log('snapp', snapshot.val().name)
    })
  };
  
  getFriendUser = async () => {
    const friendUID = await this.props.navigation.getParam('uid');
    const ref = firebase.database().ref(`/users/${friendUID}`);
    ref.on('value', snapshot => {
      console.log(snapshot.val().name)
      this.setState({
        friendName: `${snapshot.val().name}`,
        friendUrl: `${ snapshot.val().urlImage}`,
        friendStatus: `${snapshot.val().status}`
      })
    });
  }

  getChat = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${uid}/${this.state.friendUID}`)
    const ref2 = firebase.database().ref(`/chat/${this.state.friendUID}/${uid}`)
    let data = [];
    ref.on('child_added', async snapshot => {
      data.push(snapshot.val().messages)
    });
    
    ref2.on('child_added', async snapshot => {
      data.push(snapshot.val().messages)
    });

    data = data.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1
      } else if (a.createdAt > b.createdAt) {
        return -1
      }
      return 0
    })

    this.setState(previousState => ({
      messages: data,
    }));
  };

  async onSend(messages) {
    const {friendUID} = this.state;
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${uid}/${friendUID}/`);
    const ref2 = firebase.database().ref(`/read/${uid}/${friendUID}`);

    await ref.push({
      messages: {
        _id: Math.floor(Math.random() * 10000000000000) + 1,
        text: messages[0].text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: uid,
          avatar: `${this.state.url}`,
          name: `${this.state.name}`,
        },
      },
    });
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    this.getChat()
  }

  async componentDidMount() {
    const friendUID = await this.props.navigation.getParam('uid');
    await this.setState({
      friendUID,
    })
    await this.getUser()
    this.getChat()
    this.getFriendUser()
    this.interval = setInterval(() => {
      this.getChat()
    }, 2000); 
    // this.lastSeenInterval = setInterval(() => {
    //   this.getLastSeen()
    // }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    // clearInterval(this.lastSeenInterval)
  }

  // onSend(messages = []) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }))
  // }

  renderSend(props) {
    return (
      <Send
        {...props}>
        <View style={{ marginRight: 15,paddingVertical:5 }}>
          <Icon name="send" size={30} color="green"/>
        </View>
      </Send>
    );
  }

  renderBubble =  props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#FAF8F0',
          },
          left:{
            color:'#FAF8F0'
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#A6E0DE',
          },
          right: {
            backgroundColor:'#25D366'
          }
        }}/>
    );
  }

  render() {
    return (
      // <View style={{flex: 1}}>
      //   <GiftedChat 
      //        messages={this.state.messages}
      //        onSend={messages => this.onSend(messages)}
      //        user={{
      //          _id: 1,
      //        }}/>
      // </View>
      <>
        <View style={{ height: 60, backgroundColor:'#128C7E',elevation:2,flexDirection:'row',alignItems:'center',paddingHorizontal:15}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('chatList')}>
            <Icon name="chevron-left" size={20} color="#FAF8F0" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} 
            onPress={() => this.props.navigation.push('FriendProfile', {
              uid: this.state.friendUID,
            })}>
            <Image source={{ uri: `${this.state.friendUrl || 'none'}` }} style={{ marginLeft: 15, height: 50, width: 50, borderRadius: 50 }} />
          </TouchableOpacity>
          <View>
            <Text style={{ marginLeft: 15, fontSize: 18, color: '#FAF8F0' }}>{this.state.friendName}</Text>
            {/* <Text style={{ marginLeft: 15, fontSize: 12, color: '#FAF8F0' }}>
              {this.state.friendStatus == 'offline' ? this.state.lastSeen > '30' ? this.state.friendStatus : `Last Seen ${this.state.lastSeen} minutes ago` : this.state.friendStatus}
              </Text> */}
          </View>

        </View>
        <GiftedChat
          messagesContainerStyle={{ backgroundColor: '#FAF8F0' }}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            name: `${this.state.name}`,
            avatar: `${this.state.url}`,
          }}
        />
      </>
    );
  }
}

export default Chat;
