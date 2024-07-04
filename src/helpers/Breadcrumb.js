import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";

const BreadcrumbWrap = ({pages}) => {
  return (
    <div className="breadcrumb-area" style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>
      <div className="breadcrumb-container">
        <Breadcrumb>
            {pages?.map(({ path, label }, i) => i !== pages.length - 1 ? (
                <Breadcrumb.Item key={label} linkProps={{to: path}} linkAs={Link} className='Breadcrumb-Item '>
                  {label}
                </Breadcrumb.Item>
            ) : (                
              <Breadcrumb.Item key={label} active>
                {label}
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
      </div>
    </div>
  );
};

export default React.memo(BreadcrumbWrap);