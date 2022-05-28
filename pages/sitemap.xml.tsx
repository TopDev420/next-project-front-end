import type { GetServerSideProps } from 'next';
import { getSitemap } from 'lib/apis/sitemap';

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = await getSitemap();
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
