import React, {Component} from 'react';
import {ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';

export var createUsername = '';
var acceptedTerms = false;

const hasSpecialUsername = value => {
   return new RegExp(/["?ÅÄÖåäö¤/!#@$%^&*)(+=._-]/).test(value);
}
//Create Username
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

  if(hasSpecialUsername(inputText))
    warningText = "Your username can only contain letters A-Z or numbers 0-9";

    return(     
    <View style={styles.insidecontent}>
      <View style = {styles.row}>
      <Text style={styles.textStyle}>Username</Text>
      <Text style = {{marginLeft: -25, color : 'red'}}>*</Text>
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

export default Username;
