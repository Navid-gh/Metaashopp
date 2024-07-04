import axios from "axios";
import React, { useState, useEffect } from "react";
import "../SignUp/SignUpForm.css";
import "./EditComponent.css";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../helpers/loader/Loader";

function EditComponent({ inf }) {
  const [firstName, setFirstName] = useState(inf ? inf?.first_name : null);
  const [lastName, setLastName] = useState(inf ? inf?.last_name : null);
  const [phoneNumber, setPhoneNumber] = useState(inf ? inf?.phone : null);
  const [address, setAdress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const [btnOff, setBtnOff] = useState(false);
  let { Auth, token } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  useEffect(() => {
    if (!Auth) {
      Navigate("/SignUp");
    }
  }, []);
  const validateform = () => {
    if (firstName === "" || firstName === null) {
      setErrorMassage("اسم خالی است");
      return false;
    } else if (/\d/.test(firstName)) {
      setErrorMassage("اسم نباید شامل اعداد باشد");
      return false;
    } else if (lastName === "" || lastName === null) {
      setErrorMassage("فامیلی خالی است");
      return false;
    }
    // else if (!username.includes('@') || !username.includes('.') ) {
    //   setErrorMassage('username needs "@" and "."');
    //     return false;
    // }
    else if (/\d/.test(lastName)) {
      setErrorMassage("فامیلی نباید شامل اعداد باشد");
      return false;
    } else if (phoneNumber === "" || phoneNumber === null) {
      setErrorMassage("تلفن را لطفا وارد کنید");
      return false;
    } else if (!/^[0-9]+$/.test(phoneNumber) || !(phoneNumber.length === 11)) {
      setErrorMassage("تلفن وارد شده صحیح نمیباشد");
      return false;
    } else if (address === "" || address === null) {
      setErrorMassage("ادرس را لطفا وارد کنید");
      return false;
    } else if (postalCode === "" || postalCode === null) {
      setErrorMassage("کد پستی را لطفا وارد کنید");
      return false;
    } else if (!/^[0-9]+$/.test(postalCode)) {
      setErrorMassage("کد پستی وارد شده صحیح نمیباشد");
      return false;
    } else if (postalCode.length !== 10) {
      setErrorMassage("کد پستی وارد شده ده رقم باید باشد");
      return false;
    }
    // else if(password === '' || password === null){
    //   setErrorMassage('رمز خالی است');
    //     return false;
    // }
    // else if (password.length < 5){
    //   setErrorMassage('رمز باید حداقل 5 کارکتر باشد');
    //     return false;
    // }
    // else if (password.length > 25){
    //   setErrorMassage('حداکثر 25 کارکتر مجازید');
    //     return false;
    // }
    setErrorMassage("");
    return true;
  };
  const editHadler = () => {
    if (validateform()) {
      setBtnOff(true);
      axios
        .patch(
          "https://gajetmajet.iran.liara.run/user/updateUserProfile",
          {
            first_name: firstName,
            last_name: lastName,
            phone: phoneNumber,
            address: address,
            postalCode: postalCode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setBtnOff(false);
          Navigate("/user");
        })
        .catch((err) => {
          setBtnOff(false);
          return toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          });
        });
    }
  };
  return (
    <>
      <Toaster />
      {inf ? (
        <div className="sign-container" style={{ height: "92vh" }}>
          <div className="form editForm">
            <div className="signup-container">
              <div className="signup-form">
                <h2 style={{ color: "#333333" }}>ویرایش اطلاعات</h2>
                <p
                  className="signup-error"
                  style={{
                    display: `${errorMassage.length > 0 ? "block" : "none"}`,
                  }}
                >
                  {errorMassage}
                </p>
                <div className="name">
                  <input
                    type="text"
                    placeholder="نام"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateform();
                    }}
                    onBlur={() => {
                      validateform();
                    }}
                  />
                  <input
                    type="text"
                    placeholder="نام خانوادگی"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateform();
                    }}
                    onBlur={() => {
                      validateform();
                    }}
                  />
                </div>
                <input
                  className="text-input"
                  type="tel"
                  placeholder="شماره موبایل"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    validateform();
                  }}
                  onBlur={() => {
                    validateform();
                  }}
                />
                <input
                  className="text-input"
                  type="text"
                  placeholder="ادرس"
                  value={address}
                  onChange={(e) => {
                    setAdress(e.target.value);
                    validateform();
                  }}
                  onBlur={() => {
                    validateform();
                  }}
                />
                <input
                  className="text-input"
                  type="text"
                  placeholder="کد پستی"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    validateform();
                  }}
                  onBlur={() => {
                    validateform();
                  }}
                />
                {btnOff ? (
                  <Loader />
                ) : (
                  <button className="sign-up-button" onClick={editHadler}>
                    ثبت تغییرات
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span style={{ fontSize: "20px", padding: "30px" }}>
          اطلاعاتی برای نمایش وجود ندارد
        </span>
      )}
    </>
  );
}

export default React.memo(EditComponent);
