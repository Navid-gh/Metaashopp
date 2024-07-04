import React, { useState,useEffect } from 'react';
import './HeaderImages.css';
import SlideShow from '../SlideShow/SlideShow';
import { Link } from 'react-router-dom';
function HeaderImages() {
  const [changesize,setchange] = useState({
    small:false,
    normal:false,
    big:true
  });
  useEffect(() => {
    const handlechange = () => {
      if (window.innerWidth<= 700 && window.innerWidth >= 500){
        if(!changesize.normal){
          setchange({
            small:false,
            normal:true,
            big:false            
          });
        }
      }else if (window.innerWidth <= 500){
        if(!changesize.small){
          setchange({
            small:true,
            normal:false,
            big:false            
          });
        }
      }
      else{
        if(!changesize.big){
          setchange({
            small:false,
            normal:false,
            big:true            
          });
        }
      }
    }
  handlechange();
  window.addEventListener("resize", handlechange);
  return () => {
      window.removeEventListener("resize", handlechange);
  };

},[changesize])  
  return (
    <div className='HeaderImages-wrapper'>
        <SlideShow />
        <div className='HeaderImages-container'>
            <div className='HeaderImages-images-container'>
              <Link to='/' aria-label='تبلیغات'>
                
                 <figure className='HeaderImages-images-figure' >
                     <img src={`${changesize.big?'/images/0.jpg':changesize.normal?'/images/0500.jpg':'/images/000.jpg'}`} 
                     alt='عکس تبلیغاتی' className='HeaderImages-images'
                     loading='lazy' />
                 </figure>

              </Link>
            </div>
            <div className='HeaderImages-images-container'>
              <Link to='/' aria-label='تبلیغات'>

                 <figure className='HeaderImages-images-figure' >
                     <img src={`${changesize.big?'/images/1.jpg':changesize.normal?'/images/1500.jpg':'/images/111.jpg'}`} 
                     alt='عکس تبلیغاتی' className='HeaderImages-images'
                     loading='lazy' />
                 </figure>
                                 
              </Link>
            </div>
        </div>
    </div>
  )
}

export default React.memo(HeaderImages);