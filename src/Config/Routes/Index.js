// import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Login, Register, Loading, Profile, editProfile, buttonNav, MapsScreen, Chat, FriendProfile, chatList} from '../../Container/Pages/Index';
import Navigation from './Navigation/Index';

const Authentication = createStackNavigator(
    {
        Login,
        Register,
    },
    {
        headerMode: 'none',
        initialRouteName: 'Login',
    },
);

const ChatStack = createStackNavigator(
    {
        Chat,
    },
    {
        headerMode: 'none',
        initialRouteName: 'Chat',
    }
);

const AppStack = createStackNavigator(
    {
        App: Navigation,
        editProfile,
        FriendProfile,
    },
    {
        headerMode: 'none',
        initialRouteName: 'App',
    }
)

const Router = createStackNavigator (
    {
        App: AppStack,
        Loading: Loading,
        Auth: Authentication,
        Chat: ChatStack
    },
    {
        headerMode: 'none',
        initialRouteName: 'Loading',
    },
);
export default createAppContainer(Router);