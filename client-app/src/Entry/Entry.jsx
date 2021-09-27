import React from 'react';

class Entry extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h3>By {this.props.author} on {this.props.date}</h3>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Entry;