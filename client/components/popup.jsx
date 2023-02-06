import React from 'react';
export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.drawer = this.drawer.bind(this);
    this.CloseDrawer = this.CloseDrawer.bind(this);
  }

  drawer() {
    this.setState({ toggle: true });
  }

  CloseDrawer() {
    this.setState({ toggle: false });
  }

  render() {
    const button = this.state.toggle ? 'view' : 'hidden';
    return (<div className="row">
      <div className='col-12 '>
        <div className='row'>
          <div className='col-2 text-center'>
            <i role="button" onClick={this.drawer} className='fa-solid fa-bars mt-3' />
          </div>
        </div>
      </div>
      <div className="row ">
        <div className={`col-2 popup position-absolute fixed-top mt-3 ${button} `}>
          <i onClick={this.CloseDrawer} className="col-12 fa-solid fa-x text-end text-dark" />
          <a href='#courses' className="link-dark"
            onClick={this.viewCourse}><h5 className='m-2 text-center'>Courses</h5></a>
        </div>
      </div>
    </div>);
  }
}
