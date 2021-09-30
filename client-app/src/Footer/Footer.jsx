import React from 'react';
// import "./Footer.css";

class Footer extends React.Component {

  render() {
    return (
      <div>
        <hr/>
        <p id="footer">Front end built in ReactJS. Back end built using Express, NodeJS, and MongoDB/Mongoose and served by MongoDB Cloud Atlas. Weather provided by OpenWeatherAPI.</p>
      </div>
    );
  }
}

export default Footer;