// Icon.js
import React from 'react';
import './Icon.css';

const Icon = ({ ImgSrc, text }) => {
  return (
    <div className="icon">
      <img src={ImgSrc} alt={text} className="icon-image" />
      <span className="icon-text">{text}</span>
    </div>
  );
};

export default Icon;
