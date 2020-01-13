import React, { Component, useState} from 'react';
import { ProgressBarAndroid, KeyboardAvoidingView, ScrollView, Progress, Icon, StatusBar, Dimensions, Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity ,TextInput, SafeAreaView } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import normalize from 'react-native-normalize';

var firstPassword = '';
var secondPassword = '';
var UserExist = false;

//Load fonts.  
/*const fetchFonts = () => {
return Font.loadAsync({
'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf'),
'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf')
});
};*/

//Load the inital user database. 
function loadData() {

	const data =  require('./userregister.json');	
	var userData = data.map(getSelectedUser);

	
  function getSelectedUser(item){
		var selectedUser =({id: item.id, password: item.password, email: item.email});
		return selectedUser;
  }

	userData = userData.map((currElement, index) => {
		currElement["index"] = index;
		return currElement;
	});

	//Returns a map loaded with the userdata. 
  return userData;
}

//Sign into StarStable 
function signIn(Username, Password){
  
  const data = loadData();

	Object.keys(data).map(function(key){
    
    var item = data[key];
    var selectedUser =({id: item.id, password: item.password, email: item.email});

    //Check if user exists. 
    if(Username == selectedUser.id && Password == selectedUser.password){  
      UserExist = true;
     // console.log(UserExist);  
    }
  })

  if(UserExist){
  // console.log("yay");

  }else{
   // console.log("no");
  }

  //Reset for next login try. 
  UserExist = false;
}

function matchingPasswords(){

  if(secondPassword == firstPassword){
    return true;
  }else{
    return false;
  }
}

//MAIN
export default class App extends React.Component {
constructor(props) {
    super(props);

     //Initialize fonts. 
     //fetchFonts(); 
  	this.state = {data: loadData(),};	
 }


   render() {
   	const headerLogo = require('./assets/logo-starstable.png');
   	const signInLogo = require('./assets/Logo2.png');
    const infoText = require('./welcometext.json');

       return (  
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
         	<Image source={signInLogo} style={styles.headerlogo}/>
          </View>
          <View style = {styles.backgroundContainer}>
          <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView> 
          <View style={styles.column}>
            <Text style={styles.introTextStyle}>New user? Sign up today!</Text> 
             <View style = {styles.largecontainer}>
              <Email/>
              <Username/>
              <PasswordPost/>  
              <PasswordTest/>
               <View style ={styles.loginButton}>
               <Button
               color= 'rgba(62, 32, 109, 1.0)'
              title="Register new user"
              raised ="true"
              onPress={() => console.log("hej")}          
              />
             </View>
              </View>
            </View>
           <View style={styles.column}>
          <Text style={styles.introTextStyle}>Sign in</Text> 
           <View style={styles.smallcontainer}>
           <Image source={headerLogo} style={styles.logo}/>
           <Login/>
           </View>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
            
          </View>
         
        </SafeAreaView>  
             
   	);
   }     
};

//Handling user login. 
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', };
   
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

   handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {

    let typedUsername = this.state.username;
    let typedPassword = this.state.password;

    return(     

     <View style={styles.insideSmallContainer}>
      <Text style={styles.textStyle}>Username </Text> 
      <TextInput
        style={styles.inputBox}
        placeholder= ' Type your username'
        onChange = {this.handleUsernameChange}
        value={this.state.value}
      />
      <Text style={styles.textStyle}>Password </Text> 
      <TextInput
        style={styles.inputBox}
        onChange = {this.handlePasswordChange}
        placeholder= ' Type your password'
        secureTextEntry = {true} 
        value={this.state.value}
      />
      <View style ={styles.loginButton}>
      <Button
          color= 'rgba(62, 32, 109, 1.0)'
          title="Sign in"
          raised ="true"
          onPress={() => {signIn(typedUsername, typedPassword)}}          
       />
       </View>
      </View>         

    );
  }

}

//Handling Email creation 
class Email extends React.Component {
 
 constructor(props) {
    super(props);
    this.state = { value: ''};

    this.handleChange = this.handleChange.bind(this);
 }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

 render() {
    return(    	
    <View style={styles.insidecontent}>
      <Text style={styles.textStyle}>Email Address: </Text> 
      <TextInput
        style={styles.inputBox}
        onChange = {this.handleChange}
        placeholder=' Type your email address'
        value={this.state.value}
      />
      </View>

    );
  }
}

//Create Username
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
  //console.log(inputText);

  if(hasSpecialUsername(inputText))
    warningText = "Your username can only contain letters A-Z or numbers 0-9";

    return(     
    <View style={styles.insidecontent}>
      <Text style={styles.textStyle}>Username: </Text> 
      <TextInput
        style={styles.inputBox}
        value={this.state.value}
        onChange = {this.handleChange}
        placeholder=' Choose your username'  
      />

      <Text style={{fontSize: 12, paddingRight: 30, color: 'red'}}>{warningText}</Text>
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

    if(value != null){
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
  }

  //console.log(strengths)
   return strengths;
}

//Returns color that indicates strength. 
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

//Creates label that indicates password strength. 
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
class PasswordPost extends React.Component {
 constructor(props) {
   super(props);
   this.state = { value: ''};

   this.handleChange = this.handleChange.bind(this);

 }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

 render() {

  var strength = 0.0;
  var strengthString = '';
  var color = '';
  var inputText = '';
  var test = '';
  
  if(this.state.value != ''){

    inputText = this.state.value;
    strength = strengthIndicator(inputText);
    color = passColor(strength);
    firstPassword = inputText;
    strengthString = strength.toString();
  }

  console.log(strength);
   console.log(color);

  

    return(   
      <View style={styles.insidecontent}>
      	<Text style={styles.textStyle}>Password:</Text> 
      		<TextInput
   		 		secureTextEntry = {true} 
   	 	 		value = {this.state.value}
   	 	 		onChange = {this.handleChange}
          placeholder=' 6 characters or more'
     	 		style={styles.inputBox}
      		/>
      
      <Text style = {styles.textStyle}>
       
       Password strength: {createPasswordLabel(strength)} </Text>
      <ProgressBarAndroid progress={strength} styleAttr="Horizontal" indeterminate={false} color={color}/> 
    </View>     
    );
  }
}

//Compare password
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

	if(!matchingPasswords()){
		warningText = "The passwords is not matching!"
	}
    return(   
      <View style={styles.insidecontent}>
      	<Text style={styles.textStyle}>Re-type password</Text> 
      		<TextInput
   		 		secureTextEntry = {true} 
   	 	 		value = {this.state.value}
   	 	 		onChange = {this.handleChange}
          placeholder=' Re-type your password'
     	 		style={styles.inputBox}
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
    width: '100%',
   
  },
  insidecontent: {
  	flexDirection: 'column',
  	width: '90%',
    padding: '2%'
  },
  column: {
    alignItems: "center",
    width: '90%',
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
    padding: '4%',
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
    width : "60%",
    height: '90%',
    alignItems: "center",
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  }

})