import React from 'react';
import Header from './header';
import ListItems from './course';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      toggle: false,
      value: '',
      courseList: []
    };
    this.Click = this.Click.bind(this);
    this.ClickTwo = this.ClickTwo.bind(this);
    this.ClickThree = this.ClickThree.bind(this);
    this.ClickFour = this.ClickFour.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  Click() {
    this.setState({ isActive: true });
  }

  ClickTwo() {
    this.setState({ isActive: false });
  }

  ClickThree() {
    this.setState({ toggle: true });
  }

  ClickFour() {
    this.setState({ toggle: false });
  }

  componentDidMount() {
    fetch('/api/finalproject')
      .then(res => res.json())
      .then(data => {
        this.setState({
          courseList: data
        });
      })
      .catch(error => console.error(error));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ isActive: false });
    const reqObj = {};
    reqObj.courseName = this.state.value;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };
    fetch('/api/finalproject', req)
      .then(res => res.json())
      .then(data => {
        const courseCopy = [...this.state.courseList];
        courseCopy.push(data);
        this.setState({
          courseList: courseCopy,
          value: ''
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const buttonText = this.state.isActive ? 'view' : 'hidden';
    const button = this.state.toggle ? 'view' : 'hidden';
    return (<div>
      <Header />
      <div className="row">
        <div className='col-12'>
          <div className='row'>
            <div className='col-2 text-center'>
              <i onClick={this.ClickThree}className='fa-solid fa-bars mt-3' />
            </div>
            <div onClick={this.ClickFour}className='col-9 text-end'>
              <i onClick={this.Click} className="fa-solid fa-plus mt-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-9 mx-auto">
        <div className='ml-1'>
          <h1>Courses</h1>
          <ListItems list={this.state.courseList}/>
        </div>
      </div>

      <div className={`box ${buttonText}`}>
        <div className='row'>
          <div className='col-11 text-end'>
            <i onClick={this.ClickTwo} className="fa-solid fa-x" />
          </div>
        </div>
        <div className='row text-center'>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input required type="text" className='searchbar' value={this.state.value} onChange={this.handleChange} />
            </label>
            <div className='col-9'>
              <button type="submit" className="btn btn-success mt-3">Add</button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className={`row ${button}`}>
          {/* <div className={`overlay ${button}`} onClick={this.Click} /> */}
          <div className='col-2 popup'>
            <a onClick={this.Click}><h6>Courses</h6></a>
            <a onClick={this.Click}><h6>Assignments</h6></a>
            <a onClick={this.Click}><h6>Due Assignments</h6></a>
            <a onClick={this.Click}><h6>Late Assignments</h6></a>
          </div>
        </div>
      </div>

    </div>
    );
  }
}
