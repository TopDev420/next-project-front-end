import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { BlogResource } from 'types/resources/Blog';
import { getBlogRoute, getBlogSearchRoute } from 'lib/helpers/route';
import { BLOG_THUMBNAIL_PLACEHOLDER } from 'constants/blog';

type BlogItemProps = {
  data: BlogResource;
};

const BlogItem: React.FC<BlogItemProps> = ({ data }) => (
  <div className="blogItem">
    <div className="blogItem__thumbnail">
      <Image
        width={4}
        height={3}
        layout="responsive"
        alt={data.title}
        src={data.thumbnail || BLOG_THUMBNAIL_PLACEHOLDER}
      />
    </div>
    <div className="blogItem__content">
      <h2 className="blogItem__title">
        <Link href={getBlogRoute(data.slug)}>{data.title}</Link>
      </h2>
      <div className="blogItem__date">
        {dayjs(data.publishedAt).format('DD MMM. YYYY')}
      </div>
      <div className="blogItem__tags">
        {data.tags?.map((tag) => (
          <Link key={tag} href={getBlogSearchRoute({ query: tag })}>
            <a title={tag} className="blogItem__tag">
              {tag}
            </a>
          </Link>
        ))}
      </div>
      <p className="blogItem__summary">{data.description}</p>
    </div>
  </div>
);

export default BlogItem;
