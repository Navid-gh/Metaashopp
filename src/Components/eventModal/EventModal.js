import { useEffect, useState } from "react";
import "./EventModal.css";

const EventModal = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className={`event-modal-wrapper`}
      onClick={() => setShowModal(false)}
      style={
        showModal ? { opacity: 1, height: "100%" } : { opacity: 0, height: 0 }
      }
    >
      <div className={`event-modal ${showModal ? "fade-in" : null}`}>
        <h2 className="event-modal-title">سال نو پیشاپیش مبارک</h2>
        <h3 className="event-modal-header">
          مجموعه متاشاپ سال جدید را پیشاپیش به شما تبریک عرض مینماید
        </h3>
        <p className="event-modal-body">
          به علت تعطیلات سال نو و تعطیلی اداره پست ارسال سفارشات شما از تاریخ ۲۶
          اسفند تا ۱۴ فروردین به تعویق افتاده و از تاریخ ۱۵ فروردین ارسال خواهند
          شد.
        </p>
      </div>
    </div>
  );
};

export default EventModal;
