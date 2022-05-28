import React from 'react';

const WordContent: React.FC<{
  title: string;
  content: React.ReactNode;
  borderTitle: string;
  img: string;
}> = ({ title, content, img, borderTitle }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-12">
    <div className="col-span-4 py-5">
      <img className="w-full" src={img} alt={title} />
    </div>
    <div className="col-span-8 p-5">
      <h3>{title}</h3>
      <h5 className="mt-3 pb-2">{borderTitle}</h5>
      <div className="custom-bottom-border" />
      {content}
    </div>
  </div>
);

export default WordContent;
