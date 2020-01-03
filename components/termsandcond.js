import React, { Component } from 'react';
import myText from './termsandconditions.js';

class TermsAndConditions extends React.Component {


  render(){

    const gotTheText  = myText;

    return(
      <View style ={styles.container}>
      <Text style={styles.title}>Terms and conditions</Text>
      <Textarea defaultValue={gotTheText}></Textarea>
      </View>
      );

  }



}

const styles = {
  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },