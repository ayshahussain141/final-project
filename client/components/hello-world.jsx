import React from 'react';
import ListItems from './course';
import Assignments from './assignments';
import DeleteCourse from './delete';
import CourseForm from './courseform';
import Popup from './popup';

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.ChangeView = this.ChangeView.bind(this);
    this.ChangeSee = this.ChangeSee.bind(this);
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleSubmitassignment = this.handleSubmitassignment.bind(this);
    this.changeAssignment = this.changeAssignment.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.OpenPopup = this.OpenPopup.bind(this);
    this.deleteSubmit = this.deleteSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
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

  componentDidMount() {
    const head = localStorage.getItem('react-context-jwt');
    fetch('/api/finalproject', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': `${head}`
      }
    })
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
    reqObj.userId = localStorage.getItem('user');
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

  handleSubmitassignment(event) {
    event.preventDefault();
    this.setState({
      change: false,
      updateAssignment: true,
      valueOne: '',
      value: '',
      date: ''
    });
    event.target.reset();
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
    const changepage = this.state.isHidden ? 'view' : 'hidden';
    const changepagetwo = this.state.isHidden ? 'hidden' : 'view';
    const changepageform = this.state.change ? 'view' : 'hidden';
    const deletePopup = this.state.popup ? 'view' : 'hidden';
    const form = this.state.updateAssignment
      ? (<form onSubmit={this.handleSubmitassignment}>
        <div className='text-end'><button type='button' className='border-0' onClick={this.hidePage}><i className="fa-solid fa-xmark" /></button></div>
        <div className='row'>
          <div className='col-12'>
            <label>
              <input className='border-color input-large m-3' required type="text" value={this.state.value} onChange={this.handleChange} placeholder='New Assignment'/>
            </label>
            <textarea type="text" onChange={this.handleChangeOne} rows="3" cols="25" className='margin-left' value={this.state.valueOne}/>
            <div className='row margin-left'>
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
      : false;

    return (
      <div className='container'>
        <div className="row">
          <div className='col-12'>
            <div className='row'>
              <div className='col-2 text-center'>
                <Popup />
              </div>
              <div className='col-9 text-end'>
                <i onClick={this.AddClass} className={`fa-solid fa-plus mt-5 ${changepagetwo}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-9 mx-auto">
          <div className={`ml-1 ${changepagetwo}`}>
            <h1>Courses</h1>
            <ListItems popup={this.OpenPopup} changeView={this.ChangeView} list={this.state.courseList}/>
          </div>
        </div>
        <CourseForm ButtonText={buttonText} Colors={this.state.color} Changecolors={this.colorChange} Hide={this.HideClass} handle={this.handleChange} values={this.state.value} Submit={this.handleSubmit}/>

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
            <div className='row justify-content-center'>
              <div className={`position-absolute boxes ${changepageform}`} >
                {form}
              </div>
            </div>
          </div>
        </div>
        <DeleteCourse Hide={this.hidePopup} deleteSubmitform={this.deleteSubmit} delete={deletePopup}/>
      </div>
    );
  }
}
