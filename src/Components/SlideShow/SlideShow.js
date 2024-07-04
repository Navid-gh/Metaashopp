import React, { useEffect, useState } from "react";
import "./SlideShow.css";
import Slide from "./Slide";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Loader from "../../helpers/loader/Loader";
import toast, { Toaster } from "react-hot-toast";

function SlideShow() {
  const [images, setImages] = useState([]);
  const [ready, setReady] = useState(false);
  const [mobileHover, setMobileHover] = useState(false);
  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth <= 724) {
        if (!mobileHover) {
          setMobileHover(true);
        }
      } else {
        if (mobileHover) {
          setMobileHover(false);
        }
      }
    };
    handleMobile();
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, [mobileHover]);
  useEffect(() => {
    axios
      .get("https://gajetmajet.iran.liara.run/slider/getSlider")
      .then((res) => {
        setImages(res.data.result);
        setReady(true);
      })
      .catch((err) =>
        toast.error("خطا در برقراری ارتباط", {
          style: {
            fontSize: "14px",
          },
        })
      );
  }, []);
  useEffect(() => {
    setImages((prev) => prev);
  }, [images]);
  useEffect(() => {
    setReady((prev) => prev);
  }, [ready]);
  return (
    <>
      <Toaster />
      {ready ? (
        <div className="slideshow">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3500}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            //pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 1,
                //partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 800,
                  min: 600,
                },
                items: 1,
                //partialVisibilityGutter: 30
              },
              mobilesmall: {
                breakpoint: {
                  max: 600,
                  min: 0,
                },
                items: 1,
                //partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 800,
                },
                items: 1,
                //partialVisibilityGutter: 30
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {images?.map((slide, id) => (
              <Slide
                src={mobileHover ? slide.image[1] : slide.image[0]}
                key={id}
                link={slide.link}
                mobile={mobileHover}
              />
            ))}
          </Carousel>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default React.memo(SlideShow);
