import React, { Component } from 'react';
import {  StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';

var firstPassword = '';
var secondPassword = '';

export default class App extends React.Component {
//HEADER 
   render() {
   	const logo = require('./assets/logo-starstable.png');
   	const logo2 = require('./assets/logo2.png');
  	var data = require('./welcometext.json');
  	var data2 = require('./userregister.json');
  	var Test = data["Introtext"];
       return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
         	<Image source={logo2} style={styles.headerlogo}/>
          </View>
          <View style={styles.row}> 
           <View style={styles.column}>
           <ul> {data["Introtext"]}</ul>
           <Text><strong>Already have an account?</strong></Text>
           <View style={styles.smallcontainer}>
           <Image source={logo} style={styles.logo}/>
           </View>
            </View>
             <View style={styles.column}>
             	<Email/>
             	<Username/>
          		<Password/>
          		<PasswordTest/>
            </View>
           </View>              
        </SafeAreaView>

   	);
   }     
};

//Handling Email creation 
class Email extends React.Component {
 constructor(props) {
    super(props);
    this.state = { value: ''};
 }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

 render() {
    return(    	
    <View style={styles.insidecontent}>
      <Text style={{fontSize: 15, paddingRight: 30}}>Email Address: </Text> 
      <input
        style={{height: 20, borderColor: 'gray', borderWidth: 1}}
        onChange = {this.handleChange}
        placeholder='Type your email address'
        value={this.state.value}
      />
      </View>

    );
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
//for username
const hasSpecialUsername = value => {
   return new RegExp(/["?ÅÄÖåäö¤/!#@$%^&*)(+=._-]/).test(value);
}

//The Strengthindicator for the password 
 const strengthIndicator = value => { 
   	let strengths = 0;
   if (value.length > 7)
      strengths++;
   if (value.length > 11)
      strengths++;
   if (hasNumber(value))
      strengths++;
   if (hasSpecial(value))
      strengths++;
   if (hasMixed(value))
      strengths++;


  console.log(strengths)
   return strengths;
}

const passColor = strengths => {
   if (strengths < 2)
     return 'red';
  if (strengths < 3)
     return 'yellow';
  if (strengths < 4)
     return 'orange';
  if (strengths < 5)
     return 'lightgreen';
  if (strengths < 6)
     return 'green';
}

const createPasswordLabel = (strengths) => {
    switch (strengths) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      case 5:
      	return 'Very strong'
      default:
        return 'Weak';
    }
  }


//Handling password creation 
class Password extends React.Component {
 constructor(props) {
   super(props);
   this.state = { value: ''};

   this.handleChange = this.handleChange.bind(this);

 }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

 render() {
  	const inputText = this.state.value;
 	var strength = strengthIndicator(inputText);
	var color = passColor(strength);
	firstPassword = inputText;

    return(   
      <View style={styles.insidecontent}>
      	<Text style={{fontSize: 15, paddingRight: 30}}>Password:</Text> 
      		<input
   		 		type = 'password'
   	 	 		value = {this.state.value}
   	 	 		onChange = {this.handleChange}
    	 		placeholder='Type your password'
     	 		style={{height: 20, borderColor: 'gray', borderWidth: 1}}
      		/>
       <progress value={strength} max = '5'/>
       <label>Password strength:{createPasswordLabel(strength)} </label>
    </View>     
    );
  }
}

class PasswordTest extends React.Component {
 constructor(props) {
   super(props);
   this.state = { value: ''};

   this.handleChange = this.handleChange.bind(this);

 }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

 render() {
 	const inputText = this.state.value;
 	let warningText = "";
	secondPassword = inputText;

	if(secondPassword != firstPassword){
		warningText = "The passwords is not matching!"
	}

    return(   
      <View style={styles.insidecontent}>
      	<Text style={{fontSize: 15, paddingRight: 30}}>Re-type password</Text> 
      		<input
   		 		type = 'password'
   	 	 		value = {this.state.value}
   	 	 		onChange = {this.handleChange}
    	 		placeholder='Type your password'
     	 		style={{height: 20, borderColor: 'gray', borderWidth: 1}}
      		/>
      	<Text style={{fontSize: 12, paddingRight: 30, color: 'red'}}>{warningText}</Text> 
    </View>     
    );
  }
}

//YOU SHOULD BE ABLE TO CHECK AVIABILITY FOR THE USERNAME
//Handling Username creation 
class Username extends React.Component {
 constructor(props) {
    super(props);
    this.state = { value: ''};

    this.handleChange = this.handleChange.bind(this);
 }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

 render() {
	const inputText = this.state.value;
	let warningText = "";
	console.log(inputText);

	if(hasSpecialUsername(inputText))
		warningText = "Your username can only contain letters A-Z or numbers 0-9";

    return(    	
    <View style={styles.insidecontent}>
      <Text style={{fontSize: 15, paddingRight: 30}}>Username: </Text> 
      <input
        style={{height: 20, borderColor: 'gray', borderWidth: 1}}
        value={this.state.value}
        onChange = {this.handleChange}
        placeholder=''   
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
    alignItems: "center"
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
    height: '10%',
    justifyContent: 'center',
    resizeMode: 'contain',

  },
  headerlogo: {
  	width: '60%',
    height: '60%',
   	resizeMode: 'contain',
   	justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '50%',
    flex: 1,
  },
  insidecontent: {
  	flexDirection: 'column',
  	width: '60%',
  	paddingTop: '1%'

  },
  column: {
    flexDirection: 'column',
    width: '50%',
     paddingTop: '3%'
  },
  smallcontainer: {
  	width: '50%',
  	height: '50%',
  	backgroundColor: 'rgba(52, 52, 52, 0.1)',
  	borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'column',
    paddingTop: '1%'
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },

})