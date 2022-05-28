import React from 'react';
import theme from 'constants/theme';

export type ListYourHomePanelProps = {
  icon?: any;
  title?: string;
  description?: string;
};

const ListYourHomePanel: React.FC<ListYourHomePanelProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="lyhPanel">
    <div className="lyhPanel__header">
      <Icon width={54} height={54} fill={theme.colors?.indigo[400]} />
    </div>
    <div className="lyhPanel__body">
      <h3 className="lyhPanel__title">{title}</h3>
      <p className="lyhPanel__content">{description}</p>
    </div>
  </div>
);

export default ListYourHomePanel;
