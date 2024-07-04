import { memo } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h1 className="contact-header">شماره تماس</h1>
        <div className="contact-phones-containers">
          <span className="phones-header">ثابت</span>
          <div className="phones-containers">
            <span>021-66723344</span>
            <span>021-66725566</span>
            <span>021-66727722</span>
          </div>
        </div>
        <div className="contact-phones-containers">
          <span className="phones-header">همراه</span>
          <div className="phones-containers">
            <span>09353040700</span>
            <span>09331800037</span>
          </div>
        </div>
        <div className="contact-phones-containers">
          <span className="phones-header">آدرس</span>
          <div className="phones-containers">
            <span>
              تهران - خیابان جمهوری - خیابان حافظ - مجتمع تجاری علاالدین 3 -
              طبقه منفی یک - پلاک 39
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ContactUs);
