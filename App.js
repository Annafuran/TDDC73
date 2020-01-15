import React, { Component, useState} from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import normalize from 'react-native-normalize';
import Login from './components/Login'
import Email, {createEmail} from './components/Email'
import Username, {createUsername} from './components/Username'
import CreateUser, {createRetypePassword} from './components/CreateUser'
import PasswordPost, {createPassword} from './components/password'
import LoadData, {loadedData} from './components/LoadData';
import styles from './components/style';
import Star from './components/star'

//Select the mandotary fields. 
export var chooseMandEmail = true;
export var chooseMandUsername = true;
export var chooseMandPassword = true;
export var chooseMandTerms = true;

//Specify demands for the password. 
export var passwordLength = 1;
export var specialCharPassword = false;
export var mixedCharacters = false;
export var containNumbers = true;

//Specify colors of the passwordMeter. 
export var weakColor = 'red';
export var fairColor = 'yellow';
export var goodColor = 'orange';
export var strongColor = 'lightgreen';
export var veryStrongColor = 'green';

//Our default class. 
export default class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {data: loadedData, };
 }

//TODO
//LÄGG TILL ATT MAN KAN ÄNDRA OBLIGATORISKA FÄLT HÄR.--check
//KUNNA ÄNDRA OBLIGATORISKA KRAV PÅ PASSWORD FRÅN MAIN -- check
//KAN ÄNDRA FÄRG OCH/ELLER TEXT PÅ PASSWORDSTRENGTHMETER. -- check. 
//FLYTTA VARJE KLASS TILL EGEN FIL. --check

   render() {
    const headerLogo = require('./assets/logo-starstable.png');
    const signInLogo = require('./assets/Logo2.png');

       return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Image source={signInLogo} style={styles.headerlogo}/>
          </View>
          <View style = {styles.backgroundContainer}>
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
              <ScrollView>
                <View style={styles.column}>
                  <Text style={styles.introTextStyle}>New user? Sign up today!</Text>
                    <View style = {styles.largecontainer}>
                      <Star/>
                      <Email/>
                      <Username/>
                      <PasswordPost/>
                      <CreateUser/>
                    </View>
                  </View>
                <View style={styles.column}>
                  <Text style={styles.introTextStyle}>Sign in</Text>
                    <View style={styles.smallcontainer}>
                      <Image source={headerLogo} style={styles.logo}/>
                        <Login/>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
    );
   }
};
