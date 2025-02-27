import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className='loader-container'>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div> 
  )
}

export default React.memo(Loader)