import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./userPanel.css";
import {
  IoPersonCircleOutline,
  IoPhonePortraitOutline,
  IoLocationOutline,
  IoCarOutline,
  IoHomeOutline,
  IoCartOutline,
  IoHeartOutline,
  IoChatbubbleEllipsesOutline,
  IoExitOutline,
  IoPencilOutline,
} from "react-icons/io5";
import axios from "axios";
import Loader from "../../helpers/loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/user";
import { useSelector } from "react-redux";

function UserPanel() {
  const [inf, setInf] = useState({});
  const [ready, setReady] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  let { Auth, token } = useSelector((state) => state.user);
  useEffect(() => {
    if (!Auth) {
      Navigate("/SignUp");
    }
  }, []);
  useEffect(() => {
    if (Auth && token !== "") {
      axios
        .get("https://gajetmajet.iran.liara.run/user/getInformationUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setInf(res.data.data.result[0]);
          setReady(true);
        })
        .catch((err) => console.log(err))
        .catch((err) =>
          toast.error("خطا در برقراری ارتباط", {
            style: {
              fontSize: "14px",
            },
          })
        );
    }
  }, [Auth, token]);
  useEffect(() => {
    setInf((prev) => prev);
  }, [inf]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  const editHandler = () => {
    Navigate("/EditInfo", { state: inf });
  };
  const logOutHandler = () => {
    dispatch(logOut());
    document.cookie = "Token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    Navigate("/");
  };
  return (
    <>
      <Toaster />
      {ready ? (
        <div className="user-wrapper">
          <div className="user-right-section">
            <div className="user-information">
              <div className="user-information-name">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <IoPersonCircleOutline size="16px" />
                  <span
                    style={{ fontSize: "14px", color: "#333333" }}
                  >{`${inf.first_name} ${inf.last_name}`}</span>
                </div>
                <span style={{ marginRight: "30%" }}>
                  <IoPencilOutline
                    size="14px"
                    cursor="pointer"
                    onClick={editHandler}
                  />
                </span>
              </div>
              <div className="user-information-summary">
                <div className="user-information-lines">
                  <IoPhonePortraitOutline size="14px" />{" "}
                  <span>{inf.phone}</span>
                </div>
                <div className="user-information-lines">
                  <IoLocationOutline size="14px" />{" "}
                  <span>{inf?.address?.address}</span>
                </div>
                <div className="user-information-lines">
                  <IoCarOutline size="14px" />{" "}
                  <span>{inf?.address?.postalCode}</span>
                </div>
              </div>
            </div>
            <ul className="user-navigation-container">
              <NavLink to="" end>
                <li className="user-navigation">
                  <IoHomeOutline size="14px" />
                  <span>خلاصه فعالیت ها</span>
                </li>
              </NavLink>
              <NavLink to="orders">
                <li className="user-navigation">
                  <IoCartOutline size="14px" />
                  <span>سفارش های من</span>
                </li>
              </NavLink>
              <NavLink to="wishlist">
                <li className="user-navigation">
                  <IoHeartOutline size="14px" />
                  <span>علاقه مندی من</span>
                </li>
              </NavLink>
              <NavLink to="comments">
                <li className="user-navigation">
                  <IoChatbubbleEllipsesOutline size="14px" />
                  <span> نظرات من</span>
                </li>
              </NavLink>
              <li
                className="user-navigation"
                style={{ padding: "10px" }}
                onClick={() => logOutHandler()}
              >
                <IoExitOutline size="14px" />
                <span>خروج</span>
              </li>
            </ul>
          </div>
          <div className="user-left-section">
            <Outlet />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default React.memo(UserPanel);
