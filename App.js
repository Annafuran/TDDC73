import React, { Component, useState} from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import normalize from 'react-native-normalize';
import Login from './components/Login'
import Email, {createEmail} from './components/Email'
import Username, {createUsername} from './components/Username'
import CreateUser, {createRetypePassword} from './components/CreateUser'
import Password, {createPassword} from './components/Password'
import LoadData, {loadedData} from './components/LoadData';

//MAIN
export default class App extends React.Component {
constructor(props) {
    super(props);

     //Initialize fonts. 
     //fetchFonts(); 
  	this.state = {data: loadedData };	
 }

//TODO
//LÄGG TILL ATT MAN KAN ÄNDRA OBLIGATORISKA FÄLT HÄR.
//FLYTTA VARJE KLASS TILL EGEN FIL. 
//KUNNA ÄNDRA OBLIGATORISKA KRAV PÅ PASSWORD FRÅN MAIN
//KAN ÄNDRA FÄRG OCH/ELLER TEXT PÅ PASSWORDSTRENGTHMETER.

   render() {
   	const headerLogo = require('./assets/logo-starstable.png');
   	const signInLogo = require('./assets/Logo2.png');
    const infoText = require('./welcometext.json');

    console.log(loadedData);

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
              <Email/>
              <Username/>
              <Password/>  
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

const styles = StyleSheet.create({
  container: {
    width : "100%",
    height: '100%',
    alignItems: "center",
    shadowOffset:{  width: 0,  height: 8,  },
    backgroundColor: 'rgba(240, 227, 255, 1.0)',

  },
  header: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    paddingTop: '1%',
    backgroundColor: 'rgb(56,56,56)',
    shadowOffset:{  width: 0,  height: 8,  },
	  shadowColor: 'grey',
	  shadowOpacity: 0.8,
	  shadowRadius: 8,
  },
  logo: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    resizeMode: 'contain',
    marginTop: '2%',

  },
  inputBox: { 
    height: 25, 
    borderRadius: 4, 
    borderColor: 'grey', 
    borderWidth: 1, 
    backgroundColor: 'white'
  },
  headerlogo: {
  	width: '60%',
    height: '60%',
   	resizeMode: 'contain',
   	justifyContent: 'center',
    marginTop: '5%',
  },
  row: {
    flexDirection: 'row',
  },
  insidecontent: {
  	flexDirection: 'column',
  	width: '90%',
    padding: '2%'
  },
  column: {
    alignItems: "center",
    width: '100%',
    paddingTop: '1%',
    flex: 1,
  },
  smallcontainer: {
  	width: '100%',
  	height: '100%',
  	backgroundColor: 'rgba(52, 52, 52, 0.1)',
  	borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'column',
    padding: '1%',
    shadowOffset:{  width: 0,  height: 1, },
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    paddingBottom: '30%',
    
  },
  largecontainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: '1%',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    shadowOffset:{  width: 0,  height: 1, },
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    flex: 1,

  },
  loginButton: {
    padding: '5%',
    borderRadius: 4,

  },
  insideSmallContainer: {
  	justifyContent: 'center',
  	padding: '5%',

  },
  textStyle: {
    fontSize: 14, 
    paddingRight: 30, 
    padding: '1%',
  //  fontFamily: 'OpenSans-Regular' 

  },
  introTextStyle: {
    fontSize: 15,
    paddingBottom: '3%',
  //  fontFamily: 'OpenSans-Bold' 
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  backgroundContainer: {
    width : "80%",
    height: '90%',
    alignItems: "center",
    paddingTop: '5%',
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  }

})