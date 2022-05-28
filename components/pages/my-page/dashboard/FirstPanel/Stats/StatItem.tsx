import React from 'react';
import Link from 'next/link';

type StatItemProps = {
  title: string;
  route: string;
  figure: number;
};

const StatItem: React.FC<StatItemProps> = ({ title, route, figure }) => (
  <div className="flex flex-row items-center justify-between py-2 px-4 hover:bg-gray-100">
    <Link href={`/my-page/${route}`}>{title}</Link>
    <span className="ml-2 text-white rounded-full bg-gray-600 text-xs w-4 h-4 flex justify-center items-center">
      {figure}
    </span>
  </div>
);

export default StatItem;
