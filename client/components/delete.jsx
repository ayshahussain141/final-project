import React from 'react';

export default class DeleteCourse extends React.Component {

  render() {
    return (<div className={`delete ${this.props.delete}`}>
      <h6 className='text-center m-5'>Do you want to delete this course?</h6>
      <div className='row'>
        <div className='col-12 text-center'>
          <button onClick={this.props.Hide} type="submit" className="btn bg-primary text-light m-2 margin-left">Cancel</button>
          <button onClick={this.props.deleteSubmitform} type="submit" className="btn bg-danger text-light m-2">Delete</button>
        </div>
      </div>
    </div>);
  }
}
