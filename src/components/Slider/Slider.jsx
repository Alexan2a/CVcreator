import "./Slider.css";
import { generateSlides } from "../../utils/generateSlides";
import { useEffect, useMemo, useState } from "react";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const SLIDES = useMemo(() => generateSlides(), []);

  useEffect(() => {
    console.log("slset");
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [SLIDES.length]);

  const handleSetCurrentSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.imgURL})`,
          }}
        >
          <div
            className="slide-background"
            style={{
              backgroundImage: `url(${slide.imgURL})`,
              filter: "blur(2px)",
            }}
          />
          <div className="overlay overlay-slider">{slide.text}</div>
        </div>
      ))}
      <div className="logo-container"></div>
      <div className="circles">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`circle ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleSetCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
