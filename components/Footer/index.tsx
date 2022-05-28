import FooterSection from 'components/Footer/FooterSection';
import React, { useMemo } from 'react';
import destinations from 'static/destinations.json';

const Footer: React.FC = () => {
  const destinationItems = useMemo(
    () =>
      destinations
        ? destinations?.map((item) => ({
            title: item.title,
            url: `/destinations/${item.slug}`,
          }))
        : [],
    [],
  );
  return (
    <footer className="bg-blue-900 py-8 md:py-12 text-white">
      <div className="container mx-auto flex">
        <div className="w-full flex flex-col md:flex-row">
          <FooterSection
            title="Company"
            items={[
              { title: 'Features', url: '/company/features' },
              { title: 'Price To List', url: '/pricing' },
              { title: 'Blog', url: '/blogs' },
              { title: 'Our Story', url: '/company/our-story' },
            ]}
          />
          <FooterSection
            title="Support"
            items={[
              { title: 'FAQ', url: '/faq' },
              {
                title: 'Best Price Gurantee',
                url: '/best-price-guarantee-vacation-homes',
              },
            ]}
          />
          <FooterSection
            title="Site Info"
            items={[
              { title: 'Why Host', url: '/site-info/why-host' },
              { title: 'Contact Us', url: '/contactus' },
              { title: 'Terms Of Service', url: '/legal/terms-of-service' },
              { title: 'Privacy Policy', url: '/legal/privacy-policy' },
              { title: 'Copyright Policy', url: '/legal/copyright-policy' },
            ]}
          />
          <FooterSection title="Destinations" items={destinationItems} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
