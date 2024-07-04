import React from "react";
import "./SlideShow.css";
import { Link } from "react-router-dom";
function Slide({ src, link }) {
  return (
    <Link to={link}>
      {/* <div
        className="slide-image"
        style={{
          backgroundImage: `url(https://gajetmajet.iran.liara.run/${src})`,
        }}
      /> */}
      <img
        className="slide-image"
        src={`https://gajetmajet.iran.liara.run/${src}`}
      />
    </Link>
  );
}

export default React.memo(Slide);
