
import React, { Component, useState} from 'react';
import { Dimensions, Text, StyleSheet} from 'react-native';
import styles from './style';
import {chooseMandEmail, chooseMandUsername, chooseMandPassword,
        chooseMandTerms} from './../App';

export var redStarEmail;
export var redStarUsername;
export var redStarPassword;
export var redStarTerms;

//Creates a star depending on the mandotory field. 
class Star extends React.Component {
 render() {

   if(chooseMandEmail == true){
     redStarEmail = '*';
   }

   if(chooseMandUsername == true){
     redStarUsername = '*';
   }

   if(chooseMandPassword == true){
     redStarPassword = '*';
   }
   if(chooseMandTerms == true){
     redStarTerms = '*';
   }

    return(
        <Text style = {{marginTop: 0, marginLeft: -25, color : 'red'}}>{ }</Text>
    );
  }
}
export default Star;
