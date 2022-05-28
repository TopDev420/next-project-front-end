import React from 'react';
import { BlogResource } from 'types/resources/Blog';
import BlogCard from 'components/pages/home/Blogs/Card';

type BlogsProps = {
  blogs: BlogResource[];
};

const Blogs: React.FC<BlogsProps> = ({ blogs }) => (
  <div className="blogs">
    <div className="blogs__wrapper">
      <h2 className="blogs__title">
        VacaRent Blog - Select destinations, tools and tips, industry updates.
      </h2>
      <div className="blogs__grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} data={blog} />
        ))}
      </div>
    </div>
  </div>
);

export default Blogs;
