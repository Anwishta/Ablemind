"use strict";

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import classnames from "classnames";
import { canGoNext } from "./utils/innerSliderUtils";

// 🔹 Custom Left Arrow
export class PrevArrow extends React.PureComponent {
  clickHandler(options, e) {
    if (e) e.preventDefault();
    this.props.clickHandler(options, e);
  }

  render() {
    let prevClasses = { "slick-arrow": true, "slick-prev": true };
    let prevHandler = this.clickHandler.bind(this, { message: "previous" });

    if (
      !this.props.infinite &&
      (this.props.currentSlide === 0 ||
        this.props.slideCount <= this.props.slidesToShow)
    ) {
      prevClasses["slick-disabled"] = true;
      prevHandler = null;
    }

    return (
      <button
        key="0"
        type="button"
        data-role="none"
        className={classnames(prevClasses)}
        onClick={prevHandler}
        style={{ position: "absolute", left: "-50px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
      >
        <FaChevronLeft className="text-3xl text-black hover:text-gray-800 transition-all duration-300" />
      </button>
    );
  }
}

// 🔹 Custom Right Arrow
export class NextArrow extends React.PureComponent {
  clickHandler(options, e) {
    if (e) e.preventDefault();
    this.props.clickHandler(options, e);
  }

  render() {
    let nextClasses = { "slick-arrow": true, "slick-next": true };
    let nextHandler = this.clickHandler.bind(this, { message: "next" });

    if (!canGoNext(this.props)) {
      nextClasses["slick-disabled"] = true;
      nextHandler = null;
    }

    return (
      <button
        key="1"
        type="button"
        data-role="none"
        className={classnames(nextClasses)}
        onClick={nextHandler}
        style={{ position: "absolute", right: "-50px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
      >
        <FaChevronRight className="text-3xl text-black hover:text-gray-800 transition-all duration-300" />
      </button>
    );
  }
}
