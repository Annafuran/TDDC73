
import React, { Component, useState} from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import LoadData, {loadedData} from './LoadData';
import Username, {createUsername} from './Username';
import Password, {createPassword, goodPassword} from './password';
import Email, {createEmail} from './Email';
import {CheckBox} from 'react-native-elements';
import styles from './style';
import {redStarPassword, redStarTerms,
              redStarEmail, redStarUsername} from './star';
import {chooseMandEmail, chooseMandUsername, chooseMandPassword,
                    chooseMandTerms} from './../App';

export var createRetypePassword = '';
var acceptedTerms = false;

//check if the typed passwords are the same. 
function matchingPasswords(){
  if(createRetypePassword == createPassword){
    return true;
  }else{
    return false;
  }
}

//Runs on click when creating a user. 
function createUser(){

  var tempEmail = false;
  var tempUsername = false;
  var tempPassword = false;
  var tempTerms = false;

  
  if(!chooseMandEmail){
    tempEmail = true;
  }else if (chooseMandEmail && createEmail != ''){
      tempEmail = true;
  }

  if(!chooseMandUsername){
    tempUsername = true;
  } else if (chooseMandUsername && createUsername != ''){
      tempUsername = true;
  }

  if(!chooseMandPassword){
    tempPassword = true;
  } else if (chooseMandPassword && createPassword != ''){
      tempPassword = true;
  }

  if(!chooseMandTerms){
    tempTerms = true;
  } else if (chooseMandTerms && acceptedTerms){
      tempTerms = true;
  }

  //If all the mandatory fields has been filled in. 
  if(tempUsername && tempPassword
      && tempEmail && tempEmail && tempTerms && goodPassword){

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
        temp =  "Username already exist";
      }
      if(createEmail == selectedUser.email){
        tempEmailExist  = true;
       temp ="Email already exist";
      }
    })

    if(tempUsernameExist ||  tempEmailExist){
      return temp;
    }

  //If the the passwords doesn't match. 
  if(!matchingPasswords()){
    return "The passwords must match!";
  }
  //If passwords matches and the user doesnt already exist. 
  else if(matchingPasswords())
  {
    if(!tempEmailExist && !tempUsernameExist){
      return "You have created a user!";
    }
  }
}
//If a field is missing. 
  else {
    return "All the mandotary fields must be filled";
  }
}


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

  //Gives a warning to the user that the passwords is not matching. 
  if(!matchingPasswords()){
    warningText = "The passwords is not matching!"
  }

    return(
      <View style={styles.insidecontent}>
        <View style = {styles.row}>
        <Text style={styles.textStyle}>Re-type password</Text>
        <Text style = {{marginTop: 0, marginLeft: -25, color : 'red'}}>{redStarPassword }</Text>
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
        <Text style = {{marginTop: 25, marginLeft: -25, color : 'red'}}>{redStarTerms}</Text>

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
