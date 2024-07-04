import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserComments.css";
import Loader from "../../../../helpers/loader/Loader";
import ProductRating from "../../../ProductRating";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function UserComments() {
  const [comments, setComments] = useState([]);
  const [ready, setReady] = useState(false);
  let { Auth, token } = useSelector((state) => state.user);
  useEffect(() => {
    if (Auth && token !== "") {
      axios
        .get("https://gajetmajet.iran.liara.run/user/allComments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setComments(res.data.data.listComment);
          setReady(true);
        })
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
    setComments((prev) => prev);
  }, [comments]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  return (
    <div className="user-comments-wrapper">
      <Toaster />
      <span className="user-comments-containers-headers">نظرات من</span>
      <ul className="user-comments-container">
        {ready ? (
          comments?.length > 0 ? (
            comments?.map((comment, idx) => {
              return (
                <li className="user-comment-container" key={idx}>
                  <figure className="user-comment-img-container">
                    <img
                      src={`https://gajetmajet.iran.liara.run/${comment.images[0]}`}
                      className="user-comment-img"
                    />
                  </figure>
                  <div className="user-comment-details-container">
                    <span className="user-comment-title">{comment.title}</span>
                    <span className="user-comment-rting">
                      <ProductRating ratingValue={comment.star} />
                    </span>
                    <span className="user-comment-comment">
                      {comment.comment}
                    </span>
                    {/* <span className='user-comment-likes'>{comment.likes.length}<AiOutlineHeart size='16px' /></span> */}
                  </div>
                </li>
              );
            })
          ) : (
            <span style={{ fontSize: "14px" }}>
              شما تا کنون نظری نداده اید...
            </span>
          )
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}

export default React.memo(UserComments);
