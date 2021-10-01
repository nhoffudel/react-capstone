import "./Title.css";
import React from "react";
import Weather from "../Weather/Weather";
import LogOut from "../LogOut/LogOut";

class Title extends React.Component{
  render(){
    if (!this.props.userState.loggedIn){
      return (
        <div>
          <p id="loggedInMessage">Not logged in</p>
          <h1 id="title">Not Redd It</h1>
          <Weather/>
        </div>
      )
    }
    return (
    <div> 
      <p id="loggedInMessage">Logged in as {this.props.userState.currentUsername}</p>
      <LogOut updateUserState={this.props.updateUserState}/>
      <h1 id="title">Not Redd It</h1>
      <Weather/>
    </div>
    );
  }
}

export default Title;
