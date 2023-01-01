import React from 'react';
import Header from './header';
import ListItems from './course';
import Colors from './colors';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      toggle: false,
      value: '',
      courseList: [],
      color: 'white'
    };
    this.AddClass = this.AddClass.bind(this);
    this.HideClass = this.HideClass.bind(this);
    this.OpenDrawer = this.OpenDrawer.bind(this);
    this.CloseDrawer = this.CloseDrawer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.colorChange = this.colorChange.bind(this);

  }

  AddClass() {
    this.setState({ isActive: true });
  }

  HideClass() {
    this.setState({ isActive: false });
  }

  OpenDrawer() {
    this.setState({ toggle: true });
  }

  CloseDrawer() {
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
    reqObj.colorCode = this.state.color;
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
          value: '',
          color: 'white'
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  colorChange(event) {
    this.setState({ color: event.target.dataset.color });
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
              <i onClick={this.OpenDrawer}className='fa-solid fa-bars mt-3' />
            </div>
            <div className='col-9 text-end'>
              <i onClick={this.AddClass} className="fa-solid fa-plus mt-5" />
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
            <i onClick={this.HideClass} className="fa-solid fa-x" />
          </div>
        </div>

        <div className='row text-center'>
          <form onSubmit={this.handleSubmit}>
            <div className='col-12'>
              <div className='row'>
                <label data-color={this.state.color} className={`circle ${this.state.color} positions`} />
                <label>
                  <input required type="text" className='searchbar' value={this.state.value} onChange={this.handleChange} />
                </label>
              </div>
            </div>
            <Colors onClick={this.colorChange}/>
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
            <i onClick={this.CloseDrawer} className="col-9 fa-solid fa-x" />
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
