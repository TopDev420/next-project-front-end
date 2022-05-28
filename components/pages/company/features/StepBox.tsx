import React from 'react';

const StepBox: React.FC<{
  title: string;
  content: string;
  img: string;
}> = ({ title, content, img }) => (
  <div className="shadow-2xl step-box p-6 h-full relative overflow-hidden transition-all duration-500">
    <div className="my-5 img-container">
      <img alt={title} src={img} className="mx-auto" />
    </div>
    <h2 className="text-center">{title}</h2>
    <div className="px-6 py-2">
      <div className="middle-line">
        <div className="blue-ball" />
      </div>
    </div>
    <div className="text-content px-6">{content}</div>
  </div>
);

export default StepBox;
