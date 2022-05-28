import Link from 'next/link';
import React from 'react';

type FooterSectionProps = {
  title: string;
  items: Array<{ title: string; url: string; external?: boolean }>;
};

const FooterSection: React.FC<FooterSectionProps> = ({ title, items }) => (
  <section className="flex flex-col md:flex-1 px-6 md:pl-0">
    <h3 className="text-xl pb-2 mb-4 border-b border-blue-400">{title}</h3>
    <ul className="mb-4">
      {items.map((item) => (
        <li key={item.title} className="mb-2">
          {item.external ? (
            <a href={item.url} rel="noreferrer" target="_blank">
              {item.title}
            </a>
          ) : (
            <Link href={item.url} passHref>
              <a>{item.title}</a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default FooterSection;
