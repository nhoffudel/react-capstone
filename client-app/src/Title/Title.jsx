import "./Title.css";
import React from "react";
import Weather from "../Weather/Weather";

class Title extends React.Component{
  render(){
    let str = "Not logged in";
    if (this.props.userState.loggedIn) str = `Logged in as ${this.props.userState.currentUsername}`;
    return (
    <div> 
      <p id="loggedInMessage">{str}</p>
      <h1 id="title">Not Redd It</h1>
      <Weather/>
    </div>
    );
  }
}

export default Title;
