import React, {Component} from 'react';
import {  ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import styles from './style';
import {redStarEmail} from './star.js';

export var createEmail = '';

class Email extends React.Component {
 
 constructor(props) {
    super(props);
    this.state = { value: ''};

    this.handleChange = this.handleChange.bind(this);
 }

 handleChange(value) {
    this.setState({value: value});
  }

 render() {

  createEmail = this.state.value;
    return(     
    <View style={styles.insidecontent}>
      <View style = {styles.row}>
      <Text style={styles.textStyle}>Email Address</Text>
      <Text style = {{marginLeft: -25, color : 'red'}}>{redStarEmail}</Text>
       </View> 
      <TextInput
        style={styles.inputBox}
        onChangeText = {this.handleChange.bind(this)}
        placeholder=' Type your email address'
        value={this.state.value}
      />
      </View>

    );
  }
}

export default Email;