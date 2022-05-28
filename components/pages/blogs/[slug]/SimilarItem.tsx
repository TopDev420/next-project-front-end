import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogResource } from 'types/resources/Blog';
import { BLOG_THUMBNAIL_PLACEHOLDER } from 'constants/blog';
import { getBlogRoute } from 'lib/helpers/route';
import _ from 'lodash';

type SimilarItemProps = {
  data: BlogResource;
};

const SimilarItem: React.FC<SimilarItemProps> = ({ data }) => (
  <div className="blogCard">
    <div className="blogCard__wrapper">
      <div className="blogCard__thumbnail">
        <Image
          src={data.thumbnail || BLOG_THUMBNAIL_PLACEHOLDER}
          width={4}
          height={3}
          layout="responsive"
          objectFit="cover"
          alt={data.title}
        />
      </div>
      <div className="blogCard__content">
        <h3 className="blogCard__title">
          <Link href={getBlogRoute(data.slug)}>{data.title}</Link>
        </h3>
        <p className="blogCard__summary">
          {_.truncate(data.description, {
            length: 120,
          })}
        </p>
      </div>
    </div>
  </div>
);

export default SimilarItem;
