import React from 'react';

const hasNumber = value => {
   return new RegExp(/[0-9]/).test(value);
}
const hasMixed = value => {
   return new RegExp(/[a-z]/).test(value) &&
            new RegExp(/[A-Z]/).test(value);
}
const hasSpecial = value => {
   return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
}

let strength = 0;

export const strengthIndicator = value => { //export to password
   let strengths = 0;
   if (value > 5)
      strengths++;
   if (value > 7)
      strengths++;
   if (hasNumber(value))
      strengths++;
   if (hasSpecial(value))
      strengths++;
   if (hasMixed(value))
      strengths++;
   return strengths;
}

export const passColor = strengths => {
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