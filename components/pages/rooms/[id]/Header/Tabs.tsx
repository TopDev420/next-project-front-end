import React, { useState } from 'react';
import { normalizeHash } from 'lib/helpers/url';

const TabNames = [
  'photos',
  'about',
  'host',
  'location',
  'similar-listings',
] as const;

type TabName = typeof TabNames[number];

const getInitialTab = (): TabName => {
  if (typeof window === 'undefined') {
    return 'photos';
  }

  const hash = normalizeHash(window.location.hash) as any;
  if (!TabNames.includes(hash)) {
    return 'photos';
  }
  return hash;
};

const Tab: React.FC<{
  title: string;
  hash: string;
  active: boolean;
  onClick: () => void;
}> = ({ title, hash, active, onClick }) => (
  <li
    className={`px-4 py-2 whitespace-nowrap ${
      active ? 'border-b border-blue-700 text-blue-700' : ''
    }`}
  >
    <a href={`#${hash}`} onClick={onClick}>
      {title}
    </a>
  </li>
);

const Tabs = () => {
  const [tab, setTab] = useState(getInitialTab());
  return (
    <ul className="my-4 flex flex-row border overflow-x-auto hidden">
      <Tab
        active={tab === 'photos'}
        title="Photos"
        hash="photos"
        onClick={() => setTab('photos')}
      />
      <Tab
        active={tab === 'about'}
        title="About"
        hash="about"
        onClick={() => setTab('about')}
      />
      <Tab
        active={tab === 'host'}
        title="Host"
        hash="host"
        onClick={() => setTab('host')}
      />
      <Tab
        active={tab === 'location'}
        title="Location"
        hash="location"
        onClick={() => setTab('location')}
      />
      <Tab
        active={tab === 'similar-listings'}
        title="Similar Listings"
        hash="similar-listings"
        onClick={() => setTab('similar-listings')}
      />
    </ul>
  );
};

export default Tabs;
