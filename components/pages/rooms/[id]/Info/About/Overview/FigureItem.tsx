import React from 'react';
import { formatNumber } from 'lib/helpers/number';
import { plural } from 'lib/helpers/string';

const FigureItem: React.FC<{
  figure?: number;
  text: string;
  showMultipleIndicator?: boolean;
}> = ({ figure, text, showMultipleIndicator }) => (
  <li className="p-4 text-center flex-1">
    <strong>
      {figure !== undefined && formatNumber(figure)}{' '}
      {figure > 1 ? plural(text) : text}
    </strong>
    {showMultipleIndicator ? (
      <small className="text-gray-500"> / Room</small>
    ) : null}
  </li>
);

export default FigureItem;
