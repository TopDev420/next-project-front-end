import { GetServerSideProps, NextPage } from 'next';
import PageContent, { BlogsProps } from 'components/pages/blogs/Index';
import PageHead from 'components/Layouts/PageHead';
import * as blogTransformer from 'lib/transformers/blog';
import { searchBlog } from 'lib/apis/blog';

const Blogs: NextPage<BlogsProps> = (props) => (
  <>
    <PageHead
      title="VacaRent Blogs"
      description="VacaRent Blog - Select destinations, tools and tips, industry updates."
    />
    <PageContent {...props} />
  </>
);

export default Blogs;

export const getServerSideProps: GetServerSideProps<BlogsProps> = async ({
  query,
  req,
}) => {
  const filter = blogTransformer.getSearchQueryFromRequest(query);
  try {
    const pagination = await searchBlog(filter, req);
    return {
      props: { pagination, filter },
    };
  } catch (e) {
    return {
      props: {
        filter,
      },
    };
  }
};
