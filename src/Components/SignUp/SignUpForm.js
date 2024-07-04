import React, { useEffect, useState, useCallback } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/user";
import Loader from "../../helpers/loader/Loader";

function SignUpForm() {
  const [login, setLogin] = useState(false);
  const [codeSign, setCodeSign] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [logPhone, setLogPhone] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const [codeBox, setCodeBox] = useState(false);
  const [btnOff, setBtnOff] = useState(false);
  const [signOff, setSignOff] = useState(false);
  const [codePhone, setCodePhone] = useState("");
  const [codeOff, setCodeOff] = useState(false);
  const [acceptOff, setAcceptOff] = useState(false);
  const [timer, setTimer] = useState(120);
  const [startCounting, setStartCounting] = useState(false);
  const [code, setCode] = useState("");
  const [invlId, setInvlId] = useState(undefined);
  const [repeat, setRepeat] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const toFarsiNumber = useCallback((n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    n = n.toString().replace(/\d/g, (x) => farsiDigits[x]);
    if (n.length === 4) {
      n = n.split("");
      n.splice(1, 0, ",");
      n = n.join("");
    } else if (n.length === 5) {
      n = n.split("");
      n.splice(2, 0, ",");
      n = n.join("");
    } else if (n.length === 6) {
      n = n.split("");
      n.splice(3, 0, ",");
      n = n.join("");
    } else if (n.length === 7) {
      n = n.split("");
      n.splice(1, 0, ",");
      n.splice(5, 0, ",");
      n = n.join("");
    } else if (n.length === 8) {
      n = n.split("");
      n.splice(2, 0, ",");
      n.splice(6, 0, ",");
      n = n.join("");
    } else if (n.length === 9) {
      n = n.split("");
      n.splice(3, 0, ",");
      n.splice(7, 0, ",");
      n = n.join("");
    }
    return n;
  }, []);
  const makelogin = () => {
    setLogin(true);
  };
  const makesignup = () => {
    setLogin(false);
  };
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
    } else if (/\d/.test(lastName)) {
      setErrorMassage("فامیلی نباید شامل اعداد باشد");
      return false;
    } else if (phoneNumber === "" || phoneNumber === null) {
      setErrorMassage("تلفن را لطفا وارد کنید");
      return false;
    } else if (!/^[0-9]+$/.test(phoneNumber) || !(phoneNumber.length === 11)) {
      setErrorMassage("تلفن وارد شده صحیح نمیباشد");
      return false;
    } else if (password === "" || password === null) {
      setErrorMassage("رمز خالی است");
      return false;
    } else if (password.length < 5) {
      setErrorMassage("رمز باید حداقل 5 کارکتر باشد");
      return false;
    } else if (password.length > 25) {
      setErrorMassage("حداکثر 25 کارکتر مجازید");
      return false;
    }
    setErrorMassage("");
    return true;
  };
  const SignUp = () => {
    if (validateform()) {
      setSignOff(true);
      axios
        .post("https://gajetmajet.iran.liara.run/auth/register", {
          first_name: firstName,
          last_name: lastName,
          phone: phoneNumber,
          password: password,
        })
        .then((res) => {
          setSignOff(false);
          return toast.success("اطلاعات ثبت شد.اکنون وارد شوید", {
            style: {
              fontSize: "14px",
            },
          });
        })
        .catch((err) => {
          if (err.response.data.data.statusCode === 409) {
            setErrorMassage(" اطلاعات تکراری است");
          }
          setSignOff(false);
          return toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          });
        });
    }
  };
  const Login = () => {
    if (logPhone === "" || logPhone === null) {
      toast.error("اطلاعات کامل نمی باشد", {
        style: {
          fontSize: "14px",
        },
      });
    } else if (logPassword === "" || logPassword === null) {
      toast.error("اطلاعات کامل نمی باشد", {
        style: {
          fontSize: "14px",
        },
      });
    } else {
      setBtnOff(true);
      axios
        .post("https://gajetmajet.iran.liara.run/auth/loginPassword", {
          phone: logPhone,
          password: logPassword,
        })
        .then((res) => {
          setBtnOff(false);
          dispatch(logIn([res.data.data.token, res.data.data.bool]));
          document.cookie = `Token=${res.data.data.refreshToken};max-age=31536000;path=/`;
          Navigate("/user");
        })
        .catch((err) => {
          setBtnOff(false);
          console.log(err);
          return toast.error(err.response.data.data.message, {
            style: {
              fontSize: "12px",
            },
          });
        });
    }
  };
  const codeSignHandler = () => {
    if (codePhone === "" || codePhone === null) {
      toast.error("اطلاعات کامل نمی باشد", {
        style: {
          fontSize: "14px",
        },
      });
    } else if (!/^[0-9]+$/.test(codePhone) || !(codePhone.length === 11)) {
      toast.error("اطلاعات کامل نمی باشد", {
        style: {
          fontSize: "14px",
        },
      });
    } else {
      setCodeOff(true);
      axios
        .post("https://gajetmajet.iran.liara.run/auth/Code", {
          phone: codePhone,
        })
        .then((res) => {
          setCodeOff(false);
          setCodeBox(true);
          setStartCounting(true);
        })
        .catch((err) => {
          setCodeOff(false);
          toast.error(err.response.data.data.message, {
            style: {
              fontSize: "14px",
            },
          });
        });
    }
  };
  const acceptCode = () => {
    setAcceptOff(true);
    axios
      .post("https://gajetmajet.iran.liara.run/auth/login", {
        phone: codePhone,
        code: code,
      })
      .then((res) => {
        setAcceptOff(false);
        clearInterval(invlId);
        setStartCounting(false);
        dispatch(logIn([res.data.data.token, res.data.data.bool]));
        document.cookie = `Token=${res.data.data.refreshToken};max-age=31536000;path=/`;
        Navigate("/user");
      })
      .catch((err) => {
        setAcceptOff(false);
        toast.error(err.response.data.data.message, {
          style: {
            fontSize: "14px",
          },
        });
      });
  };
  const replyCode = () => {
    setCodeBox(false);
    setRepeat(false);
    setTimer(120);
  };
  useEffect(() => {
    if (startCounting) {
      let invl = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setInvlId(invl);
      return () => clearInterval(invl);
    }
  }, [startCounting]);
  useEffect(() => {
    if (timer <= 0) {
      setRepeat(true);
      setStartCounting(false);
      clearInterval(invlId);
    }
  }, [timer]);

  return (
    <>
      <Toaster />
      <div className="sign-container">
        <div className="form">
          <div className="signup-container">
            <div className="title">
              <div className="sign-switch-buttons">
                <span
                  className={`sign-switch-button ${
                    login ? "switch-active" : ""
                  }`}
                  onClick={makelogin}
                >
                  ورود
                </span>
                <span>|</span>
                <span
                  className={`sign-switch-button ${
                    login ? "" : "switch-active"
                  }`}
                  onClick={makesignup}
                >
                  ثبت نام
                </span>
              </div>
            </div>
            <div
              className={`signup-form ${
                login ? "sign-fade-out" : "sign-fade-in"
              }`}
            >
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
                type="password"
                placeholder="رمز"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateform();
                }}
                onBlur={() => {
                  validateform();
                }}
              />
              {signOff ? (
                <Loader />
              ) : (
                <button className="sign-up-button" onClick={SignUp}>
                  ساخت اکانت
                </button>
              )}
              <div
                style={{ display: "flex", gap: "5px", alignItems: "baseline" }}
              >
                <small className="sign-small" onClick={makelogin}>
                  ثبت نام کرده اید؟
                </small>
              </div>
            </div>
            <div
              className={`login-form ${
                login ? "sign-fade-in" : "sign-fade-out"
              }`}
            >
              <div
                className="login-code-container"
                style={{ display: codeSign ? "flex" : "none" }}
              >
                {codeBox ? (
                  <>
                    <input
                      type="text"
                      placeholder="کد فرستاده شده را وارد نمایید"
                      className="text-input"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    {acceptOff ? (
                      <Loader />
                    ) : (
                      <button
                        className="sign-login-button"
                        onClick={acceptCode}
                      >
                        تایید
                      </button>
                    )}
                    <span className="sign-timer">
                      {startCounting ? toFarsiNumber(timer) : null}
                    </span>
                    {repeat ? (
                      <span className="sign-code-span" onClick={replyCode}>
                        درخواست مجدد کد
                      </span>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="tel"
                      placeholder="شماره همراه"
                      className="text-input"
                      value={codePhone}
                      onChange={(e) => setCodePhone(e.target.value)}
                    />
                    {codeOff ? (
                      <Loader />
                    ) : (
                      <button
                        className="sign-login-button"
                        onClick={codeSignHandler}
                      >
                        ورود
                      </button>
                    )}
                    <span
                      className="sign-code-span"
                      onClick={() => {
                        setCodeSign(false);
                      }}
                    >
                      ورود با رمز
                    </span>
                  </>
                )}
              </div>
              <div
                className="login-inputs"
                style={{ display: codeSign ? "none" : "block" }}
              >
                <input
                  type="tel"
                  placeholder="شماره همراه"
                  className="text-input"
                  value={logPhone}
                  onChange={(e) => setLogPhone(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="رمز"
                  className="text-input"
                  value={logPassword}
                  onChange={(e) => setLogPassword(e.target.value)}
                />
              </div>
              <div
                className="login-buttons"
                style={{ display: codeSign ? "none" : "flex" }}
              >
                {btnOff ? (
                  <Loader />
                ) : (
                  <button className="sign-login-button" onClick={Login}>
                    ورود
                  </button>
                )}
                <span
                  className="sign-login-span"
                  onClick={() => {
                    setCodeSign(true);
                  }}
                >
                  ورود با رمز یکبار مصرف
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(SignUpForm);
