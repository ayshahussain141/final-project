import React from 'react';
import Header from './header';
import ListItems from './course';
import Colors from './colors';
import Assignments from './assignments';
import AuthForm from './signup';

export default class Course extends React.Component {
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
      clickedCourseAssignments: [],
      valueOne: '',
      change: false,
      date: '',
      clickedCourse: null,
      popup: false,
      number: [],
      updateAssignment: false
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
    this.hidePopup = this.hidePopup.bind(this);
    this.OpenPopup = this.OpenPopup.bind(this);
    this.deleteSubmit = this.deleteSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.viewCourse = this.viewCourse.bind(this);
    this.hidePage = this.hidePage.bind(this);

  }

  AddClass() {
    this.setState({ isActive: true });
  }

  HideClass() {
    this.setState({
      isActive: false,
      value: '',
      color: 'white'
    });
  }

  OpenDrawer() {
    this.setState({ toggle: true });
  }

  CloseDrawer() {
    this.setState({ toggle: false });
  }

  viewCourse() {
    this.setState({ isHidden: this.state.isHidden });
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

  ChangeView(event) {
    const clickedId = parseInt(event.target.closest('li').getAttribute('data-number'));
    const arr = [];
    const assignmentListCopy = [...this.state.assignmentList];
    for (let i = 0; i < assignmentListCopy.length; i++) {
      if (assignmentListCopy[i].courseId === clickedId) {
        arr.push(assignmentListCopy[i]);
      }
    }
    this.setState({
      isHidden: !this.state.isHidden,
      clickedCourseAssignments: arr,
      clickedCourse: clickedId
    });
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
    this.setState({
      change: false,
      updateAssignment: true
    });
    const reqObj = {};
    reqObj.assignment = this.state.value;
    reqObj.about = this.state.valueOne;
    reqObj.dateDue = this.state.date;
    reqObj.courseId = this.state.clickedCourse;
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
        this.state.assignmentList.push(data);
        const arr = [];
        const assignmentListCopy = this.state.assignmentList;
        for (let i = 0; i < assignmentListCopy.length; i++) {
          if (assignmentListCopy[i].courseId === this.state.clickedCourse) {
            arr.push(assignmentListCopy[i]);
          }
        }
        const assignmentCopy = [...this.state.assignmentList];
        assignmentCopy.push(data);
        this.setState({
          assignmentList: assignmentCopy,
          clickedCourseAssignments: arr
        });

      })
      .catch(err => console.error(err));
  }

  hidePage() {
    this.setState({ change: false });

  }

  changeAssignment() {
    this.setState({
      change: true,
      updateAssignment: true
    });
  }

  hidePopup() {
    this.setState({ popup: false });
  }

  OpenPopup(event) {
    this.setState({ popup: true });
    const clickedId = Number(event.target.closest('i').getAttribute('id'));
    this.setState({ number: clickedId });
  }

  deleteSubmit(event) {
    this.setState({ popup: false });
    const id = this.state.number;
    const toggleObject = this.state.courseList.filter(course => course.courseId !== this.state.number);
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toggleObject)
    };
    fetch(`/api/finalproject/${id}`, req)
      .then(() => {
        this.setState({ courseList: toggleObject });
      })
      .catch(err => console.error(err));
  }

  toggle(event) {
    const toggleObject = this.state.assignmentList.find(assignment => assignment.assignmentId === Number(event.target.dataset.number));
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
        const copy = [...this.state.assignmentList];
        copy.push(data);
        this.setState({
          assignmentList: copy
        });
      })
      .catch(err => console.error(err));
  }

  render(event) {
    const buttonText = this.state.isActive ? 'view' : 'hidden';
    const button = this.state.toggle ? 'view' : 'hidden';
    const changepage = this.state.isHidden ? 'view' : 'hidden';
    const changepagetwo = this.state.isHidden ? 'hidden' : 'view';
    const changepageform = this.state.change ? 'view' : 'hidden';
    const deletePopup = this.state.popup ? 'view' : 'hidden';
    const form = this.state.updateAssignment
      ? (<form onSubmit={this.handleSubmitOne}>
        <label className='col-9 max-auto mt-5 mb-2'>
          <input required type="text" value={this.state.value} onChange={this.handleChange} placeholder='New Assignment'/>
        </label>
        <textarea type="text" onChange={this.handleChangeOne} rows="3" cols="25" className='margin-left' value={this.state.valueOne}/>
        <label className='margin-minus'>
          <input required type="date" placeholder='MM/DD/YYY' onChange={this.dateChange} value={this.state.date} />
        </label>
        <div className='col-9 text-end'>
          <button type="submit" className="btn bg-primary m-3 text-light">Add</button>
          <button onClick={this.hidePage} type="button" className="btn bg-primary m-3 text-light">Cancel</button>
        </div>
      </form>)
      : null;

    return (<div>
      <Header />
      <AuthForm/>
      <div className="row hidden">
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

      <div className="col-9 mx-auto hidden">
        <div className={`ml-1 ${changepagetwo}`}>
          <h1>Courses</h1>
          <ListItems popup={this.OpenPopup} changeView={this.ChangeView} list={this.state.courseList}/>
        </div>
      </div>

      <div className={`box ${buttonText}`}>
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
            <div className='row'>
              <div className='col-9 margin'>
                <button type="submit" className="btn bg-white text-danger outline-danger m-3">Add</button>
                <button onClick={this.HideClass} type="button" className="btn bg-white text-danger outline-danger m-3">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className={`row ${button}`}>
          <div className='col-2 popup'>
            <i onClick={this.CloseDrawer} className="col-12 fa-solid fa-x text-end text-dark" />
            <a onClick={this.viewCourse}><h5 className='m-2 text-center'>Courses</h5></a>
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
              <Assignments Toggle={this.toggle} list={this.state.clickedCourseAssignments}/>
            </div>
          </div>

          <div className={`overlay ${changepageform}`} />
          <div className='row text-center'>
            <div className={`boxes ${changepageform}`} >
              {form}
            </div>
          </div>
        </div>
      </div>

      <div className={`delete ${deletePopup}`}>
        <h6 className='text-center m-5'>Do you want to delete this course?</h6>
        <div className='row'>
          <div className='col-12 text-center'>
            <button onClick={this.hidePopup} type="submit" className="btn bg-primary text-light m-2 margin-left">Cancel</button>
            <button onClick={this.deleteSubmit} type="submit" className="btn bg-danger text-light m-2">Delete</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
