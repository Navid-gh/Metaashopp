import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../helpers/loader/Loader";
import "./AdminCopmonent.css";
import moment from "moment-jalaali";

const OrderPage = () => {
  const [waitedproducts, setWaitedProducts] = useState([]);
  const [waitedready, setWaitedReady] = useState(false);
  const [expandIndex, setExpandIndex] = useState(-1);
  const { Auth, token, role } = useSelector((state) => state.user);
  useEffect(() => {
    if (Auth && token !== "" && role) {
      axios
        .get("https://gajetmajet.iran.liara.run/notifiaction/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setWaitedProducts(res.data.list);
          setWaitedReady(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            let token = document.cookie
              .split("; ")
              .find((row) => row.startsWith("Token="))
              .split("=")[1];
            axios
              .post("https://gajetmajet.iran.liara.run/auth/refreshToken", {
                refreshToken: token,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((error) => console.log(error));
          }
        });
    }
  }, [Auth, token, role]);
  const Navigate = useNavigate();
  return (
    <div style={{ fontSize: "20px" }}>
      {waitedready ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2>لیست محصولات در انتظار</h2>
          <ol className="admin-products-container">
            {waitedproducts?.map((item, idx) => (
              <li key={idx}>
                <div className="admin-product-container">
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      paddingBottom: "6px",
                    }}
                  >
                    <span>محصول : {item.title_product}</span>
                    <span>تعداد افراد منتظر : {item.length_notification}</span>
                    <span
                      style={{
                        backgroundColor: "#f2f2f2",
                        padding: "6px",
                        borderRadius: "12px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setExpandIndex((prev) => (prev === idx ? -1 : idx))
                      }
                    >
                      مشاهده افراد در انتظار
                    </span>
                  </div>
                  <div
                    style={{
                      display: expandIndex === idx ? "flex" : "none",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {item.users.map((user, idx) => {
                      return (
                        <div key={idx} className="admin-product-saled">
                          <span>
                            اسم : {user.first_name + " " + user.last_name}
                          </span>
                          <span>
                            تاریخ :{" "}
                            {moment(user.date).format("jYYYY/jMM/jDD HH:mm:ss")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default OrderPage;
