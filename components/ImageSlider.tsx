"use client";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "320px",
  borderRadius: "8px",
  overflow: "hidden",
};

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  return (
    <div className="max-w-full">
      <Slide transitionDuration={200}>
        {images.map((slideImage, index) => (
          <div key={index}>
            <div style={{ ...divStyle }}>
              <img
                src={slideImage}
                className="min-w-full min-h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
