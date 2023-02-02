import React from 'react';

export default class HomePage extends React.Component {
  render() {
    return (<div>
      <div className="background-image" />
      <div className='row justify-content-left'>
        <div className='col-12 text-light position-absolute top-50' style={{ marginTop: '-25px' }}>
          <h1 className='pb-2 font-weight-bold text-center' style={{ fontFamily: '"Shadows Into Light", cursive ' }}><strong>Welcome to SchoolifeZen!</strong></h1>
          <p className='text-center font-italic' style={{ fontSize: '15px' }}>Stay Organized and on top of your class assignments, projects, and tests  with this comprehensive school planner.</p>
        </div>
      </div>
    </div>);
  }
}
