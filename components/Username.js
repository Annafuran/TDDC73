import React, {Component} from 'react';
import {ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import App from './../App';
import {redStarUsername} from './star';
import styles from './style';

export var createUsername = '';

//Check if the username contains a special character. 
const hasSpecialUsername = value => {
   return new RegExp(/["?ÅÄÖåäö¤/!#@$%^&*)(+=._-]/).test(value);
}

class Username extends React.Component {
 constructor(props) {
    super(props);
    this.state = { value: ''};

    this.handleChange = this.handleChange.bind(this);
 }

 handleChange(value) {
    this.setState({value: value});
  }

 render() {
  const inputText = this.state.value;
  let warningText = "";
  createUsername = inputText;

  //Gives a warning to the user. 
  if(hasSpecialUsername(inputText))
    warningText = "Your username can only contain letters A-Z or numbers 0-9";

    return(     
    <View style={styles.insidecontent}>
      <View style = {styles.row}>
      <Text style={styles.textStyle}>Username</Text>
      <Text style = {{marginLeft: -25, color : 'red'}}>{redStarUsername}</Text>
       </View> 
      <TextInput
        style={styles.inputBox}
        value={this.state.value}
        onChangeText = {this.handleChange.bind(this)}
        placeholder=' Choose your username'  
      />

      <Text style={{fontSize: 12, paddingRight: 30, color: 'red'}}>{warningText}</Text>
      </View>


    );
  }
}        

export default Username;
