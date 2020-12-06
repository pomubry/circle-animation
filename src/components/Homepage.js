import React, { Component } from 'react';

class Homepage extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <div className="homepage">
        {isAuth ? (
          <p>Welcome to Circle Animation</p>
        ) : (
          <p>Please login or register</p>
        )}
      </div>
    );
  }
}

export default Homepage;
