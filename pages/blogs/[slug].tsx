import { GetServerSideProps, NextPage } from 'next';
import PageContent, { BlogProps } from 'components/pages/blogs/[slug]';
import * as blogApi from 'lib/apis/blog';
import PageHead from 'components/Layouts/PageHead';

const Blog: NextPage<BlogProps> = ({ blog, similar }) => (
  <>
    <PageHead
      title={blog.seoMeta.title}
      description={blog.seoMeta.description}
      keywords={blog.seoMeta.keywords}
      thumbnail={blog.seoMeta.thumbnail}
    />
    <PageContent blog={blog} similar={similar} />
  </>
);

export default Blog;

export const getServerSideProps: GetServerSideProps<BlogProps> = async ({
  query,
  req,
}) => {
  try {
    const props = await blogApi.showBlog(query.slug as any, req);
    return { props };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
