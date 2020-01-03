import React from 'react';
import {strengthIndicator, passColor} from './strength'

export default function PasswordInput(props){
//password req..

  const strength = strengthIndicator(props.value);
  const color = passColor(strength);

  return (
    <input
      editable={true}
      type = 'password'
      value = {props.value}
      className = 'password-input'
      onChange = {props.handleChanges}
      placeholder='Type your password'
      style= {{
        borderColor : color
      }}
      />
  )
}