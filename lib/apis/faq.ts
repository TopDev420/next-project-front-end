import { get, getServerSidePropsRequestHeader } from 'lib/helpers/api';
import { NextPageContext } from 'next';
import { FaqPageProps, FaqSearchType } from 'types/pages/faq';

export const getFaqPageProps = (req: NextPageContext['req']) =>
  get<FaqPageProps>('faq', undefined, getServerSidePropsRequestHeader(req));
export const faqSearch = (model: FaqSearchType) => get('faq/search', model);
