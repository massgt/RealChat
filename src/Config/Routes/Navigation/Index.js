import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Profile, MapsScreen, chatList} from '../../../Container/Pages/Index';
import IconProfile from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconChat from 'react-native-vector-icons/Ionicons';

const AppTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({tintcolor}) => (
          <IconProfile name="user" size={30} color='#128C7E' />
        ),
      },
    },
    MapsScreen: {
      screen: MapsScreen,
      navigationOptions: {
        tabBarIcon: ({tintcolor}) => (
          <Icon name="map-marked-alt" size={30} color='#128C7E' />
        ),
      },
    },
    // Chat: {
    //   screen: Chat,
    //   navigationOptions: {
    //     tabBarIcon: ({tintcolor}) => (
    //       <IconChat name="ios-chatbubbles" size={30} color='#128C7E'/>
    //     ),
    //   },
    // },
    chatList: {
      screen: chatList,
      navigationOptions: {
        tabBarIcon: ({tintcolor}) => (
          <IconChat name="ios-chatbubbles" size={30} color='#128C7E'/>
        ),
      },
    },
  },
  {
    initialRouteName: 'Profile',
    tabBarOptions: {
      activeTintColor: '#128C7E',
      inactiveTintColor: 'gray',
    },
  },
);

const Navigation = createSwitchNavigator(
    {
        App : AppTabNavigator,
    },
    {
        initialRouteName: 'App',
    },
)

export default createAppContainer(Navigation);
