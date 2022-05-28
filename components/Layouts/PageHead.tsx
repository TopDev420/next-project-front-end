import React from 'react';
import Head from 'next/head';
import { HasSeoMeta } from 'types/models/HasSeoMeta';
import { useRouter } from 'next/router';
import config from 'config';
import { joinPaths } from 'lib/helpers/url';

type HeadProps = Partial<HasSeoMeta['seoMeta']>;

const PageHead: React.FC<HeadProps> = ({
  title = 'Vacation Homes For Rent From Owners And Property Managers',
  description = 'Our vacation rentals from owners and property managers allow you to book direct with no fees, no commissions, no hidden charges. We make the introduction and leave the rest up to you. Take a vacation - not taken.',
  keywords = 'vacation, rentals, rental, villas, home, property, manager, owner, no, fees, commissions, direct',
  thumbnail = '',
}) => {
  const router = useRouter();
  const url = joinPaths(config.BASE_URL, router.asPath);
  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywords} key="keywords" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:url" content={url} key="og:url" />
      {!!thumbnail && (
        <meta property="og:image" content={thumbnail} key="og:image" />
      )}
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        name="twitter:card"
        content={thumbnail ? 'summary_large_image' : 'summary'}
        key="twitter:card"
      />
    </Head>
  );
};

export default PageHead;
