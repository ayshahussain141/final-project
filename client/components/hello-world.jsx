import React from 'react';
import Header from './header';
import ListItems from './course';
import Colors from './colors';
import Assignments from './assignments';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      toggle: false,
      value: '',
      courseList: [],
      color: 'white',
      isHidden: '',
      assignmentList: [],
      valueOne: '',
      change: false,
      date: ''
    };
    this.AddClass = this.AddClass.bind(this);
    this.HideClass = this.HideClass.bind(this);
    this.OpenDrawer = this.OpenDrawer.bind(this);
    this.CloseDrawer = this.CloseDrawer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.ChangeView = this.ChangeView.bind(this);
    this.ChangeSee = this.ChangeSee.bind(this);
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleSubmitOne = this.handleSubmitOne.bind(this);
    this.changeAssignment = this.changeAssignment.bind(this);
    this.dateChange = this.dateChange.bind(this);

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

    fetch('/api/finalproject/assignment')
      .then(res => res.json())
      .then(data => {
        this.setState({
          assignmentList: data
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

  ChangeView() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  ChangeSee() {
    this.setState({ isHidden: 'hidden' });
  }

  handleChangeOne(event) {
    this.setState({ valueOne: event.target.value });
  }

  dateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleSubmitOne(event) {
    event.preventDefault();
    this.setState({ change: false });
    const reqObj = {};
    reqObj.assignment = this.state.value;
    reqObj.about = this.state.valueOne;
    reqObj.dateDue = this.state.date;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };
    fetch('/api/finalproject/assignment', req)
      .then(res => res.json())
      .then(data => {
        const assignmentCopy = [...this.state.assignmentList];
        assignmentCopy.push(data);
        this.setState({
          assignmentList: assignmentCopy
        });

      })
      .catch(err => console.error(err));
  }

  changeAssignment() {
    this.setState({ change: true });
  }

  render(event) {
    const buttonText = this.state.isActive ? 'view' : 'hidden';
    const button = this.state.toggle ? 'view' : 'hidden';
    const changepage = this.state.isHidden ? 'view' : 'hidden';
    const changepagetwo = this.state.isHidden ? 'hidden' : 'view';
    const changepageform = this.state.change ? 'view' : 'hidden';
    return (<div>
      <Header />
      <div className="row">
        <div className='col-12'>
          <div className='row'>
            <div className='col-2 text-center'>
              <i onClick={this.OpenDrawer}className='fa-solid fa-bars mt-3' />
            </div>
            <div className='col-9 text-end'>
              <i onClick={this.AddClass} className={`fa-solid fa-plus mt-5 ${changepagetwo}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="col-9 mx-auto">
        <div onClick={this.ChangeView} className={`ml-1 ${changepagetwo}`}>
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
          <div className='col-2 popup'>
            <i onClick={this.CloseDrawer} className="col-9 fa-solid fa-x" />
            <a><h6>Courses</h6></a>
            <a><h6>Assignments</h6></a>
            <a><h6>Due Assignments</h6></a>
            <a><h6>Late Assignments</h6></a>
          </div>
        </div>
      </div>

      <div className='col-9 mx-auto '>
        <div className={`mt-5 ${changepage}`}>
          <div className="ml-1" >
            <div className='row'>
              <h1 className='d-inline'>Assignments</h1>
              <i onClick={this.changeAssignment} className="fa-solid fa-plus text-end" />
            </div>
            <div>
              <Assignments list={this.state.assignmentList}/>
            </div>
          </div>
          <div className={`overlay ${changepageform}`} />
          <div className='row text-center'>
            <div className={`boxes ${changepageform}`} >
              <form onSubmit={this.handleSubmitOne}>
                <label className='col-9 max-auto mt-5 mb-2'>
                  <input required type="text" value={this.state.value} onChange={this.handleChange} placeholder='New Assignment'/>
                </label>
                <textarea type="text" onChange={this.handleChangeOne} rows="3" cols="25" className='margin-left' value={this.state.valueOne}/>
                <label className='margin-minus'>
                  <input required type="date" placeholder='MM/DD/YYY' onChange={this.dateChange} value={this.state.date} />
                </label>
                <div className='col-9 text-end'>
                  <button type="submit" className="btn btn-success mt-3">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
