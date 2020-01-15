
import React, { Component, useState} from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import LoadData, {loadedData} from './LoadData';
import Username, {createUsername} from './Username';
import Password, {createPassword} from './Password';
import Email, {createEmail} from './Email';
import {CheckBox} from 'react-native-elements';

export var createRetypePassword = '';
var acceptedTerms = false;

function matchingPasswords(){

  if(createRetypePassword == createPassword){
    return true;
  }else{
    return false;
  }
}

function createUser(){

  if(createUsername != '' && createRetypePassword != '' 
      && createPassword != '' && createEmail != '' && acceptedTerms){

    var tempUsernameExist = false;
    var tempEmailExist = false;
    const data = loadedData;
    var temp = '';

    Object.keys(data).map(function(key){ 
      
      var item = data[key];
      var selectedUser =({id: item.id, email: item.email});

      //Check if user exists. 
      if(createUsername == selectedUser.id){
        tempUsernameExist = true;
        console.log("username already exist");
        temp =  "Username already exist";   
      }
      if(createEmail == selectedUser.email){  
        tempEmailExist  = true;
        console.log("Email already exist");
       temp ="Email already exist";    
     // console.log(UserExist);  
      }
    })

    if(tempUsernameExist ||  tempEmailExist){
      return temp;
    }
    

  if(!matchingPasswords()){
    console.log("NO MATCHY MATCHY");
    return "The passwords must match!";
  }
  else if(matchingPasswords() && acceptedTerms)
  {
    console.log("yay");
  
    if(!tempEmailExist && !tempUsernameExist){
      return "You have created a user!";
    }
  }
}
  else {

    console.log("all fields must be full");
    return "All the mandotary fields must be filled";
  } 
}

//Compare password and create user
class CreateUser extends React.Component {
 constructor(props) {
   super(props);
   this.state = { value: '', resultText: '', checked: false};

   this.handleChange = this.handleChange.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.handleChecked = this.handleChecked.bind(this);

 }

 handleChange(value) {
    this.setState({value: value});
  }

  handleClick(){
    var tempText = createUser();
    
    this.setState({resultText: tempText});
  }
  handleChecked(){
    this.setState({ checked: !this.state.checked});
  }

 render() {
  const inputText = this.state.value;
  createRetypePassword = inputText;
  var warningText = '';
  var resultingWarningText = this.state.resultText;
  acceptedTerms = this.state.checked;
  
  if(!matchingPasswords()){
    warningText = "The passwords is not matching!"
  }
    return(   
      <View style={styles.insidecontent}>
        <View style = {styles.row}>
        <Text style={styles.textStyle}>Re-type password</Text>
        <Text style = {{marginLeft: -25, color : 'red'}}>*</Text>
        </View> 
          <TextInput
          secureTextEntry = {true} 
          value = {this.state.value}
          onChangeText = {this.handleChange.bind(this)}
          placeholder=' Re-type your password'
          style={styles.inputBox}
          />
        <Text style={{fontSize: 12, paddingRight: 30, color: 'red'}}>{warningText}</Text> 
        <View style = {styles.row}>
        <CheckBox  onPress={this.handleChecked} checked = {this.state.checked}/>
        <Text style={{marginTop: 10, marginLeft: -15}}>I agree to the terms {"\n"}and conditions</Text>
        <Text style = {{marginTop: 25, marginLeft: -25, color : 'red'}}>*</Text>
        </View>
        <View style ={styles.loginButton}>
               <Button
               color= 'rgba(62, 32, 109, 1.0)'
              title="Register new user"
              raised ="true"
              onPress={this.handleClick}          
              />
              <Text style={{fontSize: 12, paddingRight: 30, color: 'red'}}>{resultingWarningText}</Text> 
        </View>
    </View>     
    );
  }
}

export default CreateUser;

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