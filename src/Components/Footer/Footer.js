import React, { useState } from "react";
import "./Footer.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTelegram,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { ReactComponent as LogoSepehr } from "../../assets/logoSepehr.svg";

function Footer() {
  const [show, setShow] = useState(false);
  return (
    <footer className="footer-container">
      <div className="trusting-section">
        <div className="trust-container">
          <div className="trusting-containers">
            <figure className="trusting-image-container">
              <img
                src="/images/delivery.png"
                alt="عکس ارسال سریع و امن"
                className="trusting-image"
                loading="lazy"
              />
            </figure>
            <div className="trusting-caption">ارسال سریع و امن</div>
          </div>
          <div className="trusting-containers">
            <figure className="trusting-image-container">
              <img
                src="/images/contact.png"
                alt="عکس پشتیبانی 24 ساعته"
                className="trusting-image"
                loading="lazy"
              />
            </figure>
            <div className="trusting-caption">پشتیبانی 12 ساعته</div>
          </div>
        </div>
        <div className="trust-container">
          <div className="trusting-containers">
            <figure className="trusting-image-container">
              <img
                src="/images/payment.png"
                alt="عکس پرداخت امن"
                className="trusting-image"
                loading="lazy"
              />
            </figure>
            <div className="trusting-caption">پرداخت امن و مطمئن</div>
          </div>
          <div className="trusting-containers">
            <figure className="trusting-image-container">
              <img
                src="/images/guarantee.png"
                alt="عکس ضمانت کیفیت"
                className="trusting-image"
                loading="lazy"
              />
            </figure>
            <div className="trusting-caption">ضمانت کیفیت و اصالت</div>
          </div>
        </div>
      </div>
      {/* <div className='footer-links'>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                  <h2>تماس با ما</h2>
                  <Link to='/'>موقعیت شغلی</Link>
                  <Link to='/'>درباره ما</Link>
                  <Link to='/'>همکاری با ما</Link>
                </div>
                <div className='footer-link-items'>
                  <h2>محصولات ما</h2>
                  <Link to='/'> کیفیت</Link>
                  <Link to='/'> ضمانت</Link>
                  <Link to='/'> کمیت </Link>
                </div>
            </div>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                  <h2>خدمات مشتریان</h2>
                  <Link to='/'> پرسش متداول</Link>
                  <Link to='/'> حریم خصوصی</Link>
                  <Link to='/'>  بازگرداندن کالا</Link>
                </div>
                <div className='footer-link-items'>
                  <h2>راهنمای خرید</h2>
                  <Link to='/'> نحوه ثبت سفارش</Link>
                  <Link to='/'>رویه ارسال </Link>
                  <Link to='/'>شیوه پرداخت </Link>
                </div>
            </div>

        </div> */}
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="social-logo">
            <Link to="/">
              <img src="/images/Meta-Shop.jpg" className="footer-logo" />
            </Link>
            <LogoSepehr width={200} />
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=333406&amp;Code=jtNybbkcfJxkOVAi4UFC"
            >
              <img
                referrerPolicy="origin"
                src="https://Trustseal.eNamad.ir/logo.aspx?id=333406&amp;Code=jtNybbkcfJxkOVAi4UFC"
                alt=""
                style={{ cursor: "pointer" }}
                id="jtNybbkcfJxkOVAi4UFC"
                className="footer-logo"
              />
            </a>
          </div>
          <small className="footer-website-rights">
            تمامی حقوق محفوظ می باشد &copy; 2023
          </small>
          <div className="social-icons">
            {/* <Link
              to="/"
              className="social-icon-link facebook"
              aria-label="فیسبوک متا شاپ"
            >
              <FaFacebookF size="25px" />
            </Link> */}
            <a
              href="https://instagram.com/metaashopp_?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              className="social-icon-link instagram"
              aria-label="اینستاگرام متا شاپ"
            >
              <FaInstagram size="25px" />
            </a>
            {/* <Link
              to="/"
              className="social-icon-link twitter"
              aria-label="توییتر متا شاپ"
            >
              <FaTwitter size="25px" />
            </Link> */}
            {/* <Link
              to="/"
              className="social-icon-link linkedin"
              aria-label="لینکدین متا شاپ"
            >
              <FaLinkedin size="25px" />
            </Link> */}
            <a
              href="https://t.me/Metaashopp"
              className="social-icon-link telegram"
              aria-label="تلگرام متا شاپ"
            >
              <FaTelegram size="25px" />
            </a>
            <a
              href="https://wa.me/qr/LDRGB6DTXDG7O1"
              className="social-icon-link telegram"
              aria-label="واتساپ متا شاپ"
            >
              <FaWhatsapp size="25px" />
            </a>
          </div>
        </div>
        <div className="call-mobiles">
          <div className="mobiles">
            <span style={{ marginLeft: "15px" }}>شماره تماس:</span>
            <span>021-66723344</span>
            <span>021-66725566</span>
            <span>021-66727722</span>
          </div>
          <div className={`developers`}>
            <span
              className="dev-title"
              onClick={() => setShow((prev) => !prev)}
            >
              تیم توسعه :
            </span>
            <a
              className="dev-title"
              href="https://bracketteam.net"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              تیم براکت
            </a>
            {/* <div className={`dev-tooltip ${show ? "dev-show" : ""}`}>
              <div className="dev">
                <span>تیم توسعه : </span>
                <a
                  href="https://bracketteam.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  تیم براکت
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
