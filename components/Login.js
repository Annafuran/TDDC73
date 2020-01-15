import React, {Component} from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import LoadData, {loadedData} from './LoadData';
import styles from './style';

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
export default Login;