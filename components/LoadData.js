
import React, { Component, useState} from 'react';

export var loadedData = loadData();

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


class LoadData extends React.Component {
}

export default LoadData;
