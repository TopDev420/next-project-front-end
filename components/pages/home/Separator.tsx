import React from 'react';

const Separator: React.FC = ({ children }) => (
  <div className="separator">
    <div className="separator__inner">{children}</div>
  </div>
);

export default Separator;
