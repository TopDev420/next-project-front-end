import React, { useContext } from 'react';
import Link from 'next/link';
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { PropertyContext } from 'components/pages/rooms/[id]/PropertyProvider';
import { getSearchRoute } from 'lib/helpers/route';
import LoadingIndicator from 'components/LoadingIndicator';

type ActionsProps = {
  onCalculate?: () => void;
  isLoading?: boolean;
};

const Actions: React.FC<ActionsProps> = ({ onCalculate, isLoading }) => {
  const property = useContext(PropertyContext);
  const url = (() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.location.href;
  })();

  return (
    <div className="flex flex-col mt-4">
      <button
        disabled={isLoading}
        type="button"
        className="btn btn-primary mb-4"
        onClick={onCalculate}
      >
        {isLoading && <LoadingIndicator left light />}
        Request to Book
      </button>
      <Link href={getSearchRoute()}>
        <a className="btn btn-primary-outline mb-4 text-center">
          Search other Listings
        </a>
      </Link>
      <div className="flex flex-row justify-center">
        <FacebookShareButton url={url} className="mr-2">
          <FacebookIcon size={36} />
        </FacebookShareButton>
        <TwitterShareButton url={url} className="mr-2">
          <TwitterIcon size={36} />
        </TwitterShareButton>
        <RedditShareButton url={url} className="mr-2">
          <RedditIcon size={36} />
        </RedditShareButton>
        <PinterestShareButton media={property?.images?.[0].url} url={url}>
          <PinterestIcon size={36} />
        </PinterestShareButton>
      </div>
    </div>
  );
};

export default Actions;
