import React, {Component} from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import LoadData, {loadedData} from './LoadData';

var UserExist = false;

//To sign in
function signIn(Username, Password){
  
  const data = loadedData;

  Object.keys(data).map(function(key){
    
    var item = data[key];
    var selectedUser =({id: item.id, password: item.password, email: item.email});

    //Check if user exists. 
    if(Username == selectedUser.id && Password == selectedUser.password){  
      UserExist = true; 
    }
  })

  if(UserExist){
    return 'You have signed in!';

  }else{
   return 'User does not exist!';
  }

  //Reset for next login try. 
  UserExist = false;
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', resultText: ''};
   
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

   handleUsernameChange(value) {
    this.setState({username: value});
  }

  handlePasswordChange(value) {
    this.setState({password: value});
  }

  handleClick(){
    var tempUser = this.state.username;
    var tempPass =this.state.password;
    var tempText = signIn(tempUser, tempPass);
    this.setState({resultText: tempText});
  }

  render() {

    let typedUsername = this.state.username;
    let typedPassword = this.state.password;
    var resultingText = this.state.resultText;

    return(     

     <View style={styles.insideSmallContainer}>
      <Text style={styles.textStyle}>Username </Text> 
      <TextInput
        style={styles.inputBox}
        placeholder= ' Type your username'
        onChangeText = {this.handleUsernameChange.bind(this)}
        value={this.state.value}
      />
      <Text style={styles.textStyle}>Password </Text> 
      <TextInput
        style={styles.inputBox}
        onChangeText = {this.handlePasswordChange.bind(this)}
        placeholder= ' Type your password'
        secureTextEntry = {true} 
        value={this.state.value}
      />
      <View style ={styles.loginButton}>
      <Button
          color= 'rgba(62, 32, 109, 1.0)'
          title="Sign in"
          raised ="true"
          onPress={this.handleClick}  
       />
       <Text style={{fontSize: 12, paddingRight: 30, color: 'red'}}>{resultingText}</Text> 
       </View>
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
  inputBox: { 
    height: 25, 
    borderRadius: 4, 
    borderColor: 'grey', 
    borderWidth: 1, 
    backgroundColor: 'white'
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

export default Login;