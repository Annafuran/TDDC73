import React from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import styles from './style';
import {redStarPassword} from './star.js';
import {passwordLength, specialCharPassword, mixedCharacters,
                    containNumbers, weakColor, fairColor, goodColor, strongColor, veryStrongColor} from './../App';

export var createPassword = '';
export var goodPassword = false;

//Check if the password is good enough based on given demands from App.js. 
function passwordtest(value){

   var tempSpecChar = false;
   var tempPasswordLength = false;
   var tempMixedChar = false;
   var tempContainNumbers = false;

   if(!specialCharPassword){
    tempSpecChar = true;
  } else if (specialCharPassword && hasSpecial(value)){
      tempSpecChar = true;
  }

  if(passwordLength => createPassword.length){
    tempPasswordLength = true;
  }

  if(!mixedCharacters){
    tempMixedChar = true;
  }else if(mixedCharacters && hasMixed(value) ){ 
    tempMixedChar = true;
  }

  if(!containNumbers){
    tempContainNumbers = true;
  }else if(containNumbers && hasNumber(value)){
    tempContainNumbers = true;
  }
  

  if(tempContainNumbers && tempMixedChar && tempSpecChar && tempPasswordLength){
    return true;
  }else{
    return false;
  }

}


//If the password contains a number.
const hasNumber = value => {
   return new RegExp(/[0-9]/).test(value);
}

//If the password has mixed uppercase and lowercase numbers
const hasMixed = value => {
   return new RegExp(/[a-z]/).test(value) &&
            new RegExp(/[A-Z]/).test(value);
}
//Contains atleast one special character, for password
const hasSpecial = value => {
   return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
}

//The Strengthindicator for the password
 const strengthIndicator = value => {
    let strengths = 0;

    if(value != null){
   if (value.length > 7)
      strengths = strengths + 2;
   if (value.length > 11)
      strengths = strengths + 2;
   if (hasNumber(value))
      strengths = strengths + 2;
   if (hasSpecial(value))
      strengths = strengths + 2;
   if (hasMixed(value))
      strengths = strengths + 2;
  }
   return strengths;
}

//Returns color that indicates strength.
const passColor = strengths => {
   if (strengths < 3)
     return weakColor;
  if (strengths < 5)
     return weakColor;
  if (strengths < 7)
     return fairColor;
  if (strengths < 9)
     return strongColor;
  if (strengths < 11)
     return veryStrongColor;
}

//Creates label that indicates password strength.
const createPasswordLabel = (strengths) => {
    switch (strengths) {
      case 0:
        return 'Weak';
      case 2:
        return 'Weak';
      case 4:
        return 'Fair';
      case 6:
        return 'Good';
      case 8:
        return 'Strong';
      case 10:
        return 'Very strong'
      default:
        return 'Weak';
    }
  }

//Handling password creation
class PasswordPost extends React.Component {
 constructor(props) {
   super(props);
   this.state = { value: '', strength: 0, color: ''};
   this.handleChange = this.handleChange.bind(this);

 }

 handleChange(value) {
    var strength = strengthIndicator(value);
    var color = passColor(strength);

    this.setState({value: value, strength: strength, color: color});
  }

 render() {

  var inputText = this.state.value;
  var inputStrength = this.state.strength;
  var inputColor = this.state.color;
  var progressBar = 0;

  //Initial values is set. 
  if(this.state.value == null || inputStrength == null || inputColor == null){
    inputStrength = 0;
    test = 0;
    inputText = '';
    inputColor = 'red';
  }else {
    createPassword = inputText;
    progressBar = inputStrength/10;
    goodPassword = passwordtest(inputText);
  }

    return(
      <View style={styles.insidecontent}>
        <View style = {styles.row}>
        <Text style={styles.textStyle}>Password</Text>
        <Text style = {{marginTop: 0, marginLeft: -25, color : 'red'}}>{redStarPassword}</Text>
        </View>
          <TextInput
          secureTextEntry = {true}
          onChangeText = {this.handleChange.bind(this)}
          placeholder=' 6 characters or more'
          style={styles.inputBox}
          />
      <Text style = {styles.textStyle}>
       Password strength: {createPasswordLabel(inputStrength)} </Text>
      <ProgressBarAndroid progress={progressBar} styleAttr="Horizontal" indeterminate={false} color={inputColor}/>
    </View>
    );
  }
}
export default PasswordPost;
