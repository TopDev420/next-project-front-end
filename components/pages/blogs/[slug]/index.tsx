/* eslint-disable react/no-danger */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Blog as BlogModel } from 'types/models/Blog';
import { BlogResource } from 'types/resources/Blog';
import SimilarItem from 'components/pages/blogs/[slug]/SimilarItem';
import dayjs from 'dayjs';
import { getBlogSearchRoute } from 'lib/helpers/route';

export type BlogProps = {
  blog: BlogModel;
  similar: BlogResource[];
};

const Blog: React.FC<BlogProps> = ({ blog, similar }) => (
  <div className="blogPage">
    <div className="blogPage__wrapper">
      <div className="blogPage__main">
        {!!blog.seoMeta.thumbnail && (
          <div className="blogPage__thumbnail">
            <Image
              layout="fill"
              objectFit="cover"
              src={blog.seoMeta.thumbnail}
            />
          </div>
        )}
        <h1 className="blogPage__title">{blog.title}</h1>
        <small className="blogPage__date">
          {dayjs(blog.publishedAt).format('DD MMM. YYYY')}
        </small>
        <ul className="blogPage__tags">
          {blog.tagsTexts.map((tag) => (
            <li key={tag} className="blogPage__tagItem">
              <Link href={getBlogSearchRoute({ query: tag })}>{tag}</Link>
            </li>
          ))}
        </ul>
        <section
          className="blogPage__content unreset"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <aside className="blogPage__side">
        <h2 className="blogPage__sideTitle">
          Other blogs you might be interested in
        </h2>
        {similar.length > 0 ? (
          <div className="blogPage__sideContent">
            {similar.map((item) => (
              <SimilarItem data={item} key={item.id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No data to display</p>
        )}
      </aside>
    </div>
  </div>
);

export default Blog;
