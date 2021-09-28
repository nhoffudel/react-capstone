import React from "react";
import Weather from "../Weather/Weather";

class Title extends React.Component{
  render(){
    let str = "Not logged in";
    if (this.props.userState.loggedIn) str = `Logged in as ${this.props.userState.currentUsername}`;
    return (
    <div> 
      <h1>Not Redd It</h1>
      <p>{str}</p>
      <Weather/>
    </div>
    );
  }
}

export default Title;
