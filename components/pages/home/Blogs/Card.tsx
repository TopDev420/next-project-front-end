import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import _ from 'lodash';
import { BlogResource } from 'types/resources/Blog';
import { getBlogRoute } from 'lib/helpers/route';
import { BLOG_THUMBNAIL_PLACEHOLDER } from 'constants/blog';

type BlogCardProps = {
  data: BlogResource;
};

const Card: React.FC<BlogCardProps> = ({ data }) => (
  <Link href={getBlogRoute(data.slug)}>
    <a className="blogs__card">
      <Image
        width={16}
        height={9}
        alt={data.title}
        layout="responsive"
        src={data.thumbnail || BLOG_THUMBNAIL_PLACEHOLDER}
      />
      <div className="blogs__cardContent">
        <h3 className="blogs__cardTitle">{data.title}</h3>
        <p className="blogs__cardText">
          {_.truncate(data.description, {
            length: 200,
            omission: '...',
          })}
        </p>
      </div>
    </a>
  </Link>
);

export default Card;
