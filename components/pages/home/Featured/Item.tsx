import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HomePagePropertyResource } from 'types/resources/Property';
import { classNames } from 'lib/helpers/ui';
import { getPublicPropertyShowRoute } from 'lib/helpers/route';

type ItemProps = {
  data: HomePagePropertyResource;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
};

const Item: React.FC<ItemProps> = ({
  data,
  title,
  subtitle,
  className,
  wrapperClassName,
}) => (
  <Link href={getPublicPropertyShowRoute(data.id, data.slug)}>
    <a className={classNames('listing__item', className)} title={data.title}>
      <div className={classNames('listing__itemWrapper', wrapperClassName)}>
        <Image
          layout="fill"
          objectFit="cover"
          src={data.imageUrl}
          alt={data.title}
        />
        <div className="listing__item-overlay" />
        <div className="listing__item-content">
          {!!title ? (
            <>
              {typeof title === 'string' ? (
                <h3 className="listing__item-title">{title}</h3>
              ) : (
                title
              )}
            </>
          ) : (
            <h3 className="listing__item-title">{data.title}</h3>
          )}
          {!!subtitle ? (
            <>
              {typeof subtitle === 'string' ? (
                <h4 className="listing-item-subtitle">{subtitle}</h4>
              ) : (
                subtitle
              )}
            </>
          ) : (
            <h4 className="listing-item--subtitle">
              {[data.location.city, data.location.state]
                .filter(Boolean)
                .join(' ')}
            </h4>
          )}
        </div>
      </div>
    </a>
  </Link>
);

export default Item;
