import { GetServerSidePropsContext } from 'next';
import { BlogSearchQuery } from 'lib/forms/blog';
import { get, getServerSidePropsRequestHeader } from 'lib/helpers/api';
import { snakeCaseKeys } from 'lib/helpers/object';
import { Pagination, PaginationInput } from 'types/Pagination';
import { BlogResource } from 'types/resources/Blog';
import { Blog } from 'types/models/Blog';

export const searchBlog = async (
  input: PaginationInput<BlogSearchQuery>,
  req?: GetServerSidePropsContext['req'],
) => {
  const param = snakeCaseKeys(input);
  return get<Pagination<BlogResource>>(
    'blog',
    param,
    req ? getServerSidePropsRequestHeader(req) : undefined,
  );
};

export const showBlog = async (
  slug: string,
  req?: GetServerSidePropsContext['req'],
) =>
  get<{ blog: Blog; similar: BlogResource[] }>(
    `blog/${slug}`,
    req ? getServerSidePropsRequestHeader(req) : undefined,
  );
