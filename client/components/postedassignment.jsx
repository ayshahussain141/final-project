import React from 'react';
import Assignments from './assignments';
import Popup from '../components/popup';

export default class Posted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentList: [],
      courseList: [],
      change: false,
      updateAssignment: false

    };
    this.toggle = this.toggle.bind(this);
    this.changeAssignment = this.changeAssignment.bind(this);
    this.hidePage = this.hidePage.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.handleSubmitassignment = this.handleSubmitassignment.bind(this);
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const head = localStorage.getItem('react-context-jwt');
    const number = localStorage.getItem('id');
    fetch(`/api/finalproject/assignment/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${head}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          courseList: data,
          isHidden: true
        });
      });
  }

  changeAssignment() {
    this.setState({
      change: true,
      updateAssignment: true,
      value: '',
      date: '',
      valueOne: ''
    });
  }

  hidePage() {
    this.setState({ change: false });

  }

  handleChangeOne(event) {
    this.setState({ valueOne: event.target.value });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  dateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleSubmitassignment(event) {
    event.preventDefault();
    const number = localStorage.getItem('id');
    const head = localStorage.getItem('react-context-jwt');
    this.setState({
      change: false,
      updateAssignment: true
    });
    const reqObj = {};
    reqObj.assignment = this.state.value;
    reqObj.about = this.state.valueOne;
    reqObj.dateDue = this.state.date;
    reqObj.courseId = number;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${head}`
      },
      body: JSON.stringify(reqObj)
    };
    fetch('/api/finalproject/assignment', req)
      .then(res => res.json())
      .then(data => {
        const copy = [...this.state.courseList];
        copy.push(data);
        this.setState({
          courseList: copy
        });
      })
      .catch(err => console.error(err));
  }

  toggle(event) {
    const toggleObject = this.state.courseList.find(assignment => assignment.assignmentId === Number(event.target.dataset.number));
    toggleObject.isCompleted = !toggleObject.isCompleted;
    if (toggleObject.isCompleted === true) {
      event.target.className = 'fa-regular fa-circle-check';
    } else if (toggleObject.isCompleted === false) {
      event.target.className = 'fa-regular fa-circle';
    }
    const reqObj = {};
    reqObj.isCompleted = toggleObject.isCompleted;
    fetch(`/api/finalproject/assignment/${event.target.dataset.number}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    })
      .then(res => res.json())
      .then(data => {
        const copy = this.state.courseList.map(assignment => {
          if (assignment.assignmentId === data.assignmentId) {
            return data;
          }
          return assignment;
        });
        this.setState({
          courseList: copy
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const changepageform = this.state.change ? 'view' : 'hidden';
    const form = this.state.updateAssignment
      ? (<form onSubmit={this.handleSubmitassignment}>
        <div className='text-end'><button type='button' className='border-0' onClick={this.hidePage}><i className="fa-solid fa-xmark" /></button></div>
        <div className='row'>
          <div className='col-12'>
            <label>
              <input className='border-color input-large m-3' required type="text" value={this.state.value} onChange={this.handleChange} placeholder='New Assignment' />
            </label>
            <textarea type="text" onChange={this.handleChangeOne} rows="3" cols="25" className='margin' value={this.state.valueOne} />
            <div className='row margin'>
              <label>
                <input required type="date" placeholder='MM/DD/YYY' onChange={this.dateChange} className='border-color' value={this.state.date} />
              </label>
            </div>
          </div>
        </div>
        <div className='col-11 text-end'>
          <button type="submit" className="btn bg-primary m-3 text-light">Add</button>
        </div>
      </form>)
      : null;
    return (
      <div className='container'>
        <Popup />
        <div className='col-9 mx-auto '>
          <div className="mt-5">
            <div className='row'>
              <h1 className='d-inline'>Assignments</h1>
              <i onClick={this.changeAssignment} className="fa-solid fa-plus text-end" />
            </div>
          </div>
          <div>
            <Assignments Toggle={this.toggle} list={this.state.courseList} />
          </div>
        </div>
        <div className={`overlay ${changepageform}`} />
        <div className='row justify-content-center'>
          <div className={`position-absolute boxes ${changepageform}`} >
            {form}
          </div>
        </div>
      </div>
    );
  }
}
