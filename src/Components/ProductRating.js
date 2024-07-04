import PropTypes from "prop-types";
import React, { Fragment,useState,useEffect } from "react";
import {AiFillStar} from 'react-icons/ai';
const ProductRating = ({ ratingValue }) => {
  const [small, setsmall] = useState(true);
  useEffect(() => {
    const handlesize = () => {
      if(window.innerWidth <= 1120){
        if(small){
          setsmall(false);
        }
      }
      else{
        if(!small){
          setsmall(true);
        }
  
      }

  }
  handlesize();
  window.addEventListener("resize", handlesize);
  return () => {
      window.removeEventListener("resize", handlesize);
  };

},[small])
  let rating = [];

  for (let i = 0; i < 5; i++) {
    rating.push(<span style={{color:'#ccc'}}  key={i}><AiFillStar size={`${small?'16px':'20px'}`}/></span>);
  }
  if (ratingValue && ratingValue > 0) {
    for (let i = 0; i <= ratingValue - 1; i++) {
      rating[i] = <span style={{color:'#f9bc00'}}  key={i}><AiFillStar size={`${small?'16px':'20px'}`}/></span>;
    }
  }
  return <Fragment>{rating}</Fragment>;
};

ProductRating.propTypes = {
  ratingValue: PropTypes.number
};

export default React.memo(ProductRating);
