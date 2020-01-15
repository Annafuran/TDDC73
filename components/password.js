import React from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';

export var createPassword = '';
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

  //console.log(strengths)
   return strengths;
}

//Returns color that indicates strength. 
const passColor = strengths => {
   if (strengths < 3)
     return 'red';
  if (strengths < 5)
     return 'yellow';
  if (strengths < 7)
     return 'orange';
  if (strengths < 9)
     return 'lightgreen';
  if (strengths < 11)
     return 'green';
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
class Password extends React.Component {
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
  
  
  if(this.state.value == null || inputStrength == null || inputColor == null){   
    inputStrength = 0;
    test = 0;
    inputText = '';
    inputColor = 'red';  
  }else {
    createPassword = inputText;
    progressBar = inputStrength/10;
  }
    return(   
      <View style={styles.insidecontent}>
        <View style = {styles.row}>
        <Text style={styles.textStyle}>Password</Text>
        <Text style = {{marginLeft: -25, color : 'red'}}>*</Text>
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

export default Password;