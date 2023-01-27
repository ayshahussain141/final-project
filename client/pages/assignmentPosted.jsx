import React from 'react';
import Posted from '../components/postedassignment';
import Popup from '../components/popup';
export default class AssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      updateAssignment: false
    };
    this.changeAssignment = this.changeAssignment.bind(this);
    this.hidePage = this.hidePage.bind(this);
  }

  changeAssignment() {
    this.setState({
      change: true,
      updateAssignment: true
    });
  }

  hidePage() {
    this.setState({ change: false });

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
            <textarea type="text" onChange={this.handleChangeOne} rows="3" cols="25" className='margin-left' value={this.state.valueOne} />
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
            <Posted />
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
