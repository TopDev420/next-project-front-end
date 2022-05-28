import React from 'react';

type PlaceSearchProps = {
  value?: string;
  onChange?: (val: string) => void;
};

export const PlaceSearchInput: React.FC<PlaceSearchProps> = ({
  value = '',
  onChange = () => {},
}) => (
  <input
    className="outline-none p-2 flex-1 text-sm w-full"
    type="text"
    placeholder="City, State"
    value={value}
    onChange={(e) => onChange(e.target.value || '')}
  />
);

const Container = React.forwardRef<HTMLInputElement, PlaceSearchProps>(
  ({ value, onChange }, ref) => (
    <input
      ref={ref}
      className="outline-none p-2 flex-1 text-sm w-full"
      type="text"
      placeholder="City, State"
      value={value}
      onChange={(e) => onChange(e.target.value || '')}
    />
  ),
);

export default Container;
