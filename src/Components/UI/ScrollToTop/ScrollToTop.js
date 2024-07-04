import React,{useState,useEffect} from 'react';
import './ScrollToTop.css';
import {FaAngleDoubleUp} from 'react-icons/fa';
function ScrollToTopbtn() {
    const [totop, settotop] = useState(false);
    const gototop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    const handletotop = () => {
      if(window.pageYOffset >= 300){
        if(!totop){
          settotop(true);
        }
      }
      else{
        if(totop){
          settotop(false);
        }
  
      }

  }
  window.addEventListener("scroll", handletotop);
  return () => {
      window.removeEventListener("scroll", handletotop);
  };

},[totop])


  return (
    <div className={`scroll-btn ${totop?'arrow-fade-in':''}`} onClick={gototop}>
        <span className='arrow-btn'><FaAngleDoubleUp size='25px' /></span>
    </div>
  )
}

export default React.memo(ScrollToTopbtn);