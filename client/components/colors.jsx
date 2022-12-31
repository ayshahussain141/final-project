import React from 'react';
const Colors = ({ onClick }) => {

  return (<div>
    <div onClick={onClick} className='d-inline-flex mt-4'>
      <label data-color="lavendar" className="circle lavendar" />
      <label data-color="thistle" className="circle thistle" />
      <label data-color="plum" className="circle plum" />
      <label data-color="violet" className="circle violet" />
      <label data-color="orchid" className="circle orchid" />
      <label data-color="mediumorchid" className="circle mediumorchid" />
    </div>
    <div onClick={onClick} className='d-inline-flex m-2'>
      <label data-color="indianred" className="circle indianred" />
      <label data-color="lightcoral" className="circle lightcoral" />
      <label data-color="salmon" className="circle salmon" />
      <label data-color="darksalmon" className="circle darksalmon" />
      <label data-color="lightsalmon" className="circle lightsalmon" />
      <label data-color="crimson" className="circle crimson" />
    </div>
    <div onClick={onClick} className='d-inline-flex m-2'>
      <label data-color="pink" className="circle pink" />
      <label data-color="lightpink" className="circle lightpink" />
      <label data-color="mediumslateblue " className="circle mediumslateblue " />
      <label data-color="steelblue" className="circle steelblue" />
      <label data-color="blue" className="circle blue" />
      <label data-color="green" className="circle green" />

    </div>
    <div onClick={onClick} className='d-inline-flex m-2'>
      <label data-color="lime" className="circle lime " />
      <label data-color="limegreen" className="circle limegreen" />
      <label data-color="palegreen" className="circle palegreen" />
      <label data-color="lightgreen" className="circle lightgreen" />
      <label data-color="seagreen" className="circle seagreen" />
      <label data-color="forestgreen" className="circle forestgreen" />

    </div>
  </div>);
};

export default Colors;
